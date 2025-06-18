import Navbar from "@/components/navbar";
import Link from "next/link";
import { useState, useEffect, useActionState } from "react";

export default function TripPlanner() {
    return(
        <div>
            <div className="mb-11"><Navbar/></div>
            <div className="flex h-screen">
                <div className="w-1/3 mx-auto bg-redamber/30">
                    <div className="h-full flex items-center justify-center">
                        <div className="fixed top-14">
                            <h3 className="text-2xl font-semibold text-charcoal/80 mb-4">
                                Plan your trip
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="w-2/3 p-8 bg-sky/15">
                    <div className="h-full flex items-center justify-center">
                        <div className="fixed top-14">
                            <h3 className="text-2xl font-semibold text-charcoal/80 mb-4">
                                Your Itinerary Map
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}