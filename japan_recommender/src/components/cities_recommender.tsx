import { useState, useEffect, useActionState } from "react";

export default function JapaneseCitiesRecommender() {

  const [cities, setCities] = useState([]); 
  const [searchTerm, getSearchTerm] = useState("")

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

  const searchBarCities = cities.filter((filterCity) =>
    filterCity.city.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a,b) => b.rating - a.rating)

  return (
    <div>
      <div className = "px-12">
        <div className = "text-center text-charcoal">Japan travel recommender</div>
        <input
          type="text"
          placeholder="Search cities..."
          value={searchTerm}
          onChange={(e) => getSearchTerm(e.target.value)}
        />
        {/* 
        grid for display
        iterate through the array    
        {region, link, prefecture, rating, visits, longitude, city, Id, description, recommendation, latitude} 
        */} 
        <div className ="mt-6 grid grid-cols-3 gap-6">
          {searchBarCities.map((city) =>
            // sets the key 
            <div 
              key={city.Id}   
              className="border rounded-lg justify-center bg-wisteria/20 text-center"
            >
              <div className="flex border-b justify-center">{city.city} ({city.prefecture}, {city.region})</div>

              <div>Description: {city.description}</div>
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