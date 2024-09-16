class Discount {
    constructor(description) {
        this.description = description; 
    }
    show_discount(){
        console.log(this.description);
    }
}

module.exports = Discount;
