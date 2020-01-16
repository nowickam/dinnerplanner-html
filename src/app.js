// the View containers will not all be visible at the same time. 
// Various screens will show different Views                                                              
const screens = { 
         home: ["header","home"], 
         search: ["header", "side", "search","sidebar"],
         overview: ["header", "lower-header","overview"],
         details: ["header", "side", "sidebar","details"],
         printout:["header","lower-header","printout"]
      // TODO: add more screens here!    
};


//GSC functions for navigating

const toOverview=function(){
  show("overview");
}

const toSearch=function(){
  show("search");
}

const toDetails=function(){
  show("details");
}

const toPrintout=function(){
  show("printout");
}

const toHome=function(){
  show("home");
}

// switching between screens
const show= function(screenName) {
    // hide all views first 
    // optional FIXME: we could avoid hiding the containers that are part of the screen to be shown
    // optional FIXME: finding the containers could be done automatically
    // by looking at document.body.firstChild.children
    ["header", "home", "overview", "search", "sidebar","details","lower-header","printout","side"]
      .forEach(containerName => container(containerName).style.display="none");
    
    // now we show all the Views used by the indicated screen
    screens[screenName]
      .forEach(containerName => {
        if(containerName==="side")
        container(containerName).style.display = "flex";
        else
        container(containerName).style.display = "block";
      });
      this.localStorage.setItem('screen',screenName);
      this.console.log(this.localStorage);
};

                                                
window.onload = function () {
  //We instantiate our model
  const model = new DinnerModel();

  let headV=new HeaderView(container("header"),model);
  headV.render();
  //it needs the elements from the corresponding view rendered
  let headC=new HeaderController(headV,model);

  let sdV = new SidebarView(container("sidebar"),model);
  sdV.render();
  let sdC = new SidebarController(sdV,model);

  let srchV=new SearchView(container("search"), model);
  srchV.render();
  let srchC=new SearchController(srchV,model);

  let detV=new DishDetailsView(container("details"),model);
  detV.render();
  let detC=new DishDetailsController(detV,model);

  let lhV=new LowerHeaderView(container("lower-header"), model);
  lhV.render();
  let lhC=new LowerHeaderController(lhV,model);

  let hV=new HomeView(container("home"), model);
  hV.render();
  let hC=new HomeController(hV,model);

  let oV=new OverviewView(container("overview"), model);
  oV.render();
  let oC=new OverviewController(oV,model);

  let pV=new PrintoutView(container("printout"), model);
  pV.render();

  //if(refreshing the page)
  if(window.performance.navigation.type==1){
    //retrieve guests number
    model.setNumberOfGuests(this.localStorage.getItem('guestsNumber'));
    //retrieve the current dish in dish details
    if(this.localStorage.getItem('currentDish')!=null)
      model.setNewCurrentDish(this.localStorage.getItem('currentDish'));
    //retrieve the chosen menu
    if(this.localStorage.menu!=null && this.localStorage.menu!=""){
      let dishes=this.localStorage.getItem('menu').split(",");
      for(const d of dishes){
        model.getDish(d)
        .then(result=>model.addDishToMenu(result))
        .catch(console.error);
    }}

    show(this.localStorage.getItem('screen'));
  }
  else{
    this.localStorage.clear();
    this.localStorage.setItem('screen','home');
    show("home");
    
  }

  this.console.log(this.localStorage);

  // TODO:  more views here
  // TODO: The views are not being rendered yet. Figure out how to do so.
  
  

  /**
   * IMPORTANT: app.js is the only place where you are allowed to use document.body
   * In other Views you should limit your DOM searches to children of that View. For that, you must use querySelector()
   * It is possible to implement Views using no DOM search at all, using DOM fields like element.firstChild, 
   * element.nextSibling...
   */
};

