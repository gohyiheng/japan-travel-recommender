import Navbar from "@/components/navbar";
import Link from "next/link";
import { useState, useEffect, useActionState } from "react";

export default function DiscoverJapan() {

  const [cities, setCities] = useState([]); 
  const [searchTerm, getSearchTerm] = useState("")  
  const [sortKey, setSortKey] = useState("rating"); // default sort key
  const [sortOrder, setSortOrder] = useState("desc"); // "asc" or "desc"

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cities`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchCities();
  });

  function dynamicSort(a: { [x: string]: number; }, b: { [x: string]: number; }) {
    if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  }

  const searchBarCities = cities.filter((filterCity) =>
    filterCity.city.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort(dynamicSort)

  return (
    <div>
      <div className="mb-16"><Navbar/></div>
      <div className = "px-12">
        <div className = "text-center text-charcoal text-3xl font-bold mb-6">Discover Japan</div>
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
              <Link href={city.link} target="_blank">
                View more
              </Link>
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