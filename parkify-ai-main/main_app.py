# imports
import cv2
import numpy as np
from skimage.io import imread
from skimage.color import rgb2gray
from skimage.filters import threshold_otsu
from skimage.filters import gaussian
from skimage.measure import label, regionprops
from skimage.util import invert
from scipy.spatial.distance import euclidean
from PIL import Image
from tensorflow.keras.models import load_model


def get_plate(img_path, model_alpha_path='model_alpha.h5', model_num_path='model_num.h5'):
    '''
    function to extract alphanumeric characters(of a number plate) from an image of a car
    '''
    try:
        # read the image and convert it to grayscale
        car = imread(img_path)
        
        gray_img=[]
        
        # if there are 3 channels to the image, convert it to grayscale
        if car.shape[2] == 3:
            gray_img = rgb2gray(car)
        else:
            gray_img = rgb2gray(rgba2rgb(car))

        # blur the image to remove any noise
        blurred_gray_img = gaussian(gray_img)
        
        thresh = 0.46 # experimentally calculated through otsu thresholding
        binary = invert(gray_img > thresh)
        label_image = label(binary, connectivity=2) # Find connected regions

        text_like_regions = []
        for region in regionprops(label_image):
            minr, minc, maxr, maxc = region.bbox
            w = maxc - minc
            h = maxr - minr

            asr = w/h # aspect ratio

            region_area = w*h

            wid,hei = blurred_gray_img.shape
            img_area = wid*hei

            
            if region_area > img_area/5000 and region_area < (0.2 * img_area) and asr < 1:
                text_like_regions.append(region)

        all_points = []
        for region in text_like_regions:
            minr, minc, maxr, maxc = region.bbox
            all_points.append([minc, minr, maxc, maxr])

        # Define the threshold for ymin, ymax difference and area similarity
        y_threshold = 5  # Adjust this value as needed

        # Sort the list of bounding boxes based on ymin (y-coordinate)
        sorted_boxes = sorted(all_points, key=lambda box: box[1])

        groups = []
        current_group = []

        # Iterate over the sorted boxes
        for box in sorted_boxes:
            if not current_group:
                current_group.append(box)
            else:
                prev_box = current_group[-1]
                ymin_diff = abs(box[1] - prev_box[1])
                ymax_diff = abs(box[3] - prev_box[3])

                if ymin_diff <= y_threshold and ymax_diff <= y_threshold :
                    current_group.append(box)
                else:
                    if len(current_group) >= 10:
                        groups.append(current_group[:10])  # Extract the first 10 bounding boxes
                    current_group = [box]

        # Check if the last group satisfies the condition
        if len(current_group) >= 10:
            groups.append(current_group[:10])  # Extract the first 10 bounding boxes
        
        groups = sorted(groups[0], key=lambda box: box[0])


        alpha = load_model(model_alpha_path, compile=False)
        num = load_model(model_num_path, compile=False)
        predictions = []
        # Load the image containing the license plate
        image_path = img_path
        image = cv2.imread(image_path)

        # Define the license plate coordinates
        license_plate_coords = groups

        # Perform OCR on each license plate coordinate
        for index, coords in enumerate(license_plate_coords):
            # Crop the license plate region
            xmin, ymin, xmax, ymax = coords
            license_plate = image[ymin:ymax, xmin:xmax]
            license_plate = cv2.resize(license_plate, (128, 128))
            # Add an extra dimension to represent the batch size
            x = np.expand_dims(license_plate, axis=0)

            if index in [0, 1, 4, 5]:
                # only 0, 1, 4, 5th index of number plates contain alphabets
                prediction = np.argmax(alpha.predict(x/255.))
                predictions.append(chr(ord('A') + prediction))
            else:
                # rest of the indices contain numbers
                prediction = np.argmax(num.predict(x/255.))
                predictions.append(chr(ord('0') + prediction))

        string_array = [str(item) for item in predictions]
        return "".join(string_array)
    except:
        return "No Plate Found"

# change the name of the car according to your image path name
print(get_plate(img_path='test_car_front.jpeg', model_alpha_path='model_alpha.h5', model_num_path='model_num.h5'))