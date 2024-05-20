import argparse
from langchain.vectorstores.chroma import Chroma
from langchain.prompts import ChatPromptTemplate
from langchain_community.llms.ollama import Ollama

from openai import OpenAI
import requests
import json

from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain_community.llms import GPT4All

from get_embedding_function import get_embedding_function


import time

start_time = time.time()

CHROMA_PATH = "chroma"

PROMPT_TEMPLATE = """
Answer the question based only on the following context:

{context}

---

Answer the question based on the above context. Keep answer concise. If none of the information is relevant to the 
question, simply say you are not configured to answer general questions like this.
Question : 
{question}
"""

PROMPT_TEMPLATE_GENERAL = """
You are a helpful, smart, kind, and efficient AI assistant. You always fulfill the user's requests to the best of your ability.
{question}
"""

def main():
    # Create CLI.
    parser = argparse.ArgumentParser()
    parser.add_argument("query_text", type=str, help="The query text.")
    args = parser.parse_args()
    query_text = args.query_text
    query_rag(query_text, False)

# query_rag(query_text, domainType) consumes a prompt (string) and 
# the type of query (bool) to execute
# domainType is a flag that dictates whether query is domain specific or general
def query_rag(query_text: str, domainType:bool):

    # Prepare the DB.
    embedding_function = get_embedding_function()
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)

    # SIMILARITY SEARCH WITH SCORE
    # Search the DB.
    results = db.similarity_search_with_score(query_text, k=4)

    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
    
    #================================================================
    # DOMAIN-SPECIFIC MODE TOGGLE 
    if domainType:
        prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
        prompt = prompt_template.format(context=context_text, question=query_text)
    else: 
        prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE_GENERAL)
        prompt = prompt_template.format(question=query_text)
    
    # DEBUGGING
    print(prompt)
    print(domainType)

#==================================
# API URL RUNNING ON LOCAL HOST!! * 
    api_url = "http://localhost:1234/v1/completions"
    payload = {
        "model": "SanctumAI/Meta-Llama-3-8B-Instruct-GGUF",
        "prompt": prompt,
        "max_tokens": 150,
        "temperature": 0.7,
        "stream": True
        }
    
    response = requests.post(api_url, json=payload, stream=True)
    collected_response = ""

    for line in response.iter_lines():
        if line:
            decoded_line = line.decode('utf-8')
            if decoded_line.startswith("data: "):
                data = decoded_line[6:]
                if data.strip() != "[DONE]":
                    json_data = json.loads(data)
                    if "choices" in json_data and json_data["choices"]:
                        text = json_data["choices"][0]["text"].replace("assistant", "").strip()
                        text = text.replace("<|end_header_id|>", "").strip()  # Remove unwanted text
                        print(text)
                        collected_response += text + " "
                        yield text

    final_response = collected_response.strip()
    yield final_response




 #   final_response = collected_response.strip().replace("assistant", "").strip()
  #  yield final_response
            

   # response_json=response.json()
    #response_text=response.json()["choices"][0]["text"].strip()
    


#==================================
    #TEMPORARY LLM MODEL
   
   # model = Ollama(model="mistral")

# LOAD LLM MODEL
    #local_path = "./models/Meta-Llama-3-8B-Instruct.Q4_0.gguf"
    #callback_handler = StreamingStdOutCallbackHandler()
    #callbacks = [callback_handler]
    #model = GPT4All(model=local_path, callbacks=callbacks, verbose=True)

# GET RESPONSE
    #response_text = model.invoke(prompt)

    #sources = [doc.metadata.get("id", None) for doc, _score in results]

   # formatted_response = f"Response: {response_text}\nSources: {sources}"
   # print(formatted_response)


    #print ("%s" % (time.time()-start_time))
    #return response_text


#if __name__ == "__main__":
 #   main()