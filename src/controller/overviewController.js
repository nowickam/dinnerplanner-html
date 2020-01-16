class OverviewController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
        this.printBtn;

        //this.renderView();

        this.initPrintBtn();

        // TODO lab 3
    }

    renderView() {
      this.view.render();
        // TODO lab 3   
    }

    initPrintBtn(){
        this.confirmBtn=container("overview").querySelector("#toPrintBtn");
        this.confirmBtn.addEventListener("click",()=>toPrintout(),false);
    }
}