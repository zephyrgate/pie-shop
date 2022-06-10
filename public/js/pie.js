let getPie = () => {
    return getPieById(Number(sessionStorage.getItem('idPieView')));
}

let getIngredientsListHtml = (pie) => {
    let ingredientsListHtml = '';
    pie.ingredients.forEach((ingredient) => ingredientsListHtml += `<li>${ingredient.name} (${ingredient.qty})</li>`);

    return ingredientsListHtml;
}

let getOtherSuggestionsHtml = (pie) => {
    let pieOtherSuggestionsCount = 4;
    let i = 0, j = 0;
    let pies = getPies();
    let otherSuggestionsHtml = '';

    while (i < pies.length && j < pieOtherSuggestionsCount) {
        if (pies[i].id !== pie.id) {
            otherSuggestionsHtml += `
                <div class="col-12 col-sm-3 mb-2 suggestion-pie-image-container">
                    <a href="pie.html" data-pie-id="${pies[i].id}">
                        <img class="suggestion-pie-image" src="images/products/${pies[i].image}" alt="${pies[i].name}">
                    </a>    
                </div>
            `;
            j++;
        }

        i++;
    }

    return otherSuggestionsHtml;
}

let getTableIngredientsHtml = (pie) => {
    let tableIngredientsHtml = '';
    pie.ingredients.forEach((ingredient) => tableIngredientsHtml += `
        <tr>
            <td>${ingredient.name}</td>
            <td>${ingredient.risk}</td>
            <td>${ingredient.qty}</td>
        </tr>
    `);

    return tableIngredientsHtml;
};

let onClickOtherSuggestion = (event) => {
    event.preventDefault();
    sessionStorage.setItem('idPieView', event.currentTarget.dataset.pieId);

    window.location.href = "pie.html";
}

let addListenersOtherSuggestion = () => {
    document
        .querySelectorAll('div.suggestion-pie-image-container > a[data-pie-id]')
        .forEach((aTag) => aTag.addEventListener('click', onClickOtherSuggestion))
    ;
};

let onClickAddToCartButton = () => {
    addOneToCart(getPie().id);
    console.log(_cart);
}

// let getPieStyleSheet = () => {
//     let styleSheets = document.styleSheets;
//     for (i in styleSheets) {
//         if (styleSheets[i].href.indexOf('pie.css') !== -1) {
//             return styleSheets[i];
//         }
//     }
// }

let displayDataForPie = (pie) => {
    document.title = pie.name;
    document.querySelector('h1.pie-name').innerHTML = pie.name;
    document.querySelector('div.pie-title-desc > h2').innerHTML = pie.name;
    document.querySelector('div.pie-title-desc > p').innerHTML = pie.smallDescription;
    document.querySelector('div.pie-description > p').innerHTML = pie.longDescription;
    document.querySelector('div.banner').style.backgroundImage = `url('images/products/${pie.image}')`;
    document.querySelector('img.pie-image').setAttribute('src', `images/products/${pie.image}`);
    document.querySelector('div.pie-ingredients-price-cta ul').innerHTML = getIngredientsListHtml(pie);
    document.querySelector('span.pie-price').innerHTML = displayPrice(pie.price);
    document.querySelector('div.pie-suggestions > div.row').innerHTML = getOtherSuggestionsHtml(pie);
    // tableau ing
    document.querySelector('table.table-ingredients tbody').innerHTML = getTableIngredientsHtml(pie);

    // let pieStyleSheet = getPieStyleSheet();
    // let bannerClass = `banner-pie-${pie.id}`;
    // document.querySelector('div.banner').classList.add(bannerClass);
    // pieStyleSheet.insertRule(`
    //     .${bannerClass} {
    //         background-image: url('../images/products/${pie.image}');
    //     }
    // `, pieStyleSheet.cssRules.length);    
};

let init = () => {
    getPies();
    getCart();
    displayDataForPie(getPie());
    addListenersOtherSuggestion();
    document.querySelector('button.add-to-cart').addEventListener('click', onClickAddToCartButton);
}

window.addEventListener('load', init);