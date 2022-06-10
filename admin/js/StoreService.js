let _stores = [];

let readStores = () => {
    return JSON.parse(localStorage.getItem('pieStores'));
}

let saveStores = (stores) => {
    localStorage.setItem('pieStores', JSON.stringify(stores));
}

let saveNearestStoreInfo = (storeInfo) => {
    localStorage.setItem('pieNearestStore', JSON.stringify(storeInfo));
}

let addStore = (store) => {
    _stores.push(store);
    saveStores(_stores);
}

let getStores = () => {
    if ('pieStores' in localStorage) {
        _stores = readStores();
        Store.id = _stores[_stores.length - 1].id + 1;
    } else {
        Store.id = 1;
        addStore(new Store('Bourg-en-Bresse', 'France', 46.205167, 5.225501));
        addStore(new Store('Paris', 'France', 48.856614, 2.352222));
        addStore(new Store('Limoges', 'France', 45.833619, 1.261105));
    }

    return _stores;
}

let getStoreById = (id) => {
    return _stores.find((store) => store.id === id);
}

let findNearestStore = (position) => {
    console.log(position);
    let stores = getStores();
    let idNearest = -1;
    let distanceNearest = Number.MAX_VALUE;
    for (const store of stores) {
        let distanceToStore = calculateDistance(position.coords.latitude, position.coords.longitude, store.latitude, store.longitude);
        if (distanceNearest > distanceToStore) {
            idNearest = store.id;
            distanceNearest = distanceToStore;
        }
    }
    
    saveNearestStoreInfo({
        store: getStoreById(idNearest),
        distance: distanceNearest,
    });

    return nearestStoreInfo;
}

let displayDistance = (distance) => {
    return `${distance.toFixed(1).replace('.', ',')} km`
}

let calculateDistance = (lat1, lon1, lat2, lon2) => {
    let p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;
    
    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}
