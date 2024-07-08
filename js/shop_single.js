// const url = 'http://localhost:3000/products';
const url = 'https://penta-brood-server.vercel.app/products';
const addToCartBtn = document.querySelector('#addToCartBtn');
let btnToggle = true;
const Product = {
  id: 1,
  name: 'tshirt',
  price: 40,
  qty: 1,
  imageSrc: 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  desc: 'hada tshirt',
  category: 'tshirt',
  size: '',
};
let currentProduct = {};

addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const product = await getProduct(id);
    currentProduct = product;
    console.log(product);
    setProductForPreview(product);
})

addToCartBtn.addEventListener('click', (e)=>{
  if(!addToCartBtn.disabled){
    e.preventDefault();
    if (addToCart()) {
      // Manually trigger the Bootstrap modal
      const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
      modal.show();
    }
  }
});


function addToCart() {
    const cart = getFromStorage('cart') || [];
    const qty = parseInt(document.getElementById('qty').value);
    currentProduct = Product;
    if (qty > 0 && currentProduct.size) {
        const existingProductIndex = cart.findIndex(item => item._id === currentProduct._id);
      
      currentProduct.qty = qty;
  
      if (existingProductIndex >= 0) {
        cart[existingProductIndex] = currentProduct; // Replace the existing product with the new one
      } else {
        cart.push(currentProduct); // Add the new product to the cart
      }
      
      setInStorage('cart', cart);
      return true
    } else {
      alert('Please select a size and a quantity greater than zero.');
      return false
    }
  }
  
  

function getProduct(id) {
    const product = fetch(`${url}?id=${id}`)
      .then(res => res.json())
      .then(data => {
        return data;
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });
    return product;
  }

  function updateQty(inc) {
    const qtyHtml = document.getElementById('qty');
    let currentQty = parseInt(qtyHtml.value);
    let newQty = currentQty + inc;
    currentProduct.qty = newQty;
    qtyHtml.value = newQty <= 0 ? 1 : newQty;
  }



  function setSize(size) {
    console.log('updated Size', size);
    addToCartBtn.classList.remove('disabled');
    currentProduct.size = size;
  }
  
  function setProductForPreview(product) {
    document.querySelector('#productImg').src = product.imageSrc;
    document.querySelector('#productName').innerText = product.name;
    document.querySelector('#productPrice').innerText = product.price + ' DH';
    document.querySelector('#productDesc').innerText = product.desc;
    document.querySelector('addToCartBtn').classList.remove('disabled');
  }
  
  function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  function setInStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }