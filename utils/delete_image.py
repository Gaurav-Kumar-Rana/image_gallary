import os


def delete_image(filename, image_list, upload_folder):

    for i in range(len(image_list)):

        if image_list[i]["title"] == filename:

            # Delete physical image file
            filepath = os.path.join(
                upload_folder,
                filename
            )

            if os.path.exists(filepath):
                os.remove(filepath)

            # Remove image from list
            image_list.pop(i)

            return True

    return False