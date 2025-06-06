# region_scraper.py
import requests
from bs4 import BeautifulSoup

BASE_URL = 'https://www.japan-guide.com'

def scrape_regions():
    # destination website with all regions
    url = BASE_URL + '/e/e623a.html'
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    # store regions
    regions = []

    region_links = soup.select('a.map__spot--region')
    
    # gets all link and region name
    for item in region_links:
        regionLink = item['href']
        if regionLink:
            link =  BASE_URL + regionLink
        else:
            link = 'NA'
            
        if item:
            regionName = item.get_text(strip=True)
        else:
            regionName = 'NA'

        regions.append((regionName, link))

    return regions
