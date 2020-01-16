class OverviewView {
	constructor(container, model) {
		this.container = container;
		this.model = model;
		this.dishes;
		this.guestsNumber;
		this.totalCost;

		this.model.addObserver(this);
	}

	render() {

		this.guestsNumber = this.model.getNumberOfGuests();

		let dishesContainer=create(this.container,"div");
		dishesContainer.id="dishes-container";

		this.dishes = create(dishesContainer, "div");
		this.dishes.id = "dishItemsOverview";

		this.totalCost = create(dishesContainer, "div");
		this.totalCost.id = "total-price";

		let printContainer = create(this.container, "div");
		printContainer.id = "print-container";
		let printButton = create(printContainer, "a");
		printButton.textContent = "Print Full Recipe";
		printButton.id = "toPrintBtn";

		this.afterRender();
	}

	afterRender() {
		let menu = this.model.getFullMenu();
		for (const dish of menu) {
			let itemContainer = create(this.dishes, "div");
			itemContainer.id = "item-container";
			let item = create(itemContainer, "div");
			console.log(dish.id);
			console.log("test");
			itemContainer.classList.add(dish.id);
			item.id=dish.id;
			item.classList.add("dishItems");
			create(item, "img").src = dish.image;
			create(item, "div").textContent = dish.title
			let price = create(itemContainer, "div");
			price.textContent = "SEK " + (dish.pricePerServing * this.guestsNumber).toFixed(2);
			price.id = "price";
		}


		this.totalCost.textContent = "Total:\n" + this.model.getTotalMenuPrice() + " SEK";
	}

	update(model, changeDetails) {
		if (changeDetails.type === "guests-number") {
			this.guestsNumber = this.model.getNumberOfGuests();
			this.totalCost.textContent = "Total:\n" + this.model.getTotalMenuPrice() + " SEK";
		}
		if (changeDetails.type === "new-dish") {
			let menuDishes = model.getFullMenu();
			let dish = menuDishes[changeDetails.index];
			let itemContainer = create(this.dishes, "div");
			itemContainer.id = "item-container";
			let item = create(itemContainer, "div");
			itemContainer.classList.add(dish.id);
			item.classList.add("dishItems");
			create(item, "img").src = dish.image;
			create(item, "div").textContent = dish.title
			let price = create(itemContainer, "div");
			price.textContent = "SEK " + (dish.pricePerServing * this.guestsNumber).toFixed(2);
			price.id = "price";

			this.totalCost.textContent = "Total:\n" + this.model.getTotalMenuPrice() + " SEK";

		}
		if (changeDetails.type === "removed-dish") {
			//let removeDish = this.dishes.getElemenyById(changeDetails.index);
			//this.dishes.removeChild(removeDish);\
            let dishId = changeDetails.dishId;
            let removeDish =document.getElementsByClassName(dishId)
			this.dishes.removeChild(removeDish[0]);

			this.totalCost.textContent = "Total:\n" + this.model.getTotalMenuPrice() + " SEK";
		}
	}
}


