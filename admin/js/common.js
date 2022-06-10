if (localStorage.getItem('pies') === null) {
    let pies = [
        {
            id: 1,
            nom: "Apple pie",
            description: "Our famous apple pies!",
            image: "applepie.jpg",
        },
        {
            id: 2,
            nom: "Blueberry cheese cake",
            description: "A Christmas favorite",
            image: "blueberrycheesecakesmall.jpg",
        },
        {
            id: 3,
            nom: "Cheese cake",
            description: "Plain cheese cake. Plain pleasure.",
            image: "cheesecakesmall.jpg",
        },
    ];
    localStorage.setItem('pies', JSON.stringify(pies));
}

function getId() {
    let pies = localStorage.getItem('pies');
    if (pies === null) {
        return 1;
    } else {
        pies = JSON.parse(pies);
        console.log(pies)
        return 1 + pies.reduce((lastId, pie) => lastId = pie.id > lastId ? pie.id : lastId, 0);
    }
}

function createPieFromForm(form) {
    return {
        id: getId(),
        nom: form.querySelector('#inputNom').value,
        description: form.querySelector('#textareaDescription').value,
        image: form.querySelector('#inputImage').value,
    };
}

function addToStorage(pie) {
    let pies = JSON.parse(localStorage.getItem('pies'));
    console.log(pies);
    pies.push(pie);
    localStorage.setItem('pies', JSON.stringify(pies));
}