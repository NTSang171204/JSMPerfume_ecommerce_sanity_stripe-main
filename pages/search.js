import React from "react";
import { useRouter } from "next/router";
import { client } from "../lib/client";
import Product from "../components/Product";
import Link from "next/link";

const PRODUCTS_PER_PAGE = 10;

const SearchPage = ({ products, totalProducts }) => {
  const router = useRouter();
  const { query, page = 1 } = router.query;
  const currentPage = Number(page);
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Search results for "{query}"</h1>

      {products.length > 0 ? (
        <div className="products-container">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}

      {/* Pagination Controls */}
      <div className="pagination-container">
        {currentPage > 1 && (
          <Link href={`/search?query=${query}&page=${currentPage - 1}`} className="btn-pagination">
            Previous
          </Link>
        )}

        <span>Page {currentPage} of {totalPages}</span>

        {currentPage < totalPages && (
          <Link href={`/search?query=${query}&page=${currentPage + 1}`} className="btn-pagination">
            Next
          </Link>
        )}
      </div>
    </div>
  );
};

// Fetch dữ liệu từ Sanity
export async function getServerSideProps({ query }) {
  const searchQuery = query.query || "";
  const currentPage = Number(query.page) || 1;
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const totalProducts = await client.fetch(
    `count(*[_type == "product" && name match "*${searchQuery}*"])`
  );

  const products = await client.fetch(
    `*[_type == "product" && name match "*${searchQuery}*"] | order(_createdAt desc) [${startIndex}...${startIndex + PRODUCTS_PER_PAGE}] {
      _id, name, price, slug, image
    }`
  );

  return {
    props: { products, totalProducts },
  };
}

export default SearchPage;
