import pytesseract
from PIL import Image
import numpy as np
import cv2
import os

# Path to your image
image_path = 'image.png'

# Check if the image file exists
if not os.path.exists(image_path):
    raise FileNotFoundError(f"The file {image_path} does not exist. Please check the file path and try again.")

# Load the image
img = cv2.imread(image_path)

# Checks if the image was loaded successfully
if img is None:
    raise ValueError(f"Failed to load the image {image_path}. Please check the file path and ensure the image is valid.")

# turns image gray and sad
def get_grayscale(image):
    return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Noise removal function 
def remove_noise(image):
    return cv2.medianBlur(image, 5)

# Thresholding
# Thresholding is a type of image segmentation. Image becomes easier to analyze hopefully. Sometimes blows things up if image is TOO good
def thresholding(image):
    return cv2.threshold(image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]

# Display image
# exactly what it says it does 
def display_image(title, image):
    cv2.imshow(title, image)
    cv2.waitKey(0)

# Preprocess the image
# Call filtering functions 
def preprocess_image(image, apply_grayscale=True, apply_noise_removal=True, apply_thresholding=True):
    if apply_grayscale:
        image = get_grayscale(image)
        display_image('Grayscale Image', image)
    
    if apply_noise_removal:
        image = remove_noise(image)
        display_image('Noise Removed Image', image)
    
    if apply_thresholding:
        image = thresholding(image)
        display_image('Thresholded Image', image)
    
    return image

# Check if the image is clear (flag)
# TODO -- SET UP CRITERIA TO DETERMINE IF IMAGE IS CLEAR
is_image_clear = True

# Apply preprocessing based on image clarity
if is_image_clear:
    preprocessed_image = preprocess_image(img, apply_grayscale=True, apply_noise_removal=False, apply_thresholding=False)
else:
    preprocessed_image = preprocess_image(img, apply_grayscale=True, apply_noise_removal=True, apply_thresholding=True)

# Use Tesseract to extract text
text = pytesseract.image_to_string(preprocessed_image)
print(text)

# Close all OpenCV windows
cv2.destroyAllWindows()
