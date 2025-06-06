import requests
from bs4 import BeautifulSoup
import csv
import time
from scrapRegion import scrape_regions

BASE_URL = 'https://www.japan-guide.com'

def scrape_cities(region_name, region_url, writer, dot_map):

    url = BASE_URL + region_url
    try:
        response = requests.get(region_url)
        soup = BeautifulSoup(response.text, 'html.parser')
    except Exception as e:
        print("err", e)
        return

    # get page content
    divLink = soup.select('.spot_list__category')

    # loop through content
    for item in divLink:
        # get prefecture spot_list__category__label
        prefTag = item.select_one('.spot_list__category__label')
        if prefTag:
            text = prefTag.get_text(strip=True)
            text_without_suffix = text.replace(' Prefecture', '')
            prefecture = text_without_suffix.strip()
        else:
            prefecture = 'NA'
        
        # get all cities in prefecture
        cityItems = item.select(".spot_list__spot")
        for cities in cityItems:
            # get title
            city_tag = cities.select_one('.spot_list__spot__name')
            if city_tag:
                # get title text
                raw_text = city_tag.get_text()
                city = raw_text.strip()
                # split title to get recommendations
                dot_count = city.count('•')

                # update recommendation
                recommendation = dot_map.get(dot_count, '')
                
                # clean the dots from the title
                city = city.replace('•', '')
            else:
                city = "NA"    
            
            # get link            
            next_link = city_tag['href']
            if next_link:
                link = 'https://www.japan-guide.com'+ next_link
            else:
                link = "NA"

            # get desc
            desc_tag = cities.select_one('.spot_list__spot__desc')
            if desc_tag:
                desc = desc_tag.get_text(strip=True)
            else:
                desc = "NA"
            
            # get rating 
            rating_tag = cities.select_one('.user_ratings__item--rating .user_ratings__value')
            if rating_tag:
                rating = rating_tag.get_text(strip=True)
            else:
                rating = "NA"
            
            # get visits
            visits_tag = cities.select_one('.user_ratings__item--been_there .user_ratings__value')
            if visits_tag:
                visits = visits_tag.get_text(strip=True)
            else:
                visits = "NA"

            writer.writerow({
                'Region': region_name,
                'Prefecture': prefecture or 'NA',
                'City': city,
                'Link': link,
                'Description': desc,
                'Rating': rating,
                'Visits': visits,
                'Recommendation': recommendation
        })


#----------------------------------------------------------------------------
# main
def scrape():
    # set up map for recommendation
    dotMap = {
        0: '',
        1: 'Recommended',
        2: 'Highly Recommended',
        3: 'Must Visit'
    }
    
    # get all regions
    regions = scrape_regions()
    
    # set up csv writer
    filename = "japan_cities.csv"
    with open (filename, 'w', newline='', encoding='utf-8') as csvfile:
        fieldnames = ['Region', 'Prefecture', 'City', 'Link', 'Description', 'Rating', 'Visits', 'Recommendation']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        
        #scrape_cities("kyushu", "https://www.japan-guide.com/list/e1108.html", writer, dotMap)   
        for regionName, regionUrl in regions:
            scrape_cities(regionName, regionUrl, writer, dotMap)
            print(f"{regionName} done")
            time.sleep(10)
            print("sleep done")

if __name__ == '__main__':
    scrape()