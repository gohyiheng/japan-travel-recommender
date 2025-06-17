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
        {cities.map((city) =>
          // sets the key 
          <div key={city.Id}>
            <h2>Region: {city.region}</h2>
            <h2>Prefecture: {city.prefecture}</h2>
            <h2>City: {city.city}</h2>
            <h2>Desc: {city.description}</h2>
            <h2>Reccomendation: {city.recommendation}</h2>
            <h2>Rating: {city.rating}</h2>
            <h2>visits: {city.visits}</h2>
            <h2>coordinates ({city.longitude}, {city.latitude})</h2>
            <br></br>
          </div>
        )}
    </div>
  );
}