"use client";

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <h1 className="text-3xl font-bold mb-4">500 – Something went wrong</h1>
      <p className="mb-4 text-center max-w-md">
        An unexpected error has occurred. Please try again later.
      </p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-primary text-secondary rounded"
      >
        Try again
      </button>
    </div>
  );
}