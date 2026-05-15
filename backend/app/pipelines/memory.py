import os
from pinecone import Pinecone, ServerlessSpec
from langchain_openai import OpenAIEmbeddings

class VectorMemory:
    def __init__(self, index_name="ethos-memory"):
        self.pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
        self.index_name = index_name
        self.embeddings = OpenAIEmbeddings(api_key=os.getenv("OPENAI_API_KEY"), model="text-embedding-3-large")
        
        # Ensure index exists
        if self.index_name not in self.pc.list_indexes().names():
            self.pc.create_index(
                name=self.index_name,
                dimension=3072, # Dimension for text-embedding-3-large
                metric="cosine",
                spec=ServerlessSpec(
                    cloud="aws",
                    region="us-east-1"
                )
            )
        self.index = self.pc.Index(self.index_name)

    def store_memory(self, user_id: str, text: str, metadata: dict):
        """
        Embeds the text and stores it in Pinecone under the user's namespace.
        """
        vector = self.embeddings.embed_query(text)
        
        # Ensure metadata contains source type and timestamp
        meta = {
            "text": text,
            **metadata
        }
        
        # Use a deterministic or unique ID for the memory chunk
        import uuid
        memory_id = str(uuid.uuid4())
        
        self.index.upsert(
            vectors=[{
                "id": memory_id,
                "values": vector,
                "metadata": meta
            }],
            namespace=f"user_{user_id}"
        )
        return memory_id

    def retrieve_context(self, user_id: str, query: str, top_k=5, filter_meta=None):
        """
        Retrieves top_k relevant memories for a user based on the query.
        """
        query_vector = self.embeddings.embed_query(query)
        
        results = self.index.query(
            namespace=f"user_{user_id}",
            vector=query_vector,
            top_k=top_k,
            include_metadata=True,
            filter=filter_meta
        )
        
        return [match["metadata"] for match in results["matches"]]
