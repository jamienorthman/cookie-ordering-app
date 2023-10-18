import { cookieMenu } from '/data.js'
 
const menuContainer = document.getElementById('menu-container')

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
                <button class="select-btn" id="${cookie.id}">+</button>
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
menuContainer.addEventListener('click', highlightSelection)

function highlightSelection(e) {
    document.getElementById(e.target.id).parentElement.classList.add('selected')
}

