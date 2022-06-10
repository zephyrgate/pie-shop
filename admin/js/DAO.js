let readPies = () => {
    return JSON.parse(localStorage.getItem('pies')).sort((pie1, pie2) => pie1.id - pie2.id);
}

let savePies = (pies) => {
    localStorage.setItem('pies', JSON.stringify(pies));
} 