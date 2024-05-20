# bdo-gpt

# Table of Contents
1. [Installing Python](#python)
2. [Clone Repo](#repo)
2. [Installing LLM](#llm)
3. [Python Dependencies](#pip)
4. [Launching](#running)


## Installing Python
1.1: Verify if Python is Installed : 
```
python --version
```
If Python is not installed, install the latest version at : https://www.python.org/downloads/

1.2: Install PIP Package Manager
```
python get-pip.py
```
## Clone the Repository
Make a new folder
```
mkdir bdo-gpt
cd bdo-gpt
```
Clone the Repository or Download the .ZIP file at : https://github.com/MilindMe/privateGPT.git
```
git clone https://github.com/MilindMe/privateGPT.git
```
## Installing LLM
Before running, we need to make sure we have the LLM Model installed locally. We are currently using LLAMA3-Instruct. 
Download the model at https://huggingface.co/MaziyarPanahi/Meta-Llama-3-8B-Instruct-GGUF/blob/main/Meta-Llama-3-8B-Instruct.Q4_K_S.gguf. 

Save the model in your bdo-gpt folder.

## Python Dependencies
To avoid Conflicting dependencies, we will first set up a virtual environment. The following command sets up a virtual environment called bdoGpt, and activates it:

**Windows Powershell**
```python
python -m venv bdoGpt
bdoGpt\Scripts\Activate.ps1
```

Once the virtual environment is set-up, we can install dependencies :
```python
pip install -r requirements.txt
```

### Setting up the API Server 
Install LMStudio 
Download the Lllma3 Model
Click on Start Server 

## Launching
You can ensure dependencies have been installed by running
```python
pip list
```

Almost there! Add or remove any PDFs you want to use from the Data folder.
Populate the Database using 
```
python .\populate_database.py
```
and Run the application
```
python -m streamlit run .\streamlit_ui.py
```

