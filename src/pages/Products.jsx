import { useMemo, useState } from 'react';
import { useProducts } from '../context/ProductsContext.jsx';
import PageHero from '../components/PageHero.jsx';
import Filters from '../components/Filters.jsx';
import Product from '../components/Product.jsx';

const Products = () => {
  const { products, loading } = useProducts();
  const [search, setSearch] = useState('');
  const [company, setCompany] = useState('all');
  const [priceValue, setPriceValue] = useState(null);

  const companies = useMemo(
    () => ['all', ...new Set(products.map((p) => p.company))],
    [products]
  );

  const maxPrice = useMemo(() => {
    if (products.length === 0) return 0;
    return Math.ceil(Math.max(...products.map((p) => p.price)) / 100);
  }, [products]);

  const price = priceValue === null ? maxPrice : priceValue;

  const filtered = products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .startsWith(search.toLowerCase());
    const matchCompany = company === 'all' || product.company === company;
    const matchPrice = product.price / 100 <= price;
    return matchSearch && matchCompany && matchPrice;
  });

  if (loading) {
    return (
      <div className="page-loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <>
      <PageHero title="Home / Products" />
      <section className="products">
        <Filters
          search={search}
          setSearch={setSearch}
          companies={companies}
          company={company}
          setCompany={setCompany}
          price={price}
          setPrice={setPriceValue}
          maxPrice={maxPrice}
        />
        <div className="products-container">
          {filtered.length < 1 ? (
            <h3 className="filter-error">
              sorry, no products matched your search
            </h3>
          ) : (
            filtered.map((product) => (
              <Product key={product.id} product={product} />
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default Products;
