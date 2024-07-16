let gProducts = []

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
      gProducts = products
      resetFilter()
    } catch (error) {
      console.error('Error loading products:', error);
    }
    
    loadCategories();
    // filter by category
    const categories = document.querySelectorAll('.categories');

    for (let i = 0; i < categories.length; i++) {
      categories[i].addEventListener('click', ()=> sortByCategory(categories[i].dataset.value))
      categories[i].id = `${categories[i].dataset.value}Btn`;
    }

    // filter by price
    const priceSlider = document.querySelector('#amount');
    const [, min, max] = priceSlider.value.match(/\$?(\d+)\s*-\s*\$?(\d+)/);
    document.querySelector('#filterByPriceBtn').addEventListener('click', ()=> sortByPrice(min, max))

    // reset filter
    const resetFilterBtn = document.getElementById('resetFilter');
    resetFilterBtn.addEventListener('click', ()=> resetFilter()) 

    // set number of items by filter
    countProductsByCategory();

    // filter by urlParam
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const categoryHtmlEle = document.getElementById(`${category}Btn`);
    if(categoryHtmlEle) categoryHtmlEle.click();
  });

function sortByCategory(category) {
  const shopItemsContainer = document.querySelector("#productsContainer");
  shopItemsContainer.innerHTML = '';
  gProducts.forEach((product)=>{
    if(product.category === category || category == 'All'){
      shopItemsContainer.innerHTML += productTemplate(product);
    }
  })
}

function sortByPrice(priceMin, priceMax) {
  const shopItemsContainer = document.querySelector("#productsContainer");
  shopItemsContainer.innerHTML = '';
  gProducts.forEach((product)=>{
    console.log(priceMin);
    if(parseInt(product.price) >= priceMin && parseInt(product.price) <= priceMax){
      shopItemsContainer.innerHTML += productTemplate(product);
    }
  })
}

function resetFilter() {
  const shopItemsContainer = document.querySelector("#productsContainer");
  shopItemsContainer.innerHTML = '';
  gProducts.forEach((product)=>{
    shopItemsContainer.innerHTML += productTemplate(product);
  })
}

function countProductsByCategory() {
  // Object to store category counts
  let categoryCounts = {};

  // Iterate through each product
  gProducts.forEach(product => {
      let category = product.category;

      // Increment count for the category
      if (categoryCounts[category]) {
          categoryCounts[category]++;
      } else {
          categoryCounts[category] = 1;
      }
  });

  // Convert categoryCounts object to array of objects with category and number properties
  const result = Object.keys(categoryCounts).map(category => ({
      category,
      number: categoryCounts[category]
  }));


  result.forEach(({category, number}) => {
    let span = document.querySelector('#' + category + 'Num');
    span.innerText = `(${number})`;
  });

  // calculating the products count (how many products are there)
  const productsCount = result.reduce((a, ele) => {
    return a + ele.number;
  }, 0)
  document.querySelector('#AllNum').innerText = `(${productsCount})`;

  return result;
}

function loadCategories() {
  const categories = [];
  gProducts.forEach(product => {
    let category = product.category;

    // Initialize the category array if it doesn't exist
    if (!categories.includes(category)) {
        categories.push(category);
    }
  });
  
  categories.forEach((category) => {
    const categoryHTML = document.getElementById('categoriesList');
    categoryHTML.innerHTML += `<li class="mb-3 categories text-danger" data-value=${category}><span class="d-flex"><span>${category}</span>
                    <span id=${category + "Num"} class="text-black ml-auto">(0)</span></span></li>`
  })
}


async function fetchProducts() {
  try {
    const response = await fetch(`${url}/products/shop`, {
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
