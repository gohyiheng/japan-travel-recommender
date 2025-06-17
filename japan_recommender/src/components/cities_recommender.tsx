import { useState, useEffect, useActionState } from "react";

export default function JapaneseCitiesRecommender() {

  const [cities, setCities] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/cities`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setCities(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      });
  });

if (loading) return <p>Loading please wait.</p>
if (error) return <p>Error loading cities: {error}</p>;

  return (
    <div>
      <h1>Cities</h1>
      {/* show all items in db test */}
      <pre>{JSON.stringify(cities, null, 2)}</pre>
    </div>
  );
}