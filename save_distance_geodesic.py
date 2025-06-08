import pandas as pd
from geopy.distance import geodesic
from itertools import combinations

def calculate_all_geodesic_distances(input_file, output_file):
    df = pd.read_csv(input_file)
    # Prepare results
    results = []

    # Loop over unique city pairs only
    for i, j in combinations(range(len(df)), 2):
        city1 = df.iloc[i]
        city2 = df.iloc[j]

        coord1 = (city1['Latitude'], city1['Longitude'])
        coord2 = (city2['Latitude'], city2['Longitude'])

        distance_km = round(geodesic(coord1, coord2).km, 2)

        results.append({
            'City1': city1['City'],
            'City2': city2['City'],
            'Distance_km': distance_km
        })

    # Save to CSV
    result_df = pd.DataFrame(results)
    result_df.to_csv(output_file, index=False)
    print("saved result to csv, pairs: ",len(results))

if __name__ == '__main__':
    INPUT_FILE = './csv/japan_cities_geolocation_cleaned.csv'
    OUTPUT_FILE = './csv/geodesic_city_distances.csv'

    calculate_all_geodesic_distances(INPUT_FILE, OUTPUT_FILE)
