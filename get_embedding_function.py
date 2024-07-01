from langchain_community.embeddings.ollama import OllamaEmbeddings
from gpt4all import Embed4All
import requests

embed_flag = True
api_url = "http://localhost:1234/v1/embeddings"

def get_embedding_function():
    embeddings = OllamaEmbeddings(model="nomic-embed-text")
    return embeddings

