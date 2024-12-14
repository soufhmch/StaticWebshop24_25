document.addEventListener('DOMContentLoaded', () => {
    CartManager.init();
    WishlistManager.init();
    CustomerDisplay.init();
});

// Cart Module
const CartManager = {
    cartList: document.getElementById('cart-items'), // Updated to match HTML ID
    totalPrice: document.getElementById('cart-total'),

    init() {
        console.log(this.cartList);  // Debugging the cartList selection
        if (!this.cartList) {
            console.error('Cart list not found!');
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
        const itemPrice = parseFloat(
            productElement.querySelector('.price').textContent.slice(1)
        );
        this.addToCart(itemName, itemPrice);
    },

    addToCart(itemName, itemPrice) {
        const existingCartItem = Array.from(this.cartList.children).find((item) =>
            item.textContent.includes(itemName)
        );

        if (existingCartItem) {
            this.updateExistingItem(existingCartItem, itemName, itemPrice);
        } else {
            this.createNewCartItem(itemName, itemPrice);
        }

        this.updateTotalPrice(itemPrice);
    },

    updateExistingItem(item, itemName, itemPrice) {
        const quantity = parseInt(item.dataset.quantity) + 1;
        item.dataset.quantity = quantity;
        item.querySelector('.cart-item-info').textContent = `${itemName} - €${itemPrice} x${quantity}`;
    },

    createNewCartItem(itemName, itemPrice) {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.dataset.quantity = 1;
        cartItem.innerHTML = `
      <span class="cart-item-info">${itemName} - €${itemPrice} x1</span>
      <button class="remove-button">Verwijder</button>
    `;

        this.cartList.appendChild(cartItem);
        this.setupRemoveButton(cartItem, itemPrice);
    },

    setupRemoveButton(cartItem, itemPrice) {
        cartItem.querySelector('.remove-button').addEventListener('click', () => {
            const itemQuantity = parseInt(cartItem.dataset.quantity);
            this.updateTotalPrice(-itemPrice * itemQuantity);
            cartItem.remove();
        });
    },

    updateTotalPrice(amount) {
        const currentTotal = parseFloat(this.totalPrice.textContent.slice(1)) || 0;
        const newTotal = currentTotal + amount;
        this.totalPrice.textContent = `€${newTotal.toFixed(2)}`;
    },
};

// Wishlist Module (Unchanged)
const WishlistManager = {
    init() {
        const wishlistButtons = document.querySelectorAll('.wishlist');
        wishlistButtons.forEach((button) => {
            button.addEventListener('click', () => this.handleWishlistClick(button));
        });
    },

    handleWishlistClick(button) {
        if (button.style.backgroundColor === 'green') {
            this.removeFromWishlist(button);
        } else {
            this.addToWishlist(button);
        }
    },

    addToWishlist(button) {
        button.style.backgroundColor = 'green';
    },

    removeFromWishlist(button) {
        button.style.backgroundColor = 'red';
        setTimeout(() => {
            button.style.backgroundColor = 'black';
            button.style.color = 'white';
        }, 2000);
    },
};

// Customer Display Module (Unchanged)
const CustomerDisplay = {
    async init() {
        const customerContainer = document.querySelector('.flex-container');
        const numberOfCustomers = 8;

        try {
            const response = await fetch(`https://randomuser.me/api/?results=${numberOfCustomers}`);
            const data = await response.json();
            this.displayCustomers(data.results, customerContainer);
        } catch (error) {
            console.error('Error fetching customer data:', error);
        }
    },

    displayCustomers(customers, container) {
        customers.forEach((customer) => {
            const customerElement = this.createCustomerElement(customer);
            container.appendChild(customerElement);
        });
    },

    createCustomerElement(customer) {
        const customerDiv = document.createElement('div');
        customerDiv.classList.add('customer');

        const customerImage = document.createElement('img');
        customerImage.src = customer.picture.large;
        customerImage.alt = 'Customer Image';

        const fullName = `${this.capitalize(customer.name.title)} ${customer.name.first} ${customer.name.last}`;
        const customerInfo = document.createElement('p');
        customerInfo.textContent = `${fullName} - ${customer.location.country}`;

        customerDiv.append(customerImage, customerInfo);
        return customerDiv;
    },

    capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    },
};
document.querySelector('.search-input').addEventListener('focus', () => {
  document.querySelector('.search-container').style.transition = "all 0.4s ease";
  document.querySelector('.search-container').style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.2)";
});

document.querySelector('.search-input').addEventListener('blur', () => {
  document.querySelector('.search-container').style.boxShadow = "none";
});

