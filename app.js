import { cookieMenu } from '/data.js'
 
const menuContainer = document.getElementById('menu-container')
const orderContainer = document.getElementById('order-container')

//One event listener to group all clicks using data attributes
document.addEventListener('click', (e) => {
    if (e.target.dataset.select) {
        handleSelectionClick(e.target.dataset.select)
    } else if (e.target.dataset.remove) {
        handleRemoveClick(e.target.dataset.remove)
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
    orderArray.push(targetCookieObj)
    getOrderHtml(orderArray)
    orderArray.forEach(item => {
        let reviewOrder = document.querySelector('.order-title')
        reviewOrder.innerHTML += `
            <div class="item-review">
                <p class="cookie-review">${item.name}</p>
                <button class="remove-btn" data-remove="${item.id}">remove</button>
                <p class="price-review">${item.price}</p>
            </div>
            `
    })
    console.log(orderArray)
}

function handleRemoveClick(itemIndex) {
    const targetItemObj = orderArray.filter((item) => {
        return item.id == itemIndex
    })[0]
    orderArray.pop(targetItemObj)
    console.log(orderArray)
}

function getOrderHtml() {
    orderContainer.style.display = 'flex'
    return orderContainer.innerHTML =
            `<p class="order-title">Your Order</p>
            <div class="order-divider"></div>
            <div class="total-price-review">
                <p class="total-price-title">Total Price</p>
                <p class="total-price"></p>
            </div>
            <button class="order-btn">Complete order</button>
            `
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




//event.target to use one event listener for all select-btns and access parentEl(cookie-container):
/*menuContainer.addEventListener('click', highlightSelection)

function highlightSelection(e) {
    document.getElementById(e.target.id).parentElement.classList.add('selected')
}*/

