import os
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
import base64
from bs4 import BeautifulSoup
import re

class GmailService:
    def __init__(self, access_token: str, refresh_token: str, client_id: str, client_secret: str):
        # Initialize Google Credentials using tokens stored in the DB
        self.creds = Credentials(
            token=access_token,
            refresh_token=refresh_token,
            client_id=client_id,
            client_secret=client_secret,
            token_uri="https://oauth2.googleapis.com/token"
        )
        self.service = build('gmail', 'v1', credentials=self.creds)

    def fetch_newsletters(self, max_results=10):
        """
        Fetches emails categorized as promotions or containing unsubscribe links
        to identify newsletters.
        """
        query = "category:promotions OR \"unsubscribe\""
        results = self.service.users().messages().list(userId='me', q=query, maxResults=max_results).execute()
        messages = results.get('messages', [])
        
        extracted_emails = []
        for msg in messages:
            msg_id = msg['id']
            message = self.service.users().messages().get(userId='me', id=msg_id, format='full').execute()
            
            headers = message['payload']['headers']
            subject = next((h['value'] for h in headers if h['name'] == 'Subject'), "No Subject")
            sender = next((h['value'] for h in headers if h['name'] == 'From'), "Unknown Sender")
            
            # Extract body
            body = self._extract_body(message['payload'])
            plain_text = self._clean_html(body)
            
            extracted_emails.append({
                "id": msg_id,
                "sender": sender,
                "subject": subject,
                "content": plain_text
            })
            
        return extracted_emails

    def _extract_body(self, payload):
        """Recursively extract the body from the payload structure."""
        if 'parts' in payload:
            for part in payload['parts']:
                if part['mimeType'] == 'text/plain':
                    data = part['body'].get('data', '')
                    return base64.urlsafe_b64decode(data).decode('utf-8')
                elif part['mimeType'] == 'text/html':
                    data = part['body'].get('data', '')
                    return base64.urlsafe_b64decode(data).decode('utf-8')
                else:
                    return self._extract_body(part)
        else:
            data = payload['body'].get('data', '')
            if data:
                return base64.urlsafe_b64decode(data).decode('utf-8')
        return ""

    def _clean_html(self, html_content):
        """Converts HTML to plain text and removes excessive whitespace."""
        soup = BeautifulSoup(html_content, "html.parser")
        text = soup.get_text(separator=' ')
        # Remove multiple spaces/newlines
        text = re.sub(r'\s+', ' ', text).strip()
        return text
