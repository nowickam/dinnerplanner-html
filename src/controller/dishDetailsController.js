class DishDetailsController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
        this.addBtn;
        this.backBtn;
        this.removeBtn;
        //how to achieve global differently?
        self=this;

        this.initAddBtn();
        this.initBackBtn();
        this.initRemoveBtn();

        //this.renderView();


        // TODO lab 3
    }

    renderView(id) {
      this.view.render(id);
        // TODO lab 3
    }

    listener(e){
        //debugger;
        self.model.getDish(self.model.getCurrentDish())
            .then(dish=>self.model.addDishToMenu(dish))
            .then(()=>{
                let currentMenu=window.localStorage.getItem('menu');
                if(currentMenu!==null && currentMenu!="")currentMenu+=","+self.model.getCurrentDish();
                else currentMenu=self.model.getCurrentDish();
                window.localStorage.menu=currentMenu;
            })
            .catch(console.error());
    }

    initAddBtn(){
        this.addBtn=container("details").querySelector("#add-button");
        this.addBtn.addEventListener("click",this.listener,false);
    }
    listenerR(e){
        //debugger;
        self.model.getDish(self.model.getCurrentDish())
            .then(dish=>{
                self.model.removeDishFromMenu(dish.id);
                let oldMenu=window.localStorage.getItem('menu');
                console.log(oldMenu);
                let oldMenuArr=oldMenu.split(",");
                console.log(oldMenuArr);
                let newMenuArr=oldMenuArr.filter(d=>d!==dish.id.toString());
                console.log(newMenuArr);
                console.log(newMenuArr.toString());
                window.localStorage.menu=newMenuArr.toString();
            })
            .catch(console.error());
    }

    initRemoveBtn(){
        this.removeBtn=container("details").querySelector("#remove-button");
        this.removeBtn.addEventListener("click",this.listenerR,false);
    }

    initBackBtn(){
        this.backBtn=container("details").querySelector("#back-button");
        this.backBtn.addEventListener("click",()=>toSearch(),false);
    }

}