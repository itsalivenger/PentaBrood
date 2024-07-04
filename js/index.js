onload = ()=>{
    updateCartCount()
}

function updateCartCount() {
    const cartCount = document.querySelector('.icon-shopping-bag');
    const cart = getFromStorage('cart') || [];
    cartCount.innerHTML = cart.length;
}

function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function setInStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}