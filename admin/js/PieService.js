let _pies = [];
let serverURL = "http://localhost:3000/pies";

let postData = async (url = '', data = {}) => {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    return response.json(); // parses JSON response into native JavaScript objects
};

let putData = async (pie) => {
    await fetch(`${serverURL}/${pie.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pie),
    });
}

let addPie = async (pie) => {
    _pies.push(pie);
    await postData(serverURL, pie)
        // .then()
};

let removePie = (id) => {
    _pies = _pies.filter((pie) => pie.id !== id);
    savePies(_pies);
};

let updatePie = async (updatedPie) => {
    _pies.forEach((pie, index) => {
        if (pie.id === updatedPie.id) {
            _pies[index] = updatedPie;
        }
    });
    await putData(updatedPie);
};

let getPies = async () => {
    _pies = await readPies();

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