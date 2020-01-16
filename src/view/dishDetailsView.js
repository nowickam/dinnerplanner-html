class DishDetailsView {
    constructor(container, model) {
        this.container = container;
        this.model = model;
        this.dishId;
        this.guests;
        this.descrTitle;
        this.descrImg;
        this.descrText;
        this.prepText;
        this.table;
        this.row;
        this.totalCost;
        this.addButton;
        this.removeButton;

        this.model.addObserver(this);
    }

    render(dishId) {
        this.dishId = dishId;
        this.guests = this.model.getNumberOfGuests();

        let details = create(this.container, "div");
        details.id = "details";

        let top = create(details, "div");
        top.id = "details-top";


        let left = create(top, "div");
        left.id = "details-left-panel";
        let description = create(left, "div");
        description.id = "description";

        this.descrTitle = create(description, "h2");

        this.descrImg = create(description, "img");
        this.descrImg.id = "descr-img";

        this.descrText = create(description, "p");
        this.descrText.id = "descr-text";

        let descrButton = create(description, "button");
        descrButton.textContent = "back to search";
        descrButton.classList.add("back-button");
        descrButton.id = "back-button";


        let instructions = create(details, "div");
        description.id = "instructions";

        this.prepText = create(instructions, "p");
        this.pairText = create(instructions, "p");


        let ingredients = create(top, "div");
        ingredients.id = "ingredients-table";
        this.tableHeader = create(ingredients, "h3");
        this.table = create(ingredients, "table");
        this.table.id = "table";

        let lastLine = create(ingredients, "div");
        lastLine.id = "lastLine";

        this.addButton = create(lastLine, "a");
        this.addButton.textContent = "Add to menu";
        this.addButton.classList.add("button");
        //pass the id to the detailsController
        this.addButton.classList.add(this.dishId);
        this.addButton.id = "add-button";

        this.removeButton = create(lastLine, "a");
        this.removeButton.classList.add(this.dishId);
        this.removeButton.classList.add("button");
        this.removeButton.textContent = "Remove from menu";
        //pass the id to the detailsController
        this.removeButton.id = "remove-button";

        this.totalCost = create(lastLine, "p");

        //this.afterRender();
    }

    afterRender(id) {
        this.dishId = id;
        document.querySelector("#loader").style.display = "block";
        this.model.getDish(this.dishId)
            .then(dish => {
                this.descrTitle.textContent = dish.title;
                this.descrImg.src = dish.image;
                this.descrText.textContent = "Type: " + dish.dishTypes + "\nDiets: " + dish.diets + "\nPreparation time(min): " + dish.readyInMinutes +
                    "\nPrice per serving: " + dish.pricePerServing + "\nHealth score: " + dish.healthScore;
                if (dish.instructions != null) {
                    create(this.prepText, "h2").textContent = "PREPARATION";
                    create(this.prepText, "p").textContent = dish.instructions;
                }

                this.tableHeader.textContent = "INGREDIENTS FOR " + this.guests + " PEOPLE";
                console.log(dish);
                for (const ing of dish.extendedIngredients) {
                    this.row = create(this.table, "tr")
                    create(this.row, "td").textContent = (ing.measures.metric.amount * (this.guests / dish.servings)).toFixed(1)
                        + " " + ing.measures.metric.unitShort;
                    create(this.row, "td").textContent = ing.name;
                    //no such info in api
                    // create(row,"td").textContent="SEK";
                    // create(row,"td").textContent=ing.pricePerServing*(guests/dish.servings);
                }

                if (this.model.menuContains(dish.id)) {
                    this.addButton.classList.add("inactive-button");
                    this.removeButton.classList.remove("inactive-button");
                }
                else {
                    this.removeButton.classList.add("inactive-button");
                    this.addButton.classList.remove("inactive-button");
                }
                this.totalCost.textContent = "SEK " + (dish.pricePerServing * this.guests).toFixed(2);
            })
            .catch(console.error)
            .finally(() => document.querySelector("#loader").style.display = "none");
    }

    update(model, changeDetails) {
        if (changeDetails.type == "new-current-dish") {
            deleteAll(this.table);
            deleteAll(this.prepText);
            this.afterRender(changeDetails.id);
        }

        if (changeDetails.type === "guests-number") {
            let oldGuests = this.guests;
            this.guests = this.model.getNumberOfGuests();
            this.tableHeader.textContent = "INGREDIENTS FOR " + this.guests + " PEOPLE";
            let oldCost = Number((this.totalCost.textContent).slice(4));
            this.totalCost.textContent = "SEK " + (oldCost / oldGuests * this.guests).toFixed(2);
            if (this.dishId !== undefined) {
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
            this.addButton.classList.add("inactive-button");
            this.removeButton.classList.remove("inactive-button");

        }
        if (changeDetails.type === "removed-dish") {
            this.addButton.classList.remove("inactive-button");
            this.removeButton.classList.add("inactive-button");
        }
    }
}