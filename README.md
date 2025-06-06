# japan-travel-recommender

This project scraps cities information from japan-guide.com, a popular resource for tourist information about Japan. 
It extracts data about regions, prefectures, cities, ratings, visits, and recommendation levels, and saves them to a CSV file.
---

## WIP
- Clean csv data file.
- Create recommender to allow sorting of cities based on popularity/ratings/mixture of popularity & rating/hidden. gems where cities have high rating but low visits count 
- Build mvp to showcase data.
- Include geolocation to cities to generate itinerary based on filters.
- Include attractions and places of intrest within each cities. 
---

## Files
- **`japan_scraper.py`**  
  Main script that does the scrapping.
    - Loads region URLs using `scrap_regions.py`
    - Scrapes each region's destinations (prefecture/cities)
    - Extracts metadata: name, link, description, rating, visits, and recommendation tier
    - Outputs all results into a CSV file (`japan_cities.csv`)

- **`scrap_regions.py`**  
    Helper module that scrapes the list of all travel regions in Japan.  

- **`scrap_regions.py`**  
    Contains information with the following columns (
    Region,	Prefecture,	City, Link, Description, Rating,	Visits,	Recommendation) 

- **`data_prep_cities.ipynb`**  
    - Prepares the csv for use in the recommender system 
    - Handles missing value (okinawa being a prefecture and a region), duplicate values if any, NaN values
    - Exports to a new csv for use 
---

