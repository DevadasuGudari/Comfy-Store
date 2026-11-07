const allProductsUrl = 'https://www.course-api.com/javascript-store-products';
const singleProductUrl =
  'https://www.course-api.com/javascript-store-single-product';

const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format((price / 100).toFixed(2));

const getStorageItem = (item) => {
  const storageItem = localStorage.getItem(item);
  return storageItem ? JSON.parse(storageItem) : [];
};

const setStorageItem = (name, item) => {
  localStorage.setItem(name, JSON.stringify(item));
};

// same as your old setupStore mapping
const normalizeProduct = (product) => {
  const {
    id,
    fields: { featured, name, price, company, colors, image: img, description },
  } = product;
  const image = img[0].thumbnails.large.url;
  return { id, featured, name, price, company, colors, image, description };
};

export {
  allProductsUrl,
  singleProductUrl,
  formatPrice,
  getStorageItem,
  setStorageItem,
  normalizeProduct,
};
