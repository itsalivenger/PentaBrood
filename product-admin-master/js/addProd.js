// const url = 'http://localhost:3000/products';
const url = 'https://penta-brood-server.vercel.app/products';


function checkForInputs() {
    const name = document.getElementById('name').value;
    const desc = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const sizes = document.getElementById('quantity').value;
    const imageSrc = document.getElementById('imageSrc').value;
    const category = document.getElementById('category').value;
    const timer = 0

    if (name && description && price && quantity && category) {
        const product = { name, desc, price, sizes, imageSrc, category }
        addProduct(product)
    }else{
        timer++;
        if(timer >= 3){
            alert('a3chirey ghi chof kidir meana... rah baqi khassek chi data 3la produit madkheltihach');
        }else{
            alert('a3chirey rah baqi madkhelti ga3 data 3la dak l produit... Kifach biti produit idkhel o nta mazal madkhelti ta ahaj eliha  echirey !!! RAH A EHCIRYE MAKAL#BOCH HNA A ECHIREY DKHEL L DAKCHI INFO DYALO BACH NDKHLO LIK L PRODUIT A ECHIREY WAH !');
        }
    }
}

function addProduct(product) {
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    }).then((res) => res.json()).then((data) => {
        console.log(data);
        if(data.error){
            console.error(error);
            alert('Error adding product');
        }else{
            clearInputs();
            alert('Product added successfully ! lay3tik se7a a echirey t ajoutaw les produits o dakchi hwaaaa hadak. la bghiti checkih ser l shop checki');
        }
    })
}

function clearInputs() {
    document.getElementById('name').value = '';
    document.getElementById('description').value = '';
    document.getElementById('price').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('imageSrc').value = '';
    document.getElementById('category').value = '';
}