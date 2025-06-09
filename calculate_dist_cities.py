import pandas as pd
import numpy as np
from geopy.distance import geodesic

def calculate_distance(city1, city2):
    
    #print(city1,city2)
    R = 6371 
    
    lat1 = np.radians(city1['Latitude'])
    lon1 = np.radians(city1['Longitude'])
    lat2 = np.radians(city2['Latitude'])
    lon2 = np.radians(city2['Longitude'])
    
    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = np.sin(dlat / 2)**2 + np.cos(lat1) * np.cos(lat2) * np.sin(dlon / 2)**2
    c = 2 * np.arcsin(np.sqrt(a))
    final_dist = R * c
    
    print("harvesine: ", final_dist)
    
    print("geodesic: ", geodesic((city1['Latitude'], city1['Longitude']),
                                 (city2['Latitude'], city2['Longitude'])).km)

def get_coords(input_file, output_file):
    # read csv
    df = pd.read_csv(input_file)
    
    # get city, long, lat
    filtered = df[['City', 'Longitude', 'Latitude']]
    #print(filtered.iloc[0])
    
    # test 2 cities
    city1 = filtered.iloc[0]
    city2 = filtered.iloc[1]
    
    # TODO: iterate and calculate distance
    
    calculate_distance(city1, city2)

if __name__ == '__main__':
    INPUT_FILE = "./csv/japan_cities_geolocation.csv"
    OUTPUT_FILE = "./csv/japan_cities_distance.csv"
    
    get_coords(INPUT_FILE, OUTPUT_FILE)