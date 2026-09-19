def find_image(new_filename,Image_list):
    for i in range(len(Image_list)):
        if Image_list[i]["title"] == new_filename:
            return i
    return -1


    
    