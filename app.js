import { cookieMenu } from '/data.js'
 
const menuContainer = document.getElementById('menu-container')

//One event listener to group all clicks using data attributes
document.addEventListener('click', (e) => {
    if (e.target.dataset.select) {
        handleSelectionClick(e.target.dataset.select)
    }
})

// Tests that the id property in data.js is tha same as id stored in 
//cookieData, which comes from select-button data attribute.
//Increments targetCookieObj. Use [0] because we want to target the
//object in array of which there is only one (id is unique)
function handleSelectionClick(cookieData) {
    const targetCookieObj = cookieMenu.filter((cookie) => {
        return cookie.id == cookieData
    })[0]
    return targetCookieObj
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

