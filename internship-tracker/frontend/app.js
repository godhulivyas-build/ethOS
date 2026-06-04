document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const searchInput = document.getElementById('search-input');
    const workModeFilter = document.getElementById('work-mode-filter');
    const stipendFilter = document.getElementById('stipend-filter');
    const sortBySelect = document.getElementById('sort-by');
    const totalCountEl = document.getElementById('total-count');
    const remoteCountEl = document.getElementById('remote-count');
    const paidCountEl = document.getElementById('paid-count');
    const listingsGrid = document.getElementById('listings-grid');
    const loader = document.getElementById('loader');
    const noResults = document.getElementById('no-results');

    // Debounce timer
    let searchDebounceTimeout;

    // Fetch Internships from the API
    async function fetchInternships() {
        showLoader();
        hideNoResults();
        
        // Build query string
        const params = new URLSearchParams();
        
        const searchVal = searchInput.value.trim();
        if (searchVal) params.append('skills', searchVal);
        
        const workModeVal = workModeFilter.value;
        if (workModeVal !== 'all') params.append('work_mode', workModeVal);
        
        const stipendVal = stipendFilter.value;
        if (stipendVal !== 'all') params.append('stipend_type', stipendVal);
        
        const sortByVal = sortBySelect.value;
        if (sortByVal) params.append('sort_by', sortByVal);

        try {
            const url = `/api/internships?${params.toString()}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('API fetch failed');
            
            const data = await response.json();
            renderListings(data);
            updateStats(data);
        } catch (error) {
            console.error('Error fetching internships:', error);
            listingsGrid.innerHTML = `
                <div class="no-results-card">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    <h3>Failed to load internships</h3>
                    <p>There was an error communicating with the API backend. Please check if Flask server is running.</p>
                </div>
            `;
        } finally {
            hideLoader();
        }
    }

    // Render cards on the grid
    function renderListings(listings) {
        listingsGrid.innerHTML = '';
        
        if (listings.length === 0) {
            showNoResults();
            return;
        }
        
        hideNoResults();
        
        listings.forEach(job => {
            const card = document.createElement('div');
            card.className = 'card';
            
            // Format Stipend
            let stipendText = 'Unspecified';
            let isPaidClass = 'unpaid';
            if (job.stipend_type === 'paid') {
                stipendText = `₹ ${job.stipend_amount.toLocaleString('en-IN')} /mo`;
                isPaidClass = 'paid';
            } else if (job.stipend_type === 'unpaid') {
                stipendText = 'Unpaid';
            }

            // Format Deadline
            let deadlineText = 'Apply ASAP';
            if (job.deadline) {
                try {
                    const dateObj = new Date(job.deadline);
                    const options = { day: '2-digit', month: 'short', year: 'numeric' };
                    deadlineText = dateObj.toLocaleDateString('en-IN', options);
                } catch (e) {
                    deadlineText = job.deadline;
                }
            }

            // Skills HTML
            const skillsHtml = job.skills && job.skills.length > 0 
                ? job.skills.map(skill => `<span class="skill-tag">${escapeHtml(skill)}</span>`).join('') 
                : `<span class="skill-tag">General</span>`;

            // Setup Card inner HTML
            card.innerHTML = `
                <div class="card-header">
                    <div class="card-meta">
                        <span class="platform-badge">${escapeHtml(job.source_platform)}</span>
                        <span class="stipend-badge ${isPaidClass}">${stipendText}</span>
                    </div>
                    <h3 class="job-title">${escapeHtml(job.role)}</h3>
                    <div class="company-name">
                        <i class="fa-regular fa-building"></i>
                        <span>${escapeHtml(job.company)}</span>
                    </div>
                </div>
                
                <div class="card-body">
                    <div class="card-details">
                        <div class="detail-item">
                            <i class="fa-solid fa-location-dot"></i>
                            <span>${escapeHtml(job.location)}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fa-solid fa-hourglass-half"></i>
                            <span>Duration: ${escapeHtml(job.duration || 'Unspecified')}</span>
                        </div>
                    </div>
                    <div class="skills-container">
                        ${skillsHtml}
                    </div>
                    
                    <!-- Recruiter Referral Section -->
                    <div class="recruiter-section">
                        <button class="recruiter-toggle-btn unfetched" data-company="${escapeHtml(job.company)}">
                            <i class="fa-solid fa-users"></i> Find HR / Get Referral
                        </button>
                        <div class="recruiter-panel hidden">
                            <div class="recruiter-loading">
                                <span class="mini-spinner"></span> Looking up contacts...
                            </div>
                            <div class="recruiter-content hidden"></div>
                        </div>
                    </div>
                </div>
                
                <div class="card-footer">
                    <div class="deadline">
                        <span class="deadline-label">Apply By</span>
                        <span class="deadline-value">${deadlineText}</span>
                    </div>
                    <a href="${job.apply_link}" target="_blank" class="apply-btn">
                        Apply <i class="fa-solid fa-arrow-right"></i>
                    </a>
                </div>
            `;
            
            // Bind Apollo Recruiters Toggle Event
            const toggleBtn = card.querySelector('.recruiter-toggle-btn');
            const panel = card.querySelector('.recruiter-panel');
            const loaderEl = card.querySelector('.recruiter-loading');
            const contentEl = card.querySelector('.recruiter-content');
            
            toggleBtn.addEventListener('click', async () => {
                const isHidden = panel.classList.contains('hidden');
                
                // Close all other panels for clean UI
                document.querySelectorAll('.recruiter-panel').forEach(p => {
                    if (p !== panel) p.classList.add('hidden');
                });
                
                if (isHidden) {
                    panel.classList.remove('hidden');
                    
                    if (toggleBtn.classList.contains('unfetched')) {
                        toggleBtn.classList.remove('unfetched');
                        loaderEl.classList.remove('hidden');
                        contentEl.classList.add('hidden');
                        
                        try {
                            const companyName = toggleBtn.getAttribute('data-company');
                            const res = await fetch(`/api/apollo-contacts?company=${encodeURIComponent(companyName)}`);
                            const contactData = await res.json();
                            
                            loaderEl.classList.add('hidden');
                            contentEl.classList.remove('hidden');
                            
                            let contactsHtml = '';
                            if (contactData.contacts && contactData.contacts.length > 0) {
                                contactsHtml = `
                                    <div class="contacts-list">
                                        ${contactData.contacts.map(c => `
                                            <div class="contact-item">
                                                <div class="contact-info">
                                                    <span class="contact-name">${escapeHtml(c.name)}</span>
                                                    <span class="contact-title">${escapeHtml(c.title)}</span>
                                                </div>
                                                <div class="contact-actions">
                                                    <button class="copy-email-btn" data-email="${escapeHtml(c.email)}" title="Copy Email">
                                                        <i class="fa-regular fa-copy"></i> Copy
                                                    </button>
                                                    ${c.linkedin ? `
                                                        <a href="${c.linkedin}" target="_blank" class="contact-linkedin-link" title="LinkedIn Profile">
                                                            <i class="fa-brands fa-linkedin"></i>
                                                        </a>
                                                    ` : ''}
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                `;
                            } else {
                                // Fallback info if API key is not configured or recruiter list empty
                                contactsHtml = `
                                    <p class="no-contacts-msg">No direct emails found. Use these search links:</p>
                                    <div class="fallback-links-container">
                                        <a href="${contactData.fallback_apollo}" target="_blank" class="fallback-search-btn apollo-search">
                                            <i class="fa-solid fa-magnifying-glass"></i> Search Apollo
                                        </a>
                                        <a href="${contactData.fallback_linkedin}" target="_blank" class="fallback-search-btn linkedin-search">
                                            <i class="fa-brands fa-linkedin-in"></i> Search LinkedIn
                                        </a>
                                    </div>
                                `;
                            }
                            
                            contentEl.innerHTML = contactsHtml;
                            
                            // Bind Copy Event Listeners
                            contentEl.querySelectorAll('.copy-email-btn').forEach(btn => {
                                btn.addEventListener('click', (e) => {
                                    e.stopPropagation();
                                    const email = btn.getAttribute('data-email');
                                    navigator.clipboard.writeText(email).then(() => {
                                        const originalHtml = btn.innerHTML;
                                        btn.innerHTML = `<i class="fa-solid fa-check" style="color: #34d399;"></i> Copied`;
                                        btn.classList.add('copied');
                                        setTimeout(() => {
                                            btn.innerHTML = originalHtml;
                                            btn.classList.remove('copied');
                                        }, 2000);
                                    }).catch(err => {
                                        console.error('Failed to copy email:', err);
                                    });
                                });
                            });
                        } catch (err) {
                            console.error('Error fetching Apollo contacts:', err);
                            loaderEl.classList.add('hidden');
                            contentEl.classList.remove('hidden');
                            contentEl.innerHTML = `<p class="error-msg">Could not load contacts.</p>`;
                        }
                    }
                } else {
                    panel.classList.add('hidden');
                }
            });
            
            listingsGrid.appendChild(card);
        });
    }

    // Update Statistics Panel
    function updateStats(listings) {
        totalCountEl.textContent = listings.length;
        
        const remoteCount = listings.filter(j => j.work_mode === 'remote').length;
        remoteCountEl.textContent = remoteCount;
        
        const paidCount = listings.filter(j => j.stipend_type === 'paid').length;
        paidCountEl.textContent = paidCount;
    }

    // Event Listeners for Filters and Searching
    searchInput.addEventListener('input', () => {
        clearTimeout(searchDebounceTimeout);
        searchDebounceTimeout = setTimeout(() => {
            fetchInternships();
        }, 300); // 300ms debounce
    });

    workModeFilter.addEventListener('change', fetchInternships);
    stipendFilter.addEventListener('change', fetchInternships);
    sortBySelect.addEventListener('change', fetchInternships);

    // Helpers
    function showLoader() {
        loader.classList.remove('hidden');
    }

    function hideLoader() {
        loader.classList.add('hidden');
    }

    function showNoResults() {
        noResults.classList.remove('hidden');
    }

    function hideNoResults() {
        noResults.classList.add('hidden');
    }

    function escapeHtml(unsafe) {
        if (!unsafe) return '';
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // Initial Fetch
    fetchInternships();
});
