// filepath: /d:/Personal Projects/ecommerce_sanity_stripe-main/pages/products.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { client } from '../lib/client';
import Product from '../components/Product';
const PRODUCTS_PER_PAGE = 10;

const ProductsPage = ({ initialProducts, totalProducts }) => {
  const router = useRouter();
  const { page = 1 } = router.query;
  const [products, setProducts] = useState(initialProducts);
  const [currentPage, setCurrentPage] = useState(Number(page));
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  useEffect(() => {
    if (currentPage !== Number(page)) {
      router.push(`/products?page=${currentPage}`);
    }
  }, [currentPage]);

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "product"] | order(_createdAt desc) [${(currentPage - 1) * PRODUCTS_PER_PAGE}...${currentPage * PRODUCTS_PER_PAGE}]`;
      const newProducts = await client.fetch(query);
      setProducts(newProducts);
    };

    fetchProducts();
  }, [currentPage]);

  return (
    <div className="products-page-container">
      <h1 className="products-heading">Products</h1>

      <div className="products-container">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      <div className="pagination-container">
        {currentPage > 1 && (
          <button onClick={() => setCurrentPage(currentPage - 1)} className="btn-pagination">
            Previous
          </button>
        )}

        <span>Page {currentPage} of {totalPages}</span>

        {currentPage < totalPages && (
          <button onClick={() => setCurrentPage(currentPage + 1)} className="btn-pagination">
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { page = 1 } = context.query;
  const query = `*[_type == "product"] | order(_createdAt desc) [${(page - 1) * PRODUCTS_PER_PAGE}...${page * PRODUCTS_PER_PAGE}]`;
  const totalQuery = '*[_type == "product"] { _id }';

  const products = await client.fetch(query);
  const totalProducts = await client.fetch(totalQuery);

  return {
    props: {
      initialProducts: products,
      totalProducts: totalProducts.length,
    },
  };
};

export default ProductsPage;