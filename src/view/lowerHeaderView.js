class LowerHeaderView {
    constructor(container, model) {
        this.container = container;
		this.model = model;
        this.guests;
        this.guestsText;
        this.lowerHeader;

        this.model.addObserver(this);
    }

    render(){
        this.guests=this.model.getNumberOfGuests();
        this.lowerHeader=create(this.container,"div");
		this.lowerHeader.id="lower-header";
        this.guestsText=create(this.lowerHeader,"h2");
        this.guestsText.textContent="My Dinner: "+this.guests+" people";
		let headButton = create(this.lowerHeader, "a");
    	headButton.textContent = "Go back and edit dinner";
        headButton.classList.add("back-button");
        headButton.id="back-button";
    }

    update(model, changeDetails) {
		if (changeDetails.type === "guests-number") {
            this.guests = model.getNumberOfGuests();
            this.guestsText.textContent="My Dinner: "+this.guests+" people";
        }
    }
}