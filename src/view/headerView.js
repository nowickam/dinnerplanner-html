class HeaderView {
    constructor(container, model) {
        this.container = container;
        this.model = model;
        this.heading;
    }

    render() {
        const header = create(this.container,"div");
        this.heading=create(header,"h1");
        this.heading.textContent="Dinner Planner";
        this.heading.id="headerText";
        header.id="header";
    }

    afterRender() {

    }
}