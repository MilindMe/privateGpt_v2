import streamlit as st
from query_data import query_rag

import time
# ===============================================================================
# M. Meetarbhan 
# 5/7/2024

# Streamlit provides built-in modules and objects for Web-UI development 
# python

st.title("BdoGPT_v1-debug")
# GLOBAL CONSTANTS


# ===============================================================================
# M.Meetarbhan
# 5/14/2024
# Domain Specific Button Toggle
if 'domainType' not in st.session_state:
    st.session_state.domainType = False

def toggle_domain_type():
    st.session_state.domainType = not st.session_state.domainType

st.button("AML-CFT Mode", key=None, help='Chat w/ AML PDFs', type="primary", on_click=toggle_domain_type)

st.caption(f"AML-CFT Mode: {st.session_state.domainType}")
# ===============================================================================

# UI-BODY
if "messages" not in st.session_state:
    st.session_state.messages = []

def add_message(role, content):
    st.session_state.messages.append({"role": role, "content": content})
    with st.chat_message(role):
        st.markdown(content)

for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

prompt = st.chat_input("What is up?")
if prompt:
    start_time = time.time()
    add_message("user", prompt)
    response_placeholder = st.empty()

    response_text = ""
    for chunk in query_rag(prompt, st.session_state.domainType):
        response_text += chunk + " "
        response_placeholder.markdown(f"**Assistant:** {response_text.strip()}")


    add_message("", response_text.strip())


    #response_text = query_rag(prompt, st.session_state.domainType)
    #add_message("assistant", response_text.strip())

    time_taken = time.time() - start_time
    
    st.success(f"Success :) Time Taken :{time_taken}", icon = "🔥")  
# ===============================================================================
