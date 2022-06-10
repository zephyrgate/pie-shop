class Store {
    constructor(city, country, latitude, longitude) {
        this.id = Store.id++;
        this.city = city;
        this.country = country;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
