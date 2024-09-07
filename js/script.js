document.addEventListener('DOMContentLoaded', function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || {
        items: [],
        totalPrice: 0
    };

    function updateCartDisplay() {
        let cartCount = cart.items.length;
        document.getElementById('cart-count').innerText = cartCount;
    }

    function addToCart(productName, price) {
        
        let existingItem = cart.items.find(item => item.name === productName);
        if (existingItem) {
           
            existingItem.quantity += 1;
            cart.totalPrice += price;
        } else {
            
            cart.items.push({ name: productName, price: price, quantity: 1 });
            cart.totalPrice += price;
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }

    function removeFromCart(productName, price) {
        let itemIndex = cart.items.findIndex(item => item.name === productName);
        if (itemIndex !== -1) {
            let item = cart.items[itemIndex];
            if (item.quantity > 1) {
               
                item.quantity -= 1;
                cart.totalPrice -= price;
            } else {
                
                cart.items.splice(itemIndex, 1);
                cart.totalPrice -= price;
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        }
    }

    
    document.querySelectorAll('.cart-btn').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            
            let productElement = this.closest('.box');
            let productName = productElement.querySelector('h3').innerText;
            let price = parseInt(productElement.querySelector('.price').innerText.replace(' KRW', ''));

            addToCart(productName, price);
        });
    });

    
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            
            let productName = this.dataset.productName;
            let price = parseInt(this.dataset.productPrice);

            removeFromCart(productName, price);
        });
    });

    
    document.querySelector('.fa-shopping-cart').addEventListener('click', function() {
        window.location.href = 'cart.html';
    });

    
    updateCartDisplay();
});




