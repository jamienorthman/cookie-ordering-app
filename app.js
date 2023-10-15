import { cookieMenu } from '/data.js'
 

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
                    <p class="price">${cookie.price}</p>
                </div>
                <button class="select-btn">${'+'}</button>
            </div>
            <div class="divider-container">
                <div class="divider"></div>
            </div>`
    })
    return cookieHtml.join('')
}

document.getElementById('menu-container').innerHTML = 
getCookieHtml(cookieMenu)