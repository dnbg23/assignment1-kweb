document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');

    function getCart() {
        try {
            return JSON.parse(localStorage.getItem('cart')) || { items: [], totalPrice: 0 };
        } catch (e) {
            console.error("Error parsing cart data from localStorage:", e);
            return { items: [], totalPrice: 0 };
        }
    }

    function calculateTotalPrice(cart) {
        return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    function updateCartDisplay() {
        const cart = getCart();
        cartItemsContainer.innerHTML = '';
        cartTotalContainer.innerHTML = '';

        cart.items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `
                <p>${item.name} - ${item.price} KRW x ${item.quantity}</p>
                <button class="quantity-btn remove-btn" data-product-name="${item.name}" data-product-price="${item.price}">
                    <i class="fas fa-minus"></i>
                </button>
                <button class="quantity-btn add-btn" data-product-name="${item.name}" data-product-price="${item.price}">
                    <i class="fas fa-plus"></i>
                </button>
            `;
            cartItemsContainer.appendChild(itemDiv);
        });

        cart.totalPrice = calculateTotalPrice(cart);
        cartTotalContainer.innerHTML = `<h3>Total Price: ${cart.totalPrice} KRW</h3>`;

        // Add event listeners
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                updateItemQuantity(this.dataset.productName, parseInt(this.dataset.productPrice, 10), -1);
            });
        });

        document.querySelectorAll('.add-btn').forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                updateItemQuantity(this.dataset.productName, parseInt(this.dataset.productPrice, 10), 1);
            });
        });
    }

    function updateItemQuantity(productName, price, quantityChange) {
        let cart = getCart();
        const itemIndex = cart.items.findIndex(item => item.name === productName);

        if (itemIndex !== -1) {
            const item = cart.items[itemIndex];
            item.quantity += quantityChange;
            if (item.quantity <= 0) {
                cart.items.splice(itemIndex, 1); // Remove item if quantity is 0 or less
            }
            cart.totalPrice = calculateTotalPrice(cart);
        } else if (quantityChange > 0) {
            cart.items.push({ name: productName, price: price, quantity: 1 });
            cart.totalPrice = calculateTotalPrice(cart);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }

    updateCartDisplay();
});

