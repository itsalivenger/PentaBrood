const url = 'https://penta-brood-server.vercel.app';

// Sample product template
const productTemplate = ({ name, price, ImgSrc }) => `
  <div class="col-lg-6 col-md-6 item-entry mb-4">
    <a href="#" class="product-item md-height bg-gray d-block">
      <img src="${ImgSrc}" alt="Image" class="img-fluid">
    </a>
    <h2 class="item-title"><a href="#">${name}</a></h2>
    <strong class="item-price">${price} DH</strong>
  </div>`;

window.onload = async () => {
  const products = await fetchProducts();
  console.log(products);

  const shopItemsContainer = document.querySelector("#productsContainer");
  products.forEach(product => {
    shopItemsContainer.innerHTML += productTemplate(product);
  });
};

async function fetchProducts() {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}
