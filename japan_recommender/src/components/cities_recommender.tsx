import React, { useEffect, useState } from "react";
import Papa from 'papaparse';

export default function Recommender() {

  const [ text, setText ] = useState();
  useEffect(() =>{
    Papa.parse('/japan_recommendation_cities.csv',{
      download: true, 

      complete: (results: { data: any; }) => {
        console.log("Parsed:", results.data);
        setText(JSON.stringify(results.data,null,1));
      },

      error: (err: any) => {
        console.error("Parsing error:", err);
      }
    })
  });


  return (
    <section>
      {/* content section */}
      <div className="max-w-7xl mx-auto">
        {/* page content */}
        {/* page header */}
        <div className="text-center text-charcoal/75 mt-6 mb-8">
          <h1 className="text-4xl font-bold  mb-4">
            Japan Travel Recommender
          </h1>
          <p className="text-xl text-charcoal/75">
            Discover places to visit for your next japan trip!
          </p>
        </div>
        {/* page content */}

        <div className="text-charcoal/75 p-4 text-center">
            <div className="flex flex-wrap justify-center gap-12">
                <div>
                    <div className="text-sm">Total Cities</div>
                </div>
                <div>
                    <div className="text-sm">Total Visits</div>
                </div>
                <div>
                    <div className="text-sm">Avg. Rating</div>
                </div>
                <div>
                    <div className="text-sm">Prefectures</div>
                </div>
            </div>
        </div>


        <div className="mt-6  overflow-hidden">
          <div>
            <h2>CSV Output:</h2>
            <pre className="max-h-144 overflow-y-auto p-4">    
              {text}
            </pre>
          </div>
        </div>
      </div>
  </section>


  );
}