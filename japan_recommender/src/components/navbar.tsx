import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-charcoal/20 shadow-lg backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 py-2">
            <div className="flex justify-between items-center">
                <Link href="/">
                    <span className="text-lg font-semibold hover:underline">Japan Travel</span>
                </Link>

                {/* Nav Items */}
                <div className="flex space-x-4 text-sm">
                    <Link href="/TripPlanner">
                        <span>Trip Planner</span>
                    </Link>
                </div>
            </div>
        </div>
    </nav>
  );
};

