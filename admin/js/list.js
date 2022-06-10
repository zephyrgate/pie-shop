let doDeletePieButtonListener;

let init = () => {
    doDeletePieButtonListener = null;
    getPies();
    displayPies();
    addListenersUpdateButtons();
    addListenersDeleteButtons();
};

let getHtmlTableRow = (pie) => {
    return `<tr>
        <td>${pie.id}</td>
        <td>${pie.name}</td>
        <td class="pie-max-width-th text-truncate"">${pie.smallDescription}</td>
        <td class="pie-max-width-th text-truncate">${pie.longDescription}</td>
        <td class="pie-max-width-th text-truncate">${pie.ingredients.map(ingredient => ingredient.name).join(', ')}</td>
        <td><img class="thumbnail-xsmall-img" src="../public/images/products/${pie.image}"></td>
        <td>${displayPrice(pie.price)}</td>
        <td><a href="edit.html" class="btn btn-warning edit-pie" data-pie-id="${pie.id}">Éditer</a></td>
        <td><button type="button" class="btn btn-danger delete-pie" data-bs-toggle="modal" data-bs-target="#deletePieModal" data-pie-id="${pie.id}">Supprimer</button></td>
    </tr>`;
};

let displayPies = () => {
    let linesTable = '';
    let pies = getPiesLocal();
    pies.forEach((pie) => linesTable += getHtmlTableRow(pie));

    document.querySelector('table.pie-table tbody').innerHTML = linesTable;
}

let onClickEditButton = (event) => {
    event.preventDefault();
    sessionStorage.setItem('idPieUpdate', event.target.dataset.pieId);
    window.location.href = "edit.html";
}

let onClickDeleteButton = (event) => {
    let doDeleteButton = document.querySelector('button.do-delete-pie');
    let id = Number(event.target.dataset.pieId);
    if (doDeletePieButtonListener !== null) {
        doDeleteButton.removeEventListener('click', doDeletePieButtonListener);
    }

    doDeletePieButtonListener = () => {
        onClickDoDeleteButton(id);
    }
    doDeleteButton.addEventListener('click', doDeletePieButtonListener);
}

let onClickDoDeleteButton = (id) => {
    removePie(id);
    displayPies();
    addListenersUpdateButtons();
    addListenersDeleteButtons();
}

let addListenersUpdateButtons = () => {
    document.querySelectorAll('a.edit-pie[data-pie-id]').forEach((link) => {
        link.addEventListener('click', onClickEditButton);
    });
};

let addListenersDeleteButtons = () => {
    document.querySelectorAll('button.delete-pie[data-pie-id]').forEach((button) => {
        button.addEventListener('click', onClickDeleteButton);
    });
}

window.addEventListener('load', init);