// const url = 'http://localhost:3000';
const second = 1000;
const url = 'https://penta-brood-server.vercel.app';

addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    listenForSubscribeInput();
    getPopularAndRatedProds();
});

function getPopularAndRatedProds() {
    fetch(`${url}/products/popularAndRated`).then(res => res.json()).then(data => {
        const { products: { popular, rated } } = data;
        if (popular && rated) {
            if (popular.length && rated.length) {
                setPopularTemplate(popular.slice(0, 6));
                setRatedTemplate(rated.slice(6));
            }
        }else{
            console.log('no data', data);
        }
    })
}

function setRatedTemplate(prods) {
    const ratedContainer = document.getElementById('carouselInHome');

    for (let i = 0; i < prods.length; i++) {
        ratedContainer.innerHTML += `
            <div class="owl-item active" style="width: 346.667px; margin-right: 20px;"><div class="item">
                <div class="item-entry">
                  <a href="#" class="product-item md-height bg-gray d-block">
                    <img src=${prods[i].imageSrc} alt="Image" class="img-fluid">
                  </a>
                  <h2 class="item-title"><a href="#">${prods[i].name}</a></h2>
                  <strong class="item-price"><del>${prods[i].price} DH</del> ${prods[i].price} DH</strong>
                  <div class="star-rating">
                    ${prods[i].ratings ? prods[i].ratings.map(() => `<span class="icon-star text-warning"></span>`).join('') : ''}
                  </div>
                </div>
              </div>
            </div>`
    }
}

function setPopularTemplate(prods) {
    const popularContainer = document.getElementById('popularProds');

    for (const product of prods) {
        popularContainer.innerHTML += `<div class="col-lg-4 col-md-6 item-entry mb-4">
            <a href="#" class="product-item md-height bg-gray d-block">
              <img src="${product.imageSrc}" alt="Image" class="img-fluid">
            </a>
            <h2 class="item-title"><a href="#">${product.name}</a></h2>
            <strong class="item-price"><del>${product.price} DH</del> ${product.price} DH</strong>

            <div class="star-rating">
              ${product.ratings ? product.ratings.map(() => `<span class="icon-star text-warning"></span>`).join('') : ''}
            </div>

          </div>`
    }
}

function updateCartCount() {
    const cartCount = document.querySelector('.icons').querySelector('.number');
    const cart = getFromStorage('cart') || [];
    cartCount.innerHTML = cart.length;
}

function listenForSubscribeInput() {
    const submitEmailSub = document.querySelector('#email_subscribe');

    submitEmailSub.addEventListener('click', (e) => {
        e.preventDefault()
        // check for email validity
        const emailInput = document.querySelector('#email_subscribe').value;
        if (isValidEmail(emailInput)) {
            sendEmailForSubscribe(emailInput);
        } else {
            // togglePopUp('Email is not valid')
            alert('Please verify that your email is correct !')
        }
    });
}

async function sendEmailForSubscribe(email) {
    try {
        const req = await fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                type: 'subscribe'
            })
        }).then(res => res.json());
        console.log(req);
    } catch (error) {
        console.error('hak akhay l error', error);
    }
}

function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function setInStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function isValidEmail(email) {
    // Define the regular expression for a valid email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if email is a string and not empty
    if (typeof email !== 'string' || email.trim() === '') {
        return false;
    }

    // Test the email against the regular expression
    return emailRegex.test(email);
}