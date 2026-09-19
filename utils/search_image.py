def search_image(search_name, image_list):

    results = []

    for image in image_list:

        if search_name.lower() in image["title"].lower():

            results.append(image)

    return results