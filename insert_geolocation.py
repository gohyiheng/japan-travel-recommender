import pandas as pd 
import time
from geopy.geocoders import Nominatim
from geopy.extra.rate_limiter import RateLimiter

def get_coords(city, prefecture):

    # init nominatim
    geolocater = Nominatim(user_agent="CityGeocoder/1.0")

    # set rate limiter
    geocode = RateLimiter(geolocater.geocode, min_delay_seconds=4)

    try:
        location = geocode(f"{city}, {prefecture}, Japan")
        if location:
            return location.latitude, location.longitude
        else:
            location_nopref = geocode(f"{city}, Japan")
            if location_nopref:
                return location_nopref.latitude, location_nopref.longitude
            else:
                print("no results found for", city)
                return None,None

        return None,None

    except Exception as e:
        print("error: ", e)
        return None, None

def process_city(input_file, output_file):
    # read csv
    df = pd.read_csv(input_file)
    #print(df['City'])

    city_list = df['City']
    prefecture = df['Prefecture']

    # set coords
    df['Latitude'] = None
    df['Longitude'] = None

    
    for i in range(len(df)):
        city = df.at[i, 'City']
        prefecture = df.at[i, 'Prefecture']
        # get coords
        lat, long = get_coords(city, prefecture)

        df.at[i, 'Latitude'] = lat
        df.at[i, 'Longitude'] = long

        time.sleep(1)
        print(i,".",city,": DONE")
        print("lat: ",lat, "long: ",long)

    try:
        df.to_csv(OUTPUT_FILE, index=False)
    except Exception as e:
        print("error: ", e)


if __name__ == "__main__":


    INPUT_FILE = "japan_cities.csv"
    OUTPUT_FILE = "japan_cities_geolocation.csv"

    process_city(INPUT_FILE, OUTPUT_FILE)
