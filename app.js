import { cookieMenu } from '/data.js'
 
const menuContainer = document.getElementById('menu-container')
const orderContainer = document.getElementById('order-container')
const payModal = document.getElementById('payment-modal')

//use uuids to identify different elements of the order basket ??
//let uuidCounter = 0


//One event listener to group all clicks using data attributes
document.addEventListener('click', (e) => {
    if (e.target.dataset.select) {
        handleSelectionClick(e.target.dataset.select)
    } else if (e.target.dataset.remove) {
        handleRemoveClick(e.target.dataset.remove)
    } else if (e.target.id === 'order-btn') {
        handleOrderClick()
    } else if (e.target.id === 'pay-btn') {
        handlePayClick()
    }
})

//initialize orderArray
let orderArray = []

// Tests that the id property in data.js is the same as id stored in 
//cookieData, which comes from select-button data attribute.
// Use [0] because we want to target the object in array of which there 
//is only one (id is unique). Pushes targetCookieObj to orderArray
function handleSelectionClick(cookieData) {
    const targetCookieObj = cookieMenu.filter((cookie) => {
        return cookie.id == cookieData
    })[0]
    orderArray.unshift(targetCookieObj)
    updateOrderHtml()
    renderOrder()  
}

function handleRemoveClick(itemIndex) {
    orderArray.splice(itemIndex, 1)
    // as an alternative to rebuilding the html with renderOrder(),
    // the following could be used to just remove one element at a time
    // (in this case, respective itemIndex needs to be figured out via item's uuid)
    //let removedItem = document.querySelectorAll('.item-review')[itemIndex]
    //removedItem.remove()
    updateOrderHtml()
    renderOrder()
}
console.log(orderArray)

function handlePayClick() {
    payModal.style.display = 'none'
    // display thank you message
}

function handleOrderClick() {
    payModal.style.display = 'flex'
}

function renderOrder() {
    const reviewOrder = document.querySelector('.order-list')
    reviewOrder.innerHTML = ""

    orderArray.forEach(item => {
        reviewOrder.innerHTML += `
            <div class="item-review">
                <img src="${item.img}" class="cookie-img">
                <p class="cookie-review">${item.name}</p>
                <button class="remove-btn" data-remove="
                ${orderArray.indexOf(item)}">remove</button>
                <p class="price-review">$${item.price}</p>
            </div>
            `
    })
}

function updateOrderHtml() {
    if (orderArray.length > 0) {
        orderContainer.style.display = 'flex'
    } 
    else {
        orderContainer.style.display = 'none'
    } 
    const totalPrice = orderArray.reduce((total, currentItem) => 
    total + currentItem.price, 0
    )
    const totalDisplay = document.querySelector('.total-price')
    totalDisplay.textContent = `$${totalPrice}`
    console.log(totalPrice)
}

function getCookieHtml(cookieMenu) {
    const cookieHtml = cookieMenu.map((cookie) => {
        const renderedIngredients = cookie.ingredients.map((ingredient) => {
            return ingredient
        })
        return `
            <div class="cookie-container">
                <img src="${cookie.img}" class="cookie-img">
                <div class="price-info-container">
                    <p class="cookie-name">${cookie.name}</p>
                    <p class="ingredients">${renderedIngredients}</p>
                    <p class="price">$${cookie.price}</p>
                </div>
                <button class="select-btn" data-select="${cookie.id}">+</button>
            </div>
            <div class="divider-container">
                <div class="divider"></div>
            </div>
            `
    })
    return cookieHtml.join('')
}

menuContainer.innerHTML = getCookieHtml(cookieMenu)
