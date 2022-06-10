let init = () => {
    document.querySelector('.geolocation-link a.nav-link').addEventListener('click', onClickGeolocationLink);
};

// let getLocationPromise = () => {
//     return new Promise((resolve, reject) => {
//         navigator.geolocation.getCurrentPosition(resolve, reject);
//     });
// }

// let getLocation = () => {
//     let position;
//     getLocationPromise().then((res) => position = res);

//     return position;
// }

let onClickGeolocationLink = async (event) => {
    console.log(event.target, event.currentTarget);
    event.preventDefault();
    let position;
    navigator.geolocation.getCurrentPosition((pos) => position = pos);
    const {store, distance} = findNearestStore(position);
    console.log(store, distance);
    document.querySelector('.nav-item.geolocation-link a.nav-link').innerText = `
        &#127968; Bethany's Pie Shop ${store.city} (à ${displayDistance(distance)})
    `;
};

window.addEventListener('load', init);