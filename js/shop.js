// const url = 'http://localhost:3000/products/shop';
const url = 'https://penta-brood-server.vercel.app/products/shop';

// Sample product template
const productTemplate = ({_id, name, price, imageSrc }) => `
  <div class="col-lg-6 col-md-6 item-entry mb-4">
    <a href=${`/PentaBrood/shop-single.html?id=${_id}`} class="product-item md-height bg-gray d-block">
      <img src="${imageSrc}" alt="Image" class="img-fluid">
    </a>
    <h2 class="item-title"><a href="#">${name}</a></h2>
    <strong class="item-price">${price} DH</strong>
  </div>`;

  document.addEventListener("DOMContentLoaded", async () => {
    try {
      const {txt, products} = await fetchProducts();
  
      const shopItemsContainer = document.querySelector("#productsContainer");
      products.forEach(product => {
        shopItemsContainer.innerHTML += productTemplate(product);
      });
    } catch (error) {
      console.error('Error loading products:', error);
    }
  });
  
async function fetchProducts() {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}
