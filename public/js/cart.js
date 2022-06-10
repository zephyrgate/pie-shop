let _cart = [];

let readCart = () => {
    return JSON.parse(localStorage.getItem('pieCart'));
};

let getCart = () => {
    if ('pieCart' in localStorage) {
        _cart = readCart();
    }

    return _cart;
};

let saveCart = (cart) => {
    localStorage.setItem('pieCart', JSON.stringify(cart));
};

let addOneToCart = (id) => {
    addQuantityToCart(id, 1);
}

let removeOneFromCart = (id) => {
    addQuantityToCart(id, -1);
}

let isInCart = (id) => {
    return getCartLineItemIndexById(id) !== -1;
}

let getCartLineItemIndexById = (id) => {
    return _cart.findIndex((cartEntry) => cartEntry.id === id);
}

let addQuantityToCart = (id, qty) => {
    let isItemInCart = isInCart(id);
    if (!isItemInCart && qty > 0) {
        _cart.push({
            id: id,
            qty: qty,
        });
        saveCart(_cart);
    } else if (isItemInCart && qty !== 0) {
        let index = getCartLineItemIndexById(id);
        let newQuantity = _cart[index].qty + qty;

        if (newQuantity > 0) {
            _cart[index].qty = newQuantity;
            saveCart(_cart);
        } else if (newQuantity === 0) {
            _cart.splice(index, 1);
            saveCart(_cart);
        }
    }
}