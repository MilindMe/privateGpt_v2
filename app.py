from flask import Flask, request, Response, jsonify
from flask_cors import CORS
from query_data import query_rag

app = Flask(__name__)
CORS(app)

@app.route('/api/query', methods=['POST'])
def query():
    data = request.json
    query_text = data.get('query_text')
    domain_type = data.get('domain_type', False)
    
    response_generator = query_rag(query_text, domain_type)
    response_text = ''.join(response_generator)

    return jsonify({"response": response_text})

@app.route('/api/stream-query')
def stream_query():
    query_text = request.args.get('query_text')
    domain_type = request.args.get('domain_type', 'false').lower() == 'true'
    
    def generate():
        response_generator = query_rag(query_text, domain_type)
        for chunk in response_generator:
            yield f"data: {chunk}\n\n"
        yield "data: [DONE]\n\n"  # Ensure the final done signal is sent

    return Response(generate(), mimetype='text/event-stream')

if __name__ == '__main__':
    app.run(debug=True)
