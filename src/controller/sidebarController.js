class SidebarController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
        this.guestsNumber;
        this.confirmBtn;
        this.itemList;
        this.menuBtn;
        this.active = 1;
        this.mediaQuery;

        self = this;

        //this.renderView();

        this.initGuestsNumber();
        this.initConfirmBtn();
        this.initItemList();
        this.initMenuBtn();
        this.initMedia();

        // TODO lab 3
    }

    renderView() {
        this.view.render();
        // TODO lab 3   
    }

    setGuestsListener(e){
        //debugger;
        self.model.setNumberOfGuests(e.target.value)
        window.localStorage.setItem('guestsNumber',e.target.value);
    }

    // TODO Lab 3
    initGuestsNumber() {
        //debugger;
        this.guestsNumber = container("sidebar").querySelector("#gn");
        this.guestsNumber.addEventListener("change", this.setGuestsListener, false);
    }

    mediaListener=function(media){
        if(media.matches){
            container("sidebar").querySelector("#searchIndex").style.display = "none";
            container("sidebar").querySelector("#lowerSide").style.display = "none";
            container("sidebar").querySelector("#people").style.display = "none";
            container("sidebar").querySelector("#gn").style.display = "none";
        }
        else{
            container("sidebar").querySelector("#searchIndex").style.display = "flex";
                container("sidebar").querySelector("#lowerSide").style.display = "block";
                container("sidebar").querySelector("#people").style.display = "inline";
                container("sidebar").querySelector("#gn").style.display = "inline";
        }
    }

    initMedia(){
        this.mediaQuery=window.matchMedia("(max-width:600px)");
        this.mediaQuery.addListener(this.mediaListener);
    }

    initConfirmBtn() {
        this.confirmBtn = container("sidebar").querySelector("#cb");
        this.confirmBtn.addEventListener("click", () => toOverview(), false);
    }

    initItemList() {
        this.itemList = container("sidebar").querySelector("#current-dishes");
        this.itemList.addEventListener("click", function (e) {
            self.model.setNewCurrentDish(e.target.id);
            toDetails();
            window.localStorage.setItem('currentDish',e.target.id)
        })
    }

    initMenuBtn() {
        //this.mediaQuery=window.matchMedia("(max-width:600px)");
        this.menuBtn = container("sidebar").querySelector("#menu-button");
        this.menuBtn.addEventListener("click", function (e) {
             if (self.active == 0) {
                container("sidebar").querySelector("#searchIndex").style.cssText = "display:flex";
                container("sidebar").querySelector("#lowerSide").style.display = "block";
                container("sidebar").querySelector("#people").style.display = "block";
                container("sidebar").querySelector("#gn").style.display = "block";
                self.active = 1;
            }

            else {
                container("sidebar").querySelector("#searchIndex").style.cssText = "display:none";
                container("sidebar").querySelector("#lowerSide").style.display = "none";
                container("sidebar").querySelector("#people").style.display = "none";
                container("sidebar").querySelector("#gn").style.display = "none";
                self.active = 0;
            }
        })
    }
}
