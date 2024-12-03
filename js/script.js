document.addEventListener('DOMContentLoaded', function () {
    const cart = document.getElementById('shoppingCart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    const addToCartButtons = document.querySelectorAll('.product .addToCartButton');
    const wishlistButtons = document.querySelectorAll('.product .wishlistButton');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const product = this.closest('.product');
            const itemName = product.querySelector('.itemtitle').textContent;
            const itemPrice = parseFloat(product.querySelector('.price').textContent.replace('$', ''));
            addItemToCart(itemName, itemPrice);
            showCart();
        });
    });

    wishlistButtons.forEach(button => {
        button.addEventListener('click', function () {
            this.classList.toggle('active');
            if (this.classList.contains('active')) {
                this.textContent = 'Toegevoegd aan verlanglijst';
                document.getElementsByClassName("wishlistButton").style.backgroundColor = "green";
            } else {
                this.textContent = 'Verwijderd van verlanglijst';
                setTimeout(()=>{
                    this.textContent = 'Voeg toe aan verlanlijst'
                }, 1000)
            }
        });
    });

    function addItemToCart(itemName, itemPrice) {
        let existingCartItem = Array.from(cartItemsContainer.children).find(item =>
            item.querySelector('.cartItemName')?.textContent === itemName
        );

        if (existingCartItem) {
            const quantityElement = existingCartItem.querySelector('.cartItemQuantity');
            quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
        } else {
            if (cartItemsContainer.querySelector('p')) {
                cartItemsContainer.innerHTML = '';
            }

            const cartItem = document.createElement('div');
            cartItem.className = 'cartItem';
            cartItem.innerHTML = `
                <span class="cartItemName">${itemName}</span>
                <span class="cartItemQuantity">1</span>
                <span class="cartItemPrice">€${itemPrice.toFixed(2)}</span>
                <button class="removeItemButton">×</button>
            `;
            cartItemsContainer.appendChild(cartItem);

            cartItem.querySelector('.removeItemButton').addEventListener('click', function() {
                cartItem.remove();
                updateCartTotal();
            });
        }

        updateCartTotal();
    }

    function updateCartTotal() {
        let total = 0;
        cartItemsContainer.querySelectorAll('.cartItem').forEach(item => {
            const price = parseFloat(item.querySelector('.cartItemPrice').textContent.replace('€', ''));
            const quantity = parseInt(item.querySelector('.cartItemQuantity').textContent);
            total += price * quantity;
        });
        cartTotal.textContent = `Totaal: €${total.toFixed(2)}`;
    }

    function showCart() {
        cart.classList.remove('hidden');
    }
});
