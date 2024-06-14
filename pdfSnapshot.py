import fitz
from PIL import Image
import os

def display_pdf_page(pdf_path, page_number, save_path=None): 
    pdf_document = fitz.open(pdf_path)

    page = pdf_document.load_page(page_number - 1)
    pix = page.get_pixmap()
    img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    
    if save_path:
        # Ensure the directory exists
        os.makedirs(os.path.dirname(save_path), exist_ok=True)
        img.save(save_path)
    else:
        img.show()

pdf_path = 'updated-aml-cft-handbook.pdf'
page_number = 1
save_path = '../bdoGpt_v2/src/assets/pdfSnapshots/page1.png'  

#TODO: ROUTE SCREENSHOT FEATURE 
#configure route screenshot to api backend and react frontend 
route_screenshot = ''

display_pdf_page(pdf_path, page_number, save_path)
