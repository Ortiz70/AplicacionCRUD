// Obtener elementos del DOM
const addProductBtn = document.getElementById('addProductBtn');
const productNameInput = document.getElementById('productName');
const productPriceInput = document.getElementById('productPrice');
const productUl = document.getElementById('productUl');

// Función para obtener productos desde localStorage
function getProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    return products;
}

// Función para renderizar productos en la lista
function renderProducts() {
    const products = getProducts();
    productUl.innerHTML = '';
    products.forEach((product, index) => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - $${product.price}`;
        li.appendChild(createEditButton(index));
        li.appendChild(createDeleteButton(index));
        productUl.appendChild(li);
    });
}

// Función para crear botón de editar
function createEditButton(index) {
    const button = document.createElement('button');
    button.textContent = 'Editar';
    button.onclick = () => editProduct(index);
    return button;
}

// Función para crear botón de borrar
function createDeleteButton(index) {
    const button = document.createElement('button');
    button.textContent = 'Borrar';
    button.onclick = () => deleteProduct(index);
    return button;
}

// Función para agregar producto
function addProduct() {
    const name = productNameInput.value;
    const price = parseFloat(productPriceInput.value);
    if (name && !isNaN(price)) {
        const products = getProducts();
        products.push({ name, price });
        localStorage.setItem('products', JSON.stringify(products));
        productNameInput.value = '';
        productPriceInput.value = '';
        renderProducts();
    }
}

// Función para editar producto
function editProduct(index) {
    const products = getProducts();
    const product = products[index];
    productNameInput.value = product.name;
    productPriceInput.value = product.price;
    deleteProduct(index);
}

// Función para borrar producto
function deleteProduct(index) {
    const products = getProducts();
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    renderProducts();
}

// Event listeners
addProductBtn.addEventListener('click', addProduct);

// Renderizar productos al cargar la página
renderProducts();
