// const url = 'http://localhost:3000/products';
const url = 'https://penta-brood-server.vercel.app/products';


function checkForInputs() {
    const name = document.getElementById('name').value || 2;
    const desc = document.getElementById('description').value || 2;
    const price = document.getElementById('price').value || 2;
    const sizes = document.getElementById('quantity').value || 2;
    const imageSrc = document.getElementById('imageSrc').value;
    const category = document.getElementById('category').value || 2;
    const timer = 0

    if (name && description && price && quantity && category) {
        const product = { name, desc, price, sizes, imageSrc, category }
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