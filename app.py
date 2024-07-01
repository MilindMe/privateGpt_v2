from flask import Flask, request, Response, jsonify
from flask_cors import CORS
from query_data import query_rag
import pyodbc
import os
#from ocrV2 import is_machine_readable
#from ocrV2 import ocr_pdf

app = Flask(__name__)
CORS(app)

# M MEETARBHAN
# APP.PY uses FLASK to set up the python backend for the web application and expose endpoints. 
# FIND DETAILS IN API DOCUMENTATION


# ================================ RESPONSES -> SQL ============================================
# get_db_connection() contains the connection string to the SQL Databasee
# Change Connection String
def get_db_connection():
    server = 'localhost'
    database = 'master'
    connection_string = f'DRIVER={{ODBC Driver 17 for SQL Server}};SERVER={server};DATABASE={database};Trusted_Connection=yes;'
    return pyodbc.connect(connection_string)


# store_message(role,content) stores user and assistant resposnes into an SQL database
def store_message(role, content):
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("INSERT INTO ChatMessages (role, content) VALUES (?, ?)", (role, content))
    connection.commit()
    cursor.close()
    connection.close()
# ==============================================================================================

# ================================ CITATIONS -> SQL ===================================================
# store_citations(citation) stores formatted citations into an SQL database
def store_citation(citation):
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("INSERT INTO ChatMessages (citation) VALUES (?)", (citation,))
    connection.commit()
    cursor.close()
    connection.close()

@app.route('/api/saveCitation', methods=['POST'])
def save_citation():
    data = request.json
    citation = data.get('citation')
    store_citation(citation)
    return jsonify({"message": "Citation saved successfully!"})
# ==============================================================================================


# ================================ SQL <--> FETCH CHAT HISTORY==================================

# ==============================================================================================


# ================================ UPLOAD PDF -> LOCAL FOLDER ==================================

#UPLOAD_FOLDER = 'data'
#if not os.path.exists(UPLOAD_FOLDER):
#    os.makedirs(UPLOAD_FOLDER)
#app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# upload_file() exposes endpoints for the upload pdf functionality to uploadPdfs and be processed
# for embedding
#@app.route('/api/upload', methods=['POST'])
#def upload_file():
#    if 'file' not in request.files:
#        return jsonify({"error": "No file part"}), 400 
#    file = request.files['file']
#    if file.filename == '':
#        return jsonify({"error": "No selected file"}), 400
#    if file: 
#        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
#        file.save(filepath)
#        
#        if not is_machine_readable(filepath):
#            ocr_output_path = os.path.join(app.config['UPLOAD_FOLDER'], 'ocr_' + file.filename)
#            ocr_pdf(filepath, ocr_output_path)
#            subprocess.run
#            return jsonify({"message": "File was not machine-readable and has been processed with OCR", "ocr_file": ocr_output_path}), 200
#        else:
#            return jsonify({"message": "File uploaded successfully"}), 200
# ==============================================================================================
@app.route('/api/query', methods=['POST'])
def query():
    data = request.json
    query_text = data.get('query_text')
    domain_type = data.get('domain_type', False)

    # storing user query into db
    store_message('user', query_text)
    
    response_generator = query_rag(query_text, domain_type)
    response_text = ''.join(response_generator)

    #storing llm response into db
    store_message('assistant', response_text)

    return jsonify({"response": response_text})

@app.route('/api/stream-query')

# stream_query() calls the query_rag function from query_data.py 
# generate() adds chunks of responses in order to enable response streaming and
# stores the full response into the SQL database
def stream_query():
    query_text = request.args.get('query_text')
    domain_type = request.args.get('domain_type', 'false').lower() == 'true'
    
    def generate():
        response_generator = query_rag(query_text, domain_type)
        full_message = ""
        for chunk in response_generator:
            full_message += chunk + " "
            yield f"data: {chunk}\n\n"
        
        # storing full message and user query in the db
        store_message('user', query_text)
        store_message('assistant', full_message.strip())

        #DONE SIGNAL!!
        yield "data: [DONE]\n\n" 

    return Response(generate(), mimetype='text/event-stream')

if __name__ == '__main__':
    app.run(debug=True)
