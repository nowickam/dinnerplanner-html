class SearchController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
        this.drop;
        this.text;
        this.searchBtn;
        this.item;

        self=this;

        this.initSearch();
        this.initItem();
        this.searchListener();

        //this.renderView();


        // TODO lab 3
    }

    renderView() {
      this.view.render();
        // TODO lab 3   
    }

    searchEnterListener(e){
        if(e.key==="Enter")
            {
                e.preventDefault();
                let type;
                let query;
                //text is typed
                if(e.target.id=="text-search"){
                        let c=container("search").querySelector("#drop");
                        query=e.target.value;
                        type=c.value;
                    }
                //dropdown is selected
                else{
                    let c=container("search").querySelector("#text-search");
                    query=c.value;
                    type=e.target.value;
                }
                self.model.setNewSearch(type,query);
            }
    }

    searchListener(){
        let drop=container("search").querySelector("#drop");
        let text=container("search").querySelector("#text-search");

        self.model.setNewSearch(drop.value,text.value);
    }

    initSearch(){
        //debugger;
        this.drop=container("search").querySelector("#drop");
        this.text=container("search").querySelector("#text-search");
        // console.log(this.drop.value);
        // console.log(self.drop.value);
        this.searchBtn=container("search").querySelector("#search-button");
        this.text.addEventListener("keypress",this.searchEnterListener,false);
        this.drop.addEventListener("keypress",this.searchEnterListener,false);
        this.searchBtn.addEventListener("click",this.searchListener,false);
    }

    initItem(){
        this.item=container("search").querySelector("#dishItems");
        this.item.addEventListener("click",function(e){
            //console.log(e.target.parentNode.id);
            if(e.target.parentNode.id!="dishSearchPanel")
            {self.model.setNewCurrentDish(e.target.parentNode.id);
            toDetails();
            window.localStorage.setItem('currentDish',e.target.parentNode.id);}
        },false);
    }

}