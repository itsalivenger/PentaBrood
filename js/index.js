addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});

function updateCartCount() {
    const cartCount = document.querySelector('.icons').querySelector('.number');
    const cart = getFromStorage('cart') || [];
    cartCount.innerHTML = cart.length;
}

function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function setInStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}