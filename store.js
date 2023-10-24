if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}
else {
    ready()
}

function ready() {
    const cartRemoveButton = document.querySelectorAll(".cart-remove-btn")
    for (let i = 0; i < cartRemoveButton.length; i++) {
        const button = cartRemoveButton[i]
        button.addEventListener('click', removeCartItem)
    }
    const quantityInput = document.querySelectorAll('.cart-quantity-input')
    for (let i = 0; i < quantityInput.length; i++) {
        const input = quantityInput[i]
        input.addEventListener('change', quantityChange)
    }
    const addToCartButton = document.querySelectorAll('.shop-item-btn')
    for (let i = 0; i < addToCartButton.length; i++) {
        const button = addToCartButton[i]
        button.addEventListener('click', addToCart)
    }
    const purchaseButton = document.querySelector('.btn-purchase').addEventListener('click', purchase)
}
function addToCart(e) {
    const button = e.target
    const shopItem = button.parentElement.parentElement
    const shopTitle = shopItem.querySelector(".shop-item-tile").innerText
    const price = shopItem.querySelector('.shop-item-price').innerText
    const img = shopItem.querySelector('.shop-item-image').src
    console.log(shopTitle, price, img)
    addItemToCart(shopTitle, price, img)
    alteraTotal(shopTitle, price, img)
    
}

function addItemToCart(shopTitle, price, img) {
    const cartRow = document.createElement('div')
    const cartItemNames = document.querySelectorAll('.cart-item-title')
    for(let i = 0; i < cartItemNames.length; i++){
        if(cartItemNames[i].innerText === shopTitle){
            alert('Item is already in the cart.')
            return
        }
    }
    cartRow.classList.add('cart-row')
    const cartRowContent = `
    <div class="cart-item cart-column">
                <img class="cart-item-image" src="${img}" alt="T-shirt">
                <span class="cart-item-title">${shopTitle}</span>
            </div>

            <span class="cart-price cart-column">${price}</span>

            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1">
                <button class="btn cart-remove-btn cart-quantity-btn">REMOVE</button>
            </div>
    `
    cartRow.innerHTML += cartRowContent
    const cartItems = document.querySelector('.cart-items')
    cartItems.append(cartRow)
    cartRow.querySelector('.cart-remove-btn').addEventListener('click', removeCartItem)
    cartRow.querySelector('.cart-quantity-input').addEventListener('change', quantityChange)
}
function purchase(){
    alert('Thank you for your purchase.')
    const cartItems = document.querySelector('.cart-items')
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    alteraTotal()
}
function quantityChange(e) {
    const input = e.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    alteraTotal()
}

function removeCartItem(e) {
    const buttonClicked = e.target
    buttonClicked.parentElement.parentElement.remove()
    alteraTotal()
}

function alteraTotal() {
    const cartItemContainer = document.querySelector('.cart-items')
    const cartRows = cartItemContainer.querySelectorAll('.cart-row')
    let total = 0
    for (let i = 0; i < cartRows.length; i++) {
        const cartRow = cartRows[i]
        const priceElement = cartRow.querySelector('.cart-price')
        const quantityElement = cartRow.querySelector('.cart-quantity-input')
        const price = Number(priceElement.innerText.replace('$', ''))
        const quantity = Number(quantityElement.value)
        total += (price * quantity)

    }
    document.querySelector('.cart-total-price').innerText = `$ ${Math.round(total * 100) / 100}`
}