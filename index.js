document.addEventListener('DOMContentLoaded', () => {
    // Get product data from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const product = {
        id: urlParams.get('id'),
        name: urlParams.get('name'),
        price: urlParams.get('price'),
        image: urlParams.get('image')
    };

    // Populate product details
    document.getElementById('product-image').src = product.image;
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-price').textContent = `Price: ₹${product.price}`;

    const showNotification = (message) => {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    };

    const addToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        showNotification('Item added to cart successfully!');
    };

    // Add to cart button event listener
    document.getElementById('add-to-cart-button').addEventListener('click', () => {
        addToCart(product);
    });
});
