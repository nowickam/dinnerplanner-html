class LowerHeaderController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
        this.backBtn;

        //this.renderView();

        this.initBackBtn();

        // TODO lab 3
    }

    renderView() {
      this.view.render();
        // TODO lab 3   
    }

    initBackBtn(){
        this.confirmBtn=container("lower-header").querySelector("#back-button");
        this.confirmBtn.addEventListener("click",()=>toSearch(),false);
    }
}