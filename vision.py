from openai import OpenAI
import base64
import requests

client = OpenAI(base_url="http://localhost:1234/v1", api_key="lm-studio")

path = "./image.png"

base64_image = ""
try:
    image = open(path.replace("'", ""), "rb").read()
    base64_image = base64.b64encode(image).decode("utf-8")
except Exception as e:
    print(f"Couldn't read the image. Make sure the path is correct and the file exists. Error: {e}")
    exit()

try:
    completion = client.chat.completions.create(
        model="SanctumAI/Meta-Llama-3-8B-Instruct-GGUF",
        messages=[
            {
                "role": "system",
                "content": "This is a chat between a user and an assistant. The assistant is helping the user to describe an image.",
            },
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "What’s in this image?"},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{base64_image}"
                        },
                    },
                ],
            }
        ],
        max_tokens=1000,
        stream=True
    )

    for chunk in completion:
        print(f"Chunk received: {chunk}")
        if chunk and 'choices' in chunk and chunk.choices[0].delta:
            content = chunk.choices[0].delta.content
            if content:
                print(content, end="", flush=True)
except Exception as e:
    print(f"An error occurred during the API call: {e}")
