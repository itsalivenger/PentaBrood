// const url = 'http://localhost:3000/checkout';
const url = 'https://penta-brood-server.vercel.app/checkout';

addEventListener('DOMContentLoaded', () => {
    const checkoutBtn = document.querySelector('#checkoutBtn');
    checkoutBtn.addEventListener('click', () => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cart: getFromStorage('cart')
            })
        }).then((res) => res.json()).then(({line_items, session: {url}}) => {
            console.log(line_items, url)
            location.href = url
        })
    })
})