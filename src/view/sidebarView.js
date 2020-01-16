class SidebarView {
    constructor(container, model) {
        this.container = container;
        this.model = model;
        this.guestsNumber;
        this.totalCost;
        this.currentDishes;
        this.side;
        this.itemPrice;

        this.model.addObserver(this);
    }

    render(dishId) {

        this.side = create(this.container, "div");
        this.side.id = "sideBarView";
        this.side.classList.add("flex-column");

        let upperSide = create(this.side, "div");
        upperSide.classList.add("side-padding");
        upperSide.id="upperSide";
        let title = create(upperSide, "div");
        title.id = "menu-title";
        create(title, "h3").textContent = "My dinner";
        let menuIcon = create(title, "div");
        menuIcon.id="menu-button";
        create(menuIcon, "div").id = "menu-icon";
        create(menuIcon, "div").id = "menu-icon";
        create(menuIcon, "div").id = "menu-icon";
        let ppl=create(upperSide, "span");
        ppl.textContent = "People";
        ppl.id="people";
        //listen
        this.guestsNumber = create(upperSide, "input");
        this.guestsNumber.id = "gn";
        this.guestsNumber.classList.add("value-num-guests");
        this.guestsNumber.type = "number";
        this.guestsNumber.min = "1";


        let searchIndex = create(this.side, "div");
        searchIndex.id = "searchIndex";
        let dishName = create(searchIndex, "div");
        dishName.textContent = "Dish Name";
        let cost = create(searchIndex, "div");
        cost.textContent = "Cost";


        let lowerSide = create(this.side, "div");
        lowerSide.classList.add("side-padding");
        lowerSide.id="lowerSide";

        this.currentDishes = create(lowerSide, "div");
        this.currentDishes.id="current-dishes";

        this.totalCost = create(lowerSide, "p");
        //totalCost.textContent = "SEK 0.00";
        this.totalCost.classList.add("value-total-price");

        //listen
        let confirmBtn = create(lowerSide, "a");
        confirmBtn.textContent = "Confirm Dinner";
        confirmBtn.classList.add("button");
        confirmBtn.id="cb";

        this.afterRender();
    }

    afterRender() {

        this.guestsNumber.value = this.model.getNumberOfGuests();
        this.totalCost.textContent = "SEK " + this.model.getTotalMenuPrice();

        let menuDishes = this.model.getFullMenu();
        let guests = this.model.getNumberOfGuests();
        if(menuDishes.length!==0)
        {for (const dish of menuDishes) {
            let item = create(this.currentDishes, "div");
            item.classList.add("item");
            item.id=dish.id;
            let itemName = create(item, "div");
            itemName.classList.add("item-name");
            itemName.textContent = dish.title;
            this.itemPrice = create(item, "div");
            this.itemPrice.textContent = dish.pricePerServing*guests;
            this.itemPrice.classList.add("item-price");
        }}
    }

    update(model, changeDetails) {
        if (changeDetails.type === "guests-number") {
            //debugger;
            this.guestsNumber.value = this.model.getNumberOfGuests();
            this.totalCost.textContent = "SEK " + this.model.getTotalMenuPrice();
            let menuDishes = this.model.getFullMenu();
            let guests = this.model.getNumberOfGuests();
            if(menuDishes.length!==0)
            {for (const dish of menuDishes) {
                this.itemPrice.textContent = dish.pricePerServing*guests;
			}}
        }
        if (changeDetails.type === "new-dish") {
            let menuDishes = model.getFullMenu();
            let dish=menuDishes[changeDetails.index];
            let item = create(this.currentDishes, "div");
            let guests = this.model.getNumberOfGuests();
            item.classList.add("item");
            item.id=dish.id;
            let itemName = create(item, "div");
            itemName.classList.add("item-name");
            itemName.textContent = dish.title;
            itemName.id=dish.id;
            this.itemPrice = create(item, "div");
            this.itemPrice.textContent = dish.pricePerServing*guests;
            this.itemPrice.classList.add("item-price");
            this.itemPrice.id=dish.id

            this.totalCost.textContent = "SEK " + this.model.getTotalMenuPrice();

        }
        if (changeDetails.type === "removed-dish") {
            let dishId = changeDetails.dishId;
            let removeDish =document.getElementById(dishId);
			this.currentDishes.removeChild(removeDish);

            this.totalCost.textContent = "SEK " + this.model.getTotalMenuPrice();
        }
    }

}
