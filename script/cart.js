document.addEventListener("DOMContentLoaded", () => {
    // Variables globales
    const cartCountEl = document.getElementById('cart-count');
    const cartItemsEl = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');
    const emptyCartMessageEl = document.getElementById('empty-cart-message');
    const checkoutButton = document.getElementById('checkout-button');

    // Initialisation du panier à partir du localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Fonction pour mettre à jour l'affichage du panier
    function updateCartDisplay() {
        // Met à jour le compteur du panier dans le header
        cartCountEl.textContent = cart.length;

        // Met à jour le contenu de la page du panier
        if (cartItemsEl) { // Vérifie si on est sur la page du panier
            cartItemsEl.innerHTML = ''; // Vide le contenu existant
            let total = 0;

            if (cart.length === 0) {
                if (emptyCartMessageEl) emptyCartMessageEl.style.display = 'block';
                if (cartTotalEl) cartTotalEl.textContent = '0';
                if (checkoutButton) checkoutButton.disabled = true;
                return;
            } else {
                if (emptyCartMessageEl) emptyCartMessageEl.style.display = 'none';
                if (checkoutButton) checkoutButton.disabled = false;
            }

            cart.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                itemElement.innerHTML = `
                    <p>${item.name}</p>
                    <p>${item.price} F CFA</p>
                    <button class="remove-item" data-id="${item.id}">Supprimer</button>
                `;
                cartItemsEl.appendChild(itemElement);
                total += item.price;
            });

            if (cartTotalEl) {
                cartTotalEl.textContent = total.toLocaleString('fr-FR');
            }
        }
    }

    // Fonction pour ajouter un produit au panier
    function addToCart(event) {
        const productCard = event.target.closest('.product-card');
        const productId = productCard.dataset.id;
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = parseInt(productCard.dataset.price);

        const item = {
            id: productId,
            name: productName,
            price: productPrice
        };

        cart.push(item);
        saveCart();
        updateCartDisplay();
        alert(`${productName} a été ajouté au panier !`);
    }

    // Fonction pour supprimer un produit du panier
    function removeFromCart(event) {
        if (event.target.classList.contains('remove-item')) {
            const productId = event.target.dataset.id;
            cart = cart.filter(item => item.id !== productId);
            saveCart();
            updateCartDisplay();
        }
    }

    // Fonction pour sauvegarder le panier dans le localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Écouteurs d'événements
    if (document.querySelector('.product-list')) {
        document.querySelector('.product-list').addEventListener('click', addToCart);
    }

    if (cartItemsEl) {
        cartItemsEl.addEventListener('click', removeFromCart);
    }
    
    // Fonction de commande (simulée)
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            if (cart.length > 0) {
                alert('Commande passée avec succès ! Le total est de ' + cartTotalEl.textContent + ' F CFA. Merci pour votre achat.');
                cart = []; // Vider le panier après la commande
                saveCart();
                updateCartDisplay();
            } else {
                alert('Votre panier est vide. Veuillez ajouter des produits avant de commander.');
            }
        });
    }

    // Initialisation au chargement de la page
    updateCartDisplay();
});