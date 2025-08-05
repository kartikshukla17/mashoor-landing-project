"use client";

import { useEffect, useState } from 'react';

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t bg-secondary dark:bg-primary py-6 mt-auto">
      <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
        © {year} Mashur. All rights reserved.
      </div>
    </footer>
  );
}