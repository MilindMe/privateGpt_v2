from langchain_community.embeddings.ollama import OllamaEmbeddings
from gpt4all import Embed4All

embed_flag = True

def get_embedding_function():
    embeddings = OllamaEmbeddings(model="nomic-embed-text")
    return embeddings
    