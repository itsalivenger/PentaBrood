// const url = 'http://localhost:3000/products';
const url = 'https://penta-brood-server.vercel.app/products';


function checkForInputs() {
    const name = document.getElementById('name').value || 2;
    const description = document.getElementById('description').value || 2;
    const price = document.getElementById('price').value || 2;
    const quantity = document.getElementById('quantity').value || 2;
    const image = 'imageSrc' || 2;
    const category = document.getElementById('category').value || 2;
    const timer = 0

    if (name && description && price && quantity && category) {
        const product = { name, description, price, quantity, image, category }
        addProduct(product)
    }else{
        timer++;
        if(timer >= 3){
            alert('a3chirey ghi chof kidir meana... rah baqi khassek chi data 3la produit madkheltihach');
        }else{
            alert('a3chirey rah baqi madkhelti ga3 data 3la dak l produit...');
        }
    }
}

function addProduct(product) {
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    }).then((res) => res.json()).then((data) => console.log(data))
}