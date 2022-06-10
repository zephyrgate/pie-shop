let displayPies = () => {
    let linesTable = '';
    let pies = getPiesLocal();
    pies.forEach((pie) => linesTable += getHtmlTableRow(pie));

    document.querySelector('table.pie-table tbody').innerHTML = linesTable;
}

let getHtmlCard = (pie) => {
    return `
        <div class="col-12 col-sm-6 col-md-4 mb-3">
            <div class="card card-bethany">
                <img src="images/products/${pie.image}" class="card-img-top" alt="${pie.name}">
                <div class="card-body">
                    <h5 class="card-title">${pie.name}</h5>
                    <p class="card-text">${pie.smallDescription}</p>
                    <a href="pie.html" class="btn btn-bethany btn-primary" data-pie-id="${pie.id}">Voir cette tarte</a>
                </div>
            </div>
        </div>
    `;
}

let displayAllPies = () => {
    let colPies = '';
    let pies = getPies();
    pies.forEach((pie) => colPies += getHtmlCard(pie));

    document.querySelector('div.pie-container > div.row').innerHTML = colPies;
}

let onClickViewButton = (event) => {
    event.preventDefault();
    sessionStorage.setItem('idPieView', event.target.dataset.pieId);

    window.location.href = "pie.html";
}

let addListenersViewButton = () => {
    document.querySelectorAll('a.btn-bethany[data-pie-id]').forEach((aTag) => aTag.addEventListener('click', onClickViewButton));
};

let init = () => {
    displayAllPies();
    addListenersViewButton();
};

window.addEventListener('load', init);