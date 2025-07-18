document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart
    const cartItems = document.querySelectorAll('.cart-item');
    let likedItems = [];
    
    // Add event listeners to all items
    cartItems.forEach(item => {
        // Quantity controls
        const minusBtn = item.querySelector('.minus-btn');
        const plusBtn = item.querySelector('.plus-btn');
        const quantityInput = item.querySelector('.quantity');
        const priceElement = item.querySelector('.price');
        const deleteBtn = item.querySelector('.delete-btn');
        const likeBtn = item.querySelector('.like-btn');
        
        // Get initial price
        const initialPrice = parseFloat(priceElement.textContent.replace('$', ''));
        
        // Quantity adjustment
        minusBtn.addEventListener('click', function() {
            let currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
                updateItemPrice(priceElement, initialPrice, quantityInput.value);
                updateTotal();
            }
        });
        
        plusBtn.addEventListener('click', function() {
            let currentValue = parseInt(quantityInput.value);
            quantityInput.value = currentValue + 1;
            updateItemPrice(priceElement, initialPrice, quantityInput.value);
            updateTotal();
        });
        
        // Manual quantity input
        quantityInput.addEventListener('change', function() {
            let value = parseInt(this.value);
            if (isNaN(value) || value < 1) {
                this.value = 1;
            }
            updateItemPrice(priceElement, initialPrice, this.value);
            updateTotal();
        });
        
        // Delete item
        deleteBtn.addEventListener('click', function() {
            item.remove();
            updateTotal();
            // Remove from liked items if it was liked
            const itemId = item.dataset.id;
            likedItems = likedItems.filter(id => id !== itemId);
        });
        
        // Like item
        likeBtn.addEventListener('click', function() {
            const itemId = item.dataset.id;
            this.classList.toggle('liked');
            
            if (this.classList.contains('liked')) {
                likedItems.push(itemId);
            } else {
                likedItems = likedItems.filter(id => id !== itemId);
            }
        });
    });
    
    // Update item price based on quantity
    function updateItemPrice(element, initialPrice, quantity) {
        const newPrice = initialPrice * quantity;
        element.textContent = '$' + newPrice.toFixed(2);
    }
    
    // Calculate and update total price
    function updateTotal() {
        let total = 0;
        document.querySelectorAll('.cart-item').forEach(item => {
            const price = parseFloat(item.querySelector('.price').textContent.replace('$', ''));
            total += price;
        });
        document.querySelector('.total-price').textContent = '$' + total.toFixed(2);
    }
    
    // Initialize total
    updateTotal();
});
