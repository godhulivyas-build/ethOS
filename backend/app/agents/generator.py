from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage
import os

class ContentGenerationAgent:
    def __init__(self):
        self.llm = ChatOpenAI(
            model="gpt-4o",
            temperature=0.7,
            api_key=os.getenv("OPENAI_API_KEY")
        )

    def generate_draft(self, user_tone_profile: dict, retrieved_memories: list, raw_source_content: str, platform: str):
        """
        Orchestrates the RAG generation by injecting memories and tone constraints.
        """
        # 1. Structure Memories
        memory_context = ""
        for i, mem in enumerate(retrieved_memories):
            memory_context += f"Memory {i+1} ({mem.get('type')}): {mem.get('text')}\n"
            
        # 2. Extract Tone
        formality = user_tone_profile.get("formality", 50)
        directness = user_tone_profile.get("directness", 50)
        directives = user_tone_profile.get("custom_directives", "Write naturally and authentically.")
        
        # Determine stylistic rules based on sliders
        style_rules = f"Formality Level: {formality}/100. Directness Level: {directness}/100.\n"
        style_rules += f"Custom User Directives: {directives}\n"
        
        # 3. Construct the RAG Prompt
        system_prompt = f"""You are the user's personal AI ghostwriter for {platform}.
Your goal is to synthesize the provided 'Source Material' into a highly engaging draft.

CRITICAL INSTRUCTIONS:
- You must perfectly match the user's Voice DNA:
{style_rules}

- You must inject the user's past experiences and thoughts where relevant to prove authenticity:
USER MEMORIES CONTEXT:
{memory_context}

Do NOT use generic AI filler words (e.g., 'In today's fast-paced digital landscape', 'Delve into'). 
Sound human, opinionated, and experienced.
"""

        messages = [
            SystemMessage(content=system_prompt),
            HumanMessage(content=f"Please synthesize the following source material into a draft for {platform}:\n\n{raw_source_content}")
        ]

        response = self.llm(messages)
        return response.content
