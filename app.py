from flask import Flask, request, jsonify
from flask_cors import CORS
import time
from query_data import query_rag  # Ensure query_data.py is in the same directory or adjust the import accordingly

app = Flask(__name__)
CORS(app)

@app.route('/query', methods=['POST'])
def query():
    data = request.json
    prompt = data['prompt']
    domain_type = data['domainType']
    
    start_time = time.time()
    response_text = query_rag(prompt, domain_type)
    time_taken = time.time() - start_time
    
    return jsonify({
        'response_text': response_text,
        'time_taken': time_taken
    })

if __name__ == '__main__':
    app.run(debug=True)