class HomeController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
        this.startBtn;

        //this.renderView();

        this.initStartBtn();

        // TODO lab 3
    }

    initStartBtn(){
        this.startBtn=container("home").querySelector("#startBtn");
        this.startBtn.addEventListener("click",()=>toSearch(),false);
    }

}