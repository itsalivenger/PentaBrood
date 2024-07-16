// const url = 'http://localhost:3000';
const url = 'https://penta-brood-server.vercel.app';

addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    listenForSubscribeInput();
});

function updateCartCount() {
    const cartCount = document.querySelector('.icons').querySelector('.number');
    const cart = getFromStorage('cart') || [];
    cartCount.innerHTML = cart.length;
}

function listenForSubscribeInput() {
    const submitEmailSub = document.querySelector('#submitEmailSub');

    submitEmailSub.addEventListener('click', (e) => {
        e.preventDefault()
        // check for email validity
        const emailInput = document.querySelector('#email_subscribe').value;
        if (isValidEmail(emailInput)) {
            sendEmailForSubscribe(emailInput);
        }else{
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