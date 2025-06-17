import { useState, useEffect, useActionState } from "react";

export default function JapaneseCitiesRecommender() {

  const [cities, setCities] = useState([]); 
  const [searchTerm, getSearchTerm] = useState("")  
  const [sortKey, setSortKey] = useState("rating"); // default sort key
  const [sortOrder, setSortOrder] = useState("desc"); // "asc" or "desc"

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/cities`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setCities(data);
      })
      .catch(err => {
        console.error("Fetch error:", err);
      });
  });

  function dynamicSort(a, b) {
    if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  }

  const searchBarCities = cities.filter((filterCity) =>
    filterCity.city.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort(dynamicSort)

  return (
    <div>
      <div className = "px-12">
        <div className = "text-center text-charcoal text-3xl font-bold mb-6">Japan travel recommender</div>
          <div className="flex items-center space-x-4">
            {/* user search bar */}
            <input
              type="text"
              placeholder="Search cities..."
              value={searchTerm}
              onChange={(e) => getSearchTerm(e.target.value)}
              className="flex-grow"
            />
            {/* user filter */}
            <div className="">
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value)}
              >
                <option value="rating">Rating</option>
                <option value="visits">Visits</option>
                <option value="popular_score">Popularity</option>
                <option value="hidden_gem_score">Hidden gems</option>
              </select>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>

        {/* 
        grid for display
        iterate through the array    
        {region, link, prefecture, rating, visits, longitude, city, Id, description, recommendation, latitude} 
        */} 
        <div className ="mt-6 grid grid-cols-2 gap-6 lg:grid-cols-3 ">
          {searchBarCities.map((city) =>
            // sets the key 
            <div 
              key={city.Id}   
              className="border rounded-lg justify-center bg-wisteria/20 text-center hover:shadow-lg"
            >
              <div className="flex border-b justify-center">{city.city} ({city.prefecture}, {city.region})</div>

              <div>{city.description}</div>
              {/* <div>Recommendation: {city.recommendation}</div> */}
              <div>Visits: {city.visits}</div>
              <div>Rating: {city.rating}</div>
              {/* <div>Coordinates: ({city.longitude}, {city.latitude})</div>
              <div>Rating Normalized: {city.rating_normalized}</div>
              <div>Visits Normalized: {city.visits_normalized}</div>
              <div>Balanced Score: {city.balanced_score}</div>
              <div>Popular Score: {city.popular_score}</div>
              <div>Hidden Gem Score: {city.hidden_gem_score}</div> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}