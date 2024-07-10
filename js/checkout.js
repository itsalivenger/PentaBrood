// const url = 'http://localhost:3000/checkout';
const url = 'https://penta-brood-server.vercel.app/checkout';

addEventListener('DOMContentLoaded', () => {
    handleCheckoutListener();
    updateOrder();
})

function updateOrder() {
    const orderTable = document.querySelector('#orderTable');
    const cart = getFromStorage('cart');

    for (let i = 0; i < cart.length; i++) {
        orderTable.innerHTML += productTemplateInOrder(cart[i]);
    }

    const total = cart.reduce((a, ele) => {
        return a + ele.price * ele.qty
    }, 0);
    orderTable.innerHTML += totalTemplate(total);
}

function totalTemplate(total) {
    return `<tr>
                <td class="text-black font-weight-bold"><strong>Cart Subtotal</strong></td>
                <td class="text-black">${total} DH</td>
            </tr>
            <tr>
                <td class="text-black font-weight-bold"><strong>Order Total</strong></td>
                <td class="text-black font-weight-bold"><strong>${total} DH</strong></td>
            </tr>`
}
function productTemplateInOrder({price, qty, name}) {
    return `<tr>
                <td>${name} <strong class="mx-2">x</strong> ${qty}</td>
                <td>${price * qty} DH</td>
            </tr>`
}

function handleCheckoutListener() {
    const checkoutBtn = document.querySelector('#checkoutBtn');
    checkoutBtn.addEventListener('click', () => {
        const user = inputsAreFilled();
        if(user){
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cart: getFromStorage('cart'),
                    user
                })
            }).then((res) => res.json()).then(({line_items, session}) => {
                const { url } = session
                console.log(line_items, url, session)
                location.href = url
            })
        }else{
            alert('please fill all inputs')
        }
    })
}

function inputsAreFilled() {
    const fname = document.querySelector('#c_fname').value;
    const lname = document.querySelector('#c_lname').value;
    const phone = document.querySelector('#c_phone').value;
    const email = document.querySelector('#c_email').value;
    const companyName = document.querySelector('#c_companyname').value;
    const adress = document.querySelector('#c_address').value;
    const city = document.querySelector('#c_city').value;
    const postalCode = document.querySelector('#c_postalCode').value;
    const orderNotes = document.querySelector('#c_order_notes').value;
    if(fname && lname && phone && email && companyName && adress && city && postalCode){
        return {
            fname,
            lname,
            phone,
            email,
            companyName,
            adress,
            city,
            postalCode,
            orderNotes
        }
    }
    return false
}