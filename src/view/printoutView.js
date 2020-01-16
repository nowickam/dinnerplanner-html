class PrintoutView {
    constructor(container, model) {
        this.container = container;
        this.model = model;
        this.printout;
        this.table;
        this.guestsNumber;
        this.totalCost;

        this.model.addObserver(this);
    }

    render() {
        this.printout = create(this.container, "div");
        this.printout.id = "printout-container";

        this.afterRender();
    }

    afterRender() {
        //debugger;
        this.guestsNumber = this.model.getNumberOfGuests();
        let menu = this.model.getFullMenu();
        for (const dish of menu) {
            let itemContainer = create(this.printout, "div");
            itemContainer.classList.add("item-container-printout");
            itemContainer.id = "printout-" + dish.id;

            let itemLeft = create(itemContainer, "div");
            itemLeft.classList.add("item-left");
            let itemImg = create(itemLeft, "img");
            itemImg.classList.add("item-img");
            itemImg.src = dish.image;
            let itemDescr = create(itemLeft, "div");
            itemDescr.classList.add("item-descr");
            create(itemDescr, "h2").textContent = dish.title;

            create(itemDescr, "h3").textContent = "INGREDIENTS:"
            this.table = create(itemDescr, "table");
            this.table.id = "table";
            for (const ing of dish.extendedIngredients) {
                let row = create(this.table, "tr")
                create(row, "td").textContent = (ing.measures.metric.amount * (this.guestsNumber / dish.servings)).toFixed(1)
                    + " " + ing.measures.metric.unitShort;
                create(row, "td").textContent = ing.name;
            }
            this.totalCost = create(itemDescr, "h3");
            this.totalCost.textContent = "Total:\n" + this.model.getTotalMenuPrice() + " SEK";

            // create(itemDescr, "div").textContent = "Type: " + dish.dishTypes + "\nDiets: " + dish.diets + "\nPreparation time(min): " + dish.readyInMinutes +
            //     "\nPrice per serving: " + dish.pricePerServing + "\nHealth score: " + dish.healthScore;

            if (dish.instructions != null) {
                let itemRight = create(itemContainer, "div");
                itemRight.classList.add("item-right");
                create(itemRight, "h3").textContent = "PREPARATION";
                create(itemRight, "div").textContent = dish.instructions;
            }
        }
    }

    update(model, changeDetails) {
        if (this.table !== undefined) {
            if (changeDetails.type === "guests-number") {
                this.guestsNumber = this.model.getNumberOfGuests();
                //if there are dishes in the menu
                if (this.totalCost !== undefined)
                    this.totalCost.textContent = "Total:\n" + this.model.getTotalMenuPrice() + " SEK";

                this.model.getDish(this.dishId)
                    .then(dish => {
                        deleteAll(this.table);
                        for (const ing of dish.extendedIngredients) {
                            this.row = create(this.table, "tr")
                            create(this.row, "td").textContent = (ing.measures.metric.amount * (this.guests / dish.servings)).toFixed(1)
                                + " " + ing.measures.metric.unitShort;
                            create(this.row, "td").textContent = ing.name;
                        }
                    });


            }
        }
        if (changeDetails.type === "new-dish") {
            deleteAll(this.printout);
            this.afterRender();
        }
        if (changeDetails.type === "removed-dish") {
            let dishId = changeDetails.dishId;
            let removeDish = document.getElementById("printout-" + dishId);
            console.log(removeDish);
            this.printout.removeChild(removeDish);
        }

    }
}