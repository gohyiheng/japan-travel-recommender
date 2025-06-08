import pandas as pd

def filter_invalid_coords(input_file):
    df = pd.read_csv(input_file)

    # Keep only valid rows
    valid_coords_df = df.dropna(subset=['Latitude', 'Longitude'])

    valid_coords_df.to_csv('./csv/japan_cities_geolocation_cleaned.csv', index=False)


INPUT_FILE = "./csv/japan_cities_geolocation.csv"
filter_invalid_coords(INPUT_FILE)
