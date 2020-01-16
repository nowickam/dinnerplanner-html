class Observable{
  constructor(){
   this._observers = [];
 }

  addObserver(observer){
   this._observers.push(observer);
  }

  notifyObservers(changeDetails) {
         for(var i=0; i<this._observers.length; i++) {
               this._observers[i].update(this, changeDetails);
         }
        //this._observers=this._observers.map(x=>x.update(this,changeDetails));
   }

   removeObserver(observer){
    //this._observers.splice(this._observers.findIndex(observer),1);
     this._observers.filter(x=>x!==observer);
    }
}

//DinnerModel class
class DinnerModel extends Observable{

  constructor() {
    //TODO Lab 1
    // implement the data structure that will hold number of guests
    // and selected dishes for the dinner menu
    super();
    this.menu=[];
    this.numberOfGuests=1;
    this.type;
    this.query;
    this.currentDish=0;
  }

  setNewCurrentDish(_id){
    this.currentDish=_id;
    this.notifyObservers({type:"new-current-dish", id:_id});
  }

  getCurrentDish(){
    return this.currentDish;
  }

  setNewSearch(type,query){
    this.type=type;
    this.query=query;
    this.notifyObservers({type:"get-all-dishes", searchType:type, searchQuery: query});
  }

  setNumberOfGuests(num) {
    //debugger;
    if(num<1) num=1;
    this.numberOfGuests=num;
    this.notifyObservers({type:"guests-number"});
  }

  getNumberOfGuests() {
    return this.numberOfGuests;
  }

  //Returns the dishes that are on the menu for selected type
  getSelectedDishes(type) {
    return this.menu.filter(menu=>(menu.dishTypes.includes(type)));
  }

  //Returns all the dishes on the menu.
  getFullMenu() {
    return this.menu;
  }

  //Returns all ingredients for all the dishes on the menu.
  getAllIngredients() {
    return this.menu.map(dish => dish.extendedIngredients).flat();
  }

  //Returns the total price of the menu (price per serving of each dish multiplied by number of guests).
  getTotalMenuPrice() {
    return this.menu.reduce((acc,x)=>acc+x.pricePerServing*this.getNumberOfGuests(),0).toFixed(2);
  }

  menuContains(id) {
	  let x = false;
	  this.menu.map(dish=>{
		  if(dish.id==id){
			  x= true;
		  }
	  });
	  return x;
  }

  //Adds the passed dish to the menu.
  //Dishes can be of the same type - otherwise it is unusable
  addDishToMenu(dish) {
    // this.menu=this.menu.filter(function(currDish){
    //   if(currDish.dishTypes.length===dish.dishTypes.length)
    //   {
    //     if(dish.dishTypes.every(type=>currDish.dishTypes.includes(type)))
    //       return false;
    //     else
    //       return true;
    //   }
    //   else
    //     return true;
    // });
    this.menu.push(dish);
    this.notifyObservers({type:"new-dish", index:this.menu.length-1});
  }

  //Removes dish with specified id from menu
  removeDishFromMenu(id) {
    let dishIndex=-1;
    this.menu=this.menu.filter(dish=>{
      if(dish.id!==id)
        return true;
      else{
        dishIndex=this.menu.indexOf(dish);
        return false;
      }
    });
    this.notifyObservers({type:"removed-dish", index: dishIndex, dishId: id});
  }


  //Returns all dishes of specific type (i.e. "starter", "main dish" or "dessert").
  //query argument, text, if passed only returns dishes that contain the query in name or one of the ingredients.
  //if you don't pass any query, all the dishes will be returned
  getAllDishes(type, query) {

    if(type===undefined) type="";
    if(query===undefined) query="";

    let result = fetch(ENDPOINT+'/recipes/search?type='+type+'&query='+query,
    {headers: {"X-Mashape-Key":API_KEY}})
    .then(response=>response.json())
    .catch(console.error);

    return result;
  }

  //Returns a dish of specific ID
  getDish(id) {
    let result = fetch(ENDPOINT+'/recipes/'+id+'/information',
    {headers: {"X-Mashape-Key":API_KEY}})
    .then(response=>response.json())
    .catch(console.error);

    return result;
  }
}
