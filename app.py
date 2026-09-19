from flask import Flask, request, jsonify, render_template 
from flask_cors import CORS 
from werkzeug.utils import secure_filename 
from utils.find_image import find_image
import os 
import json
from utils.delete_image import delete_image
from utils.search_image import search_image
 
app = Flask(__name__) 
CORS(app) 
 
UPLOAD_FOLDER = os.path.join(app.root_path, 'static', 'uploads') 
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER 
os.makedirs(UPLOAD_FOLDER, exist_ok=True) 
 
JSON_FILE= "images.json"

# Load existing images
if os.path.exists(JSON_FILE):
    try:
        with open(JSON_FILE, "r") as file:
            images = json.load(file)
    except (json.JSONDecodeError, FileNotFoundError):
        images = []
else:
    images = []



def save_images():
    with open(JSON_FILE, "w") as file:
        json.dump(images, file, indent=4)


ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}


def extension_allow(filename):
    return (
        "." in filename
        and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS
    )



 
@app.route('/') 
def index(): 
    return render_template('index.html') 
 
@app.route('/images', methods=['GET']) 
def get_images(): 
    return jsonify(images) 
 
@app.route('/upload', methods=['POST']) 
def upload_image(): 

    if 'image' not in request.files: 
        return jsonify({"error": "No image selected"
                        }), 400 
     
    file = request.files['image'] 

    if file.filename == '': 

        return jsonify({
            "error": "No images selected"
            }), 400 
 
    filename = secure_filename(file.filename) 


    # check valid filename
    if not filename:

        return jsonify({
            "error": "Invalid filename"}), 400
    

    # CHeck file extension

    if not extension_allow(filename):


        return jsonify({
            "error": "File type not allowed"
            }), 400
    



    # USed your find_image fn.
    new_file_index = find_image(
        filename,
        images)
    

    # If filename already exists
    if new_file_index != -1:
        return jsonify({
            "error": "File already exists"
            }), 400
    


    # create file path
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename) 

    # Save Image
    file.save(filepath) 
     
    image_url = f"/static/uploads/{filename}" 


    # Add image information
    images.append({
        "title": filename,
        "url": image_url
        }) 

    # Save information
    save_images()

    # Response
    return jsonify({
        "message": "Image uploaded!",
        "images": {
            "title":filename,
            "url": image_url
        }
        }), 201 



@app.route('/search', methods=['GET'])
def search_images():


    

    search_name = request.args.get("name","").strip()

    if not search_name:
        return jsonify({"error": "Please enter image name"}), 400
    results = search_image(
    search_name,
    images
)
    return jsonify(results), 200







@app.route('/delete/<filename>', methods=['DELETE'])
def delete_image_route(filename):

    filename = secure_filename(filename)

    deleted = delete_image(
        filename,
        images,
        app.config['UPLOAD_FOLDER']
    )

    if not deleted:
        return jsonify({
            "error": "Image not found"
        }), 404

    save_images()

    return jsonify({
        "message": "Image deleted successfully"
    }), 200


 
if __name__ == '__main__':
    app.run(debug=True, port=5005) 
