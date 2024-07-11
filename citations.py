#cite_apa produces APA citations given author, year, document name, page number
# and the URL of the document to be cited (if applicable)

def cite_apa(author, year, document_name, page_number, url):
    citation = f"{author} ({year}). {document_name}. Retrieved from {url}, p. {page_number}."
    return citation


author = input("Enter the author's name: ")
year = input("Enter the publication year: ")
document_name = input("Enter the name of the document: ")
page_number = input("Enter the page number: ")
url = input("Enter the URL: ")

citation = cite_apa(author, year, document_name, page_number, url)
print("APA Citation:")
print(citation)
