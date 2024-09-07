let cart = {
    items: 0,
    totalPrice: 0
};

document.querySelectorAll('.cart-btn').forEach(button => {
    button.addEventListener('click', function() {
        let price = parseInt(this.parentElement.nextElementSibling.querySelector('.price').innerText.replace(' KRW',''));
        cart.items += 1;
        cart.totalPrice += price;

        document.getElementById('cart-count').innerText = cart.items;
    });
});
