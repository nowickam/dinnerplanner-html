class HeaderController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
        this.headerBtn;

        //this.renderView();

        this.initHeading();

        // TODO lab 3
    }

    renderView() {
      this.view.render();
        // TODO lab 3   
    }

    initHeading(){
        this.headerBtn=container("header").querySelector("#headerText");
        this.headerBtn.addEventListener("click",()=>toHome(),false);
    }
}