import React from "react";
import { useEffect, useState } from "react";
import { client } from "../lib/client";

const TestSanity = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "product" && name match "*perfume*"] | order(_createdAt desc)[0...5]`;
        const result = await client.fetch(query);
        console.log("Sanity Data:", result);
        setProducts(result);
      } catch (error) {
        console.error("Error fetching data from Sanity:", error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Sanity Data Test</h1>
      {loading && <p>Loading...</p>}
      {!loading && products.length === 0 && <p>No products found.</p>}
      <ul>
        {products.map((product) => (
          <li key={product._id}>{product.name || "No Name"}</li>
        ))}
      </ul>
    </div>
  );
};

export default TestSanity;
