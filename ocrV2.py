import pytesseract
from PIL import Image
import numpy as np
import cv2

import PyPDF2
from pdf2image import convert_from_path
import pytesseract
from PyPDF2 import PdfWriter

import os



#is_machine_readable() consumes a pdf_path and checks whether a pdf is machine readable
def is_machine_readable(pdf_path):
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            text=""
            for page_num in range(len(reader.pages)):
                page = reader.pages[page_num]
                text += page.extract_text() or ""
            return len(text.strip()) > 52
    except Exception as e:
        print(f"Error reading PDF: {e}")
        return False

# ocr_pdf() is a simplified function using pytesseract that converts scanned pdfs to machine
# readable pdfs. 
# ocr_pdf() consumes an input pdf path and an output path to return the converted pdf
# CONTRACT : str, str -> .pdf
def ocr_pdf(input_pdf_path, output_pdf_path):
    images= convert_from_path(input_pdf_path)
    pdf_writer = PdfWriter()

    for image in images:
        text = pytesseract.image_to_strinrg(image)
        pdf_writer.add_page(PyPDF2.pdf.PageObject.create_blank_page(width=image.width, height=image.height))
    
    with open(output_pdf_path, "wb") as f_out:
        pdf_writer.write(f_out)
