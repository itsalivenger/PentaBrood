const Product = {
    id: 1,
    name: 'tshirt',
    price: 40,
    qty: 1,
    imageSrc: 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    desc: 'hada tshirt',
    category: 'tshirt'
};

window.onload = () => {
    updateTotals();
    updateCart();
};

function updateCart() {
    const cart = getFromStorage('cart') || [Product];
    const ProdListHTML = document.querySelector('.ProdList');
    ProdListHTML.innerHTML = '';
    for (let i = 0; i < cart.length; i++) {
        ProdListHTML.innerHTML += setItemInStrForHTML(cart[i]);
    }
}
function updateQty(inc, id) {
    const cart = getFromStorage('cart') || [Product];
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == id && cart[i].qty + inc > 0) {
            cart[i].qty += inc
        }
    }
    setInStorage('cart', cart);
    updateCart();
    updateTotals();
}

function removeItemFromCart(itemId) {
    const cart = getFromStorage('cart') || [Product];
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == itemId) {
            cart.splice(i, 1);
        }
    }
    setInStorage('cart', cart);
    updateCart();
    updateTotals();
}

function updateTotals() {
    const cart = getFromStorage('cart') || [Product];
    const total = cart.reduce((a, ele) => {
        return a + ele.price * ele.qty
    }, 0);

    document.querySelector('.total').innerHTML = `${total} DH`;
    document.querySelector('.subTotal').innerHTML = `${total} DH`;
}

function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function setInStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function setItemInStrForHTML({ id, imageSrc, name, price, qty }) {
    return `<tr>
                <td id='spons' class="product-thumbnail">
                  <img src=${imageSrc} alt="Image" class="img-fluid ProdImg">
                </td>
                <td class="product-name">
                  <h2 class="h5 text-black ProdTitle">${name}</h2>
                </td>
                <td class="ProdPrice">${price} DH</td>
                <td>
                  <div class="input-group mb-3" style="max-width: 120px;">
                    <div class="input-group-prepend">
                      <button onClick='updateQty(-1, ${id})' class="btn btn-outline-primary js-btn-minus" type="button">&minus;</button>
                    </div>
                    <input type="text" class="form-control text-center ProdQty" value=${qty} placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1">
                    <div class="input-group-append">
                      <button onClick='updateQty(1, ${id})' class="btn btn-outline-primary js-btn-plus" type="button">&plus;</button>
                    </div>
                  </div>
                </td>
                <td class="ProdTotal">${price * qty} DH</td>
                <td><a onclick='removeItemFromCart(${id})' class="btn btn-primary height-auto btn-sm">X</a></td>
              </tr>`;
}
