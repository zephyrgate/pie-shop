let readPies = async () => {
    let pies;
    // return JSON.parse(localStorage.getItem('pies')).sort((pie1, pie2) => pie1.id - pie2.id);
    await fetch('http://localhost:3000/pies')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(_pies);
            pies = data;
        });
    
    return pies;
}

let savePies = (pies) => {
    localStorage.setItem('pies', JSON.stringify(pies));
} 