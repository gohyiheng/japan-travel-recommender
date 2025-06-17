import { useState, useEffect, useActionState } from "react";

export default function JapaneseCitiesRecommender() {

  const [cities, setCities] = useState([]); 

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

  return (
    <div>
      <h1>Cities</h1>
      {/* iterate through the array */}
      {/* {region, link, prefecture, rating, visits, longitude, city, Id, description, recommendation, latitude} */}
      <div className="grid grid-cols-4 gap-4">
        {cities.map((city) =>
          // sets the key 
          <div 
            key={city.Id}   
            className="border rounded-lg justify-center text-center"
          >
            <div>Region: {city.region}</div>
            <div>Prefecture: {city.prefecture}</div>
            <div>City: {city.city}</div>
            <div>Rating: {city.rating}</div>
            <div>Description: {city.description}</div>
            <div>Recommendation: {city.recommendation}</div>
            <div>Visits: {city.visits}</div>
            <div>Coordinates: ({city.longitude}, {city.latitude})</div>
            <div>Rating Normalized: {city.rating_normalized}</div>
            <div>Visits Normalized: {city.visits_normalized}</div>
            <div>Balanced Score: {city.balanced_score}</div>
            <div>Popular Score: {city.popular_score}</div>
            <div>Hidden Gem Score: {city.hidden_gem_score}</div>
          </div>
        )}
      </div>
    </div>
  );
}