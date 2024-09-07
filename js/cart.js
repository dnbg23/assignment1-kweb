document.addEventListener('DOMContentLoaded', function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || {
        items: [],
        totalPrice: 0
    };

    let cartItemsContainer = document.getElementById('cart-items');
    let cartTotalContainer = document.getElementById('cart-total');

    function getCart() {
        return JSON.parse(localStorage.getItem('cart')) || { items: [], totalPrice: 0};
    }

    function calculateTotalPrice(cart) {
        return cart.items.reduce((total, item) => total + (item.price * item.quantity) , 0);
    }

    function updateCartDisplay () {

        let cart = getCart();
        let cartItemsContainer = document.getElementById('cart-items');
        let cartTotalContainer = document.getElementById('cart-total');

        cartItemsContainer.innerHTML = '';
        cartTotalContainer.innerHTML = '';
    
        cart.items.forEach(item => {
            let itemDiv = document.createElement('div');
            itemDiv.innerHTML = `
                <p>${item.name} - ${item.price} KRW x ${item.quantity}</p>
                <button class="add-btn" data-product-name="${item.name}" data-product-price="${item.price}">
                    <i class="fas fa-plus"></i>
                </button>
                <button class="remove-btn" data-product-name="${item.name}" data-product-price="${item.price}">
                    <i class="fas fa-minus"></i>
                </button>
            `;
            cartItemsContainer.appendChild(itemDiv);
        });

        cart.totalPrice = calculateTotalPrice(cart);
        cartTotalContainer.innerHTML = `<h3>Total Price: ${cart.totalPrice} KRW</h3>`;
    
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();
            
                let productName = this.dataset.productName;
                let price = parseInt(this.dataset.productPrice,10);

                let cart = getCart();
                let itemIndex = cart.items.findIndex(item => item.name === productName);
                if (itemIndex !== -1) {
                    let item = cart.items[itemIndex];
                    if (item.quantity > 1) {
                        item.quantity -= 1;
                        cart.totalPrice -= price;
                    } else {
                        cart.items.splice(itemIndex, 1);
                    }
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCartDisplay();
                }
            });
        });

        document.querySelectorAll('.add-btn').forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();

                let productName = this.dataset.productName;
                let price = parseInt(this.dataset.productPrice, 10);

                let cart = getCart();
                let itemIndex = cart.items.findIndex(item => item.name === productName);

                if (itemIndex !== -1) {
                    cart.items[itemIndex].quantity +=1;
                }
                else {
                    cart.items.push({name: productName, price:price, quantity: 1});
                }
                cart.totalPrice = calculateTotalPrice(cart);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartDisplay();
            });
        });
    }
    updateCartDisplay(); 
});

