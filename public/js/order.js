let getCartItemHtml = (cartItem) => {
    let pie = getPieById(cartItem.id);

    return `
        <tr data-pie-id="${pie.id}">
            <td class="text-center"><img class="thumbnail-xsmall-img" src="images/products/${pie.image}"></td>
            <td class="min-width">${pie.name}</td>
            <td class="text-center">${displayPrice(pie.price)}</td>
            <td class="text-center">
                <span class="d-inline-flex">
                    <button class="btn btn-danger remove-one" data-pie-id="${pie.id}">-</button>
                    <input class="form-control item-count text-center" type="text" disabled value="${cartItem.qty}" data-pie-id="${pie.id}">
                    <button class="btn btn-success add-one" data-pie-id="${pie.id}">+</button>
                </span>
            </td>
            <td class="text-center">${displayPrice(pie.price * cartItem.qty)}</td>
        </tr>
    `;
}

let getCartTotalRowHtml = () => {
    let total = 0;
    getCart().forEach((cartItem) => total += getPieById(cartItem.id).price * cartItem.qty);

    return `
        <tr>
            <th></th>
            <th></th>
            <th></th>
            <th class="text-center">Total</th>
            <th class="text-center">${displayPrice(total)}</th>
        </tr>
    `;
}

let onClickRemoveButton = (event) => {
    let id = Number(event.target.dataset.pieId);
    removeOneFromCart(id);
    displayCart();
    addListenersRemoveButton();
    addListenersAddButton();
}

let onClickAddButton = (event) => {
    let id = Number(event.target.dataset.pieId);
    addOneToCart(id);
    displayCart();
    addListenersRemoveButton();
    addListenersAddButton();
}

let addListenersRemoveButton = () => {
    document.querySelectorAll('button.remove-one').forEach((button) => button.addEventListener('click', onClickRemoveButton));
}

let addListenersAddButton = () => {
    document.querySelectorAll('button.add-one').forEach((button) => button.addEventListener('click', onClickAddButton));
}


let getCartHtml = () => {
    let cart = getCart();
    let cartHtml = '';
    cart.forEach((cartItem) => {
        cartHtml += getCartItemHtml(cartItem);
    });
    cartHtml += getCartTotalRowHtml();
    return cartHtml;
};

let displayCart = () => {
    let table = document.querySelector('table.table-cart');
    let thead = table.querySelector('table.table-cart thead');
    let tbody = table.querySelector('table.table-cart tbody');
    let isTheadHidden = thead.classList.contains('d-none');
    let isTableHover = table.classList.contains('table-hover');
    let isTableBordered = table.classList.contains('table-bordered');

    if (getCart().length > 0) {
        if (isTheadHidden) {
            thead.classList.remove('d-none');
        }
        if (!isTableHover) {
            table.classList.add('table-hover');
        }
        if (!isTableBordered) {
            table.classList.add('table-bordered');
        }
        tbody.innerHTML = getCartHtml();
    } else {
        if (!isTheadHidden) {
            thead.classList.add('d-none');
        }
        if (isTableHover) {
            table.classList.remove('table-hover');
        }
        if (isTableBordered) {
            table.classList.remove('table-bordered');
        }
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center">
                    <p>
                        Votre panier 🛒 est tristement vide. Achetez des <a href="products.html">tartes</a> ! &#x1f967;
                    </p>
                </td>
            </tr>
        `;
    }
};

let init = () => {
    getPies();
    getCart();
    displayCart();
    addListenersRemoveButton();
    addListenersAddButton();
};

window.addEventListener('load', init);