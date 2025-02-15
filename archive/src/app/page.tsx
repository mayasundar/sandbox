"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/api", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
        .then((res) => res.json())
        .then((data) => setItems(data))
        .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  const collection = items.map((item) => {
    return (
        <div key={item.id} className="mb-8">
          <Image src={item.img} alt={item.name} width={245} height={342} />
          <h2 className="mt-2 text-xl font-bold">{item.name}</h2>
          <p className="mt-1 text-gray-700 dark:text-gray-300">{item.description}</p>
          {item.tags && (
              <div className="mt-2 flex flex-wrap gap-2">
                {JSON.parse(item.tags).map((tag, index) => (
                    <span
                        key={index}
                        className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-xs"
                    >
                {tag}
              </span>
                ))}
              </div>
          )}
        </div>
    );
  });

  return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-6xl">
          <h1 className="text-3xl font-bold mb-6">My Projects</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
            {collection}
          </div>

        </main>
      </div>
  );
}