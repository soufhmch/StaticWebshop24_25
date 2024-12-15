document.addEventListener('DOMContentLoaded', () => {
    ModuleManager.init();
});

const ModuleManager = {
    init() {
        CartManager.init();
        WishlistManager.init();
        CustomerDisplay.init();
        SearchBoxEffect.init();
    }
};

// Cart Module
const CartManager = {
    cartList: document.getElementById('cart-items'),
    totalPrice: document.getElementById('cart-total'),

    init() {
        if (!this.cartList || !this.totalPrice) {
            console.error('Cart list or total price element not found!');
            return;
        }

        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('cartButton')) {
                const productElement = event.target.parentElement;
                this.handleAddToCart(productElement);
            }
        });
    },

    handleAddToCart(productElement) {
        const itemName = productElement.querySelector('.itemtitle').textContent;
        const itemPrice = parseFloat(productElement.querySelector('.price').textContent.slice(1));
        const existingCartItem = this.findCartItem(itemName);

        existingCartItem ? this.updateExistingItem(existingCartItem, itemPrice) : this.createNewCartItem(itemName, itemPrice);
        this.updateTotalPrice(itemPrice);
    },

    findCartItem(itemName) {
        return Array.from(this.cartList.children).find((item) => item.textContent.includes(itemName));
    },

    updateExistingItem(item, itemPrice) {
        const quantity = parseInt(item.dataset.quantity) + 1;
        item.dataset.quantity = quantity;
        item.querySelector('.cart-item-info').textContent = `${item.dataset.name} - €${itemPrice} x${quantity}`;
    },

    createNewCartItem(itemName, itemPrice) {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.dataset.quantity = 1; // Start met 1 item
        cartItem.dataset.name = itemName;
        cartItem.innerHTML = `
            <span class="cart-item-info">${itemName} - €${itemPrice} x1</span>
            <button class="remove-button">X</button>
        `;
        this.cartList.appendChild(cartItem);

        cartItem.querySelector('.remove-button').addEventListener('click', () => {
            const currentQuantity = parseInt(cartItem.dataset.quantity);
            if (currentQuantity > 1) {
                // Verminder de hoeveelheid
                cartItem.dataset.quantity = currentQuantity - 1;
                cartItem.querySelector('.cart-item-info').textContent = `${itemName} - €${itemPrice} x${cartItem.dataset.quantity}`;
                this.updateTotalPrice(-itemPrice); // Verminder de totale prijs
            } else {
                // Verwijder het item volledig als de hoeveelheid 1 is
                this.updateTotalPrice(-itemPrice);
                cartItem.remove();

                if (this.cartList.children.length === 0) {
                    this.showEmptyCartMessage();
                }
            }
        });
    },

    updateTotalPrice(amount) {
        const currentTotal = parseFloat(this.totalPrice.textContent.slice(1)) || 0;
        this.totalPrice.textContent = `€${(currentTotal + amount).toFixed(2)}`;
    },

    showEmptyCartMessage() {
        const emptyMessage = document.createElement('div');
        emptyMessage.classList.add('empty-cart-message');
        emptyMessage.textContent = 'Je winkelwagen is leeg!';
        this.cartList.appendChild(emptyMessage);
    }
};


// Wishlist Module
const WishlistManager = {
    init() {
        document.querySelectorAll('.wishlist').forEach((button) => {
            button.addEventListener('click', () => this.toggleWishlistState(button));
        });
    },

    toggleWishlistState(button) {
        button.style.backgroundColor = button.style.backgroundColor === 'green' ? 'red' : 'green';
        if (button.style.backgroundColor === 'red') {
            setTimeout(() => {
                button.style.backgroundColor = 'black';
                button.style.color = 'white';
            }, 2000);
        }
    }
};

// Customer Display Module
const CustomerDisplay = {
    async init() {
        const customerContainer = document.querySelector('.flex-container');
        if (!customerContainer) return;

        try {
            const response = await fetch('https://randomuser.me/api/?results=8');
            const data = await response.json();
            this.renderCustomers(data.results, customerContainer);
        } catch (error) {
            console.error('Error fetching customer data:', error);
        }
    },

    renderCustomers(customers, container) {
        customers.forEach((customer) => {
            const customerDiv = document.createElement('div');
            customerDiv.classList.add('customer');

            customerDiv.innerHTML = `
                <img src="${customer.picture.large}" alt="Customer Image">
                <p>${this.formatName(customer)} - ${customer.location.country}</p>
            `;

            container.appendChild(customerDiv);
        });
    },

    formatName(customer) {
        return `${this.capitalize(customer.name.title)} ${customer.name.first} ${customer.name.last}`;
    },

    capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
};

// Search Box Effects Module
const SearchBoxEffect = {
    init() {
        const searchInput = document.querySelector('.search-input');
        const searchContainer = document.querySelector('.search-container');
        if (!searchInput || !searchContainer) return;

        searchInput.addEventListener('focus', () => {
            this.applyFocusStyle(searchContainer);
        });

        searchInput.addEventListener('blur', () => {
            this.removeFocusStyle(searchContainer);
        });
    },

    applyFocusStyle(container) {
        container.style.transition = 'all 0.4s ease';
        container.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
    },

    removeFocusStyle(container) {
        container.style.boxShadow = 'none';
    }
};
