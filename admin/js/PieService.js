let _pies = [];

let addPie = (pie) => {
    _pies.push(pie);
    savePies(_pies);
};

let removePie = (id) => {
    _pies = _pies.filter((pie) => pie.id !== id);
    savePies(_pies);
};

let updatePie = (updatedPie) => {
    _pies.forEach((pie, index) => {
        if (pie.id === updatedPie.id) {
            _pies[index] = updatedPie;
        }
    });
    savePies(_pies);
};

let getPies = () => {
    if ('pies' in localStorage) {
        _pies = readPies();
        Pie.id = _pies[_pies.length - 1].id + 1;
    } else {
        Pie.id = 1;
        addPie(new Pie("Apple pie", "Our famous apple pies!", "Sweet ice cream jelly beans lemon drops. Pastry toffee fruitcake gingerbread jelly-o. Lollipop sesame snaps muffin. Macaroon halvah marshmallow sesame snaps sugar plum dragée. Wafer pudding sesame snaps tootsie roll sesame snaps cake chupa chups jelly beans.", "Sugar, Apples", "applepie.jpg", 14.90));
        addPie(new Pie("Blueberry cheese cake", "A Christmas favorite", "Sweet ice cream jelly beans lemon drops. Pastry toffee fruitcake gingerbread jelly-o. Lollipop sesame snaps muffin. Macaroon halvah marshmallow sesame snaps sugar plum dragée. Wafer pudding sesame snaps tootsie roll sesame snaps cake chupa chups jelly beans.", "Sugar, Blueberries", "blueberrycheesecakesmall.jpg", 12.90));
        addPie(new Pie("Cheese cake", "Plain cheese cake. Plain pleasure.", "Sweet ice cream jelly beans lemon drops. Pastry toffee fruitcake gingerbread jelly-o. Lollipop sesame snaps muffin. Macaroon halvah marshmallow sesame snaps sugar plum dragée. Wafer pudding sesame snaps tootsie roll sesame snaps cake chupa chups jelly beans.", "Sugar, Cottage cheese", "cheesecakesmall.jpg", 16.20));
    }

    return _pies;
};

let getPiesLocal = () => {
    return _pies;
};

let displayPrice = (price) => {
    return `${price.toFixed(2).replace('.', ',')} €`
};

let getPieById = (id) => {
    return _pies.find((pie) => pie.id === id);
};