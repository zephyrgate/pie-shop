class Pie {
    constructor(name, smallDescription, longDescription, ingredients, image, price) {
        this.id = Pie.id++;
        this.name = name;
        this.smallDescription = smallDescription;
        this.longDescription = longDescription;
        this.ingredients = ingredients;
        this.image = image;
        this.price = price;
    }
}
