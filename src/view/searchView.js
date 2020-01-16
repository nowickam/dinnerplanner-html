class SearchView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
    this.dishes = null;

    this.model.addObserver(this);
  }

  render(dishId) {
    const searchDishPanel = create(this.container, "div");
    searchDishPanel.id = "dishSearchPanel";

    const search = create(searchDishPanel, "div");
    search.id = "dishSearchView";
    create(search, "h3").textContent = "FIND A DISH";

    let textSearch = create(search, "input");
    textSearch.id="text-search";
    textSearch.classList.add("margin");
    textSearch.type = "text";
    textSearch.placeholder = "Enter key words";

    let drop = create(search, "select");
    drop.id="drop";
    let foodTypes = ["All", "Breakfast", "Lunch", "Main Course", "Dinner","Dessert"];
    for (const f of foodTypes)
      create(drop, "option").textContent = f;
    let searchBtn = create(search, "a");
    searchBtn.id="search-button";
    searchBtn.textContent = "search";
    searchBtn.classList.add("button");

    this.dishes = create(searchDishPanel, "div");
    this.dishes.id = "dishItems";

    this.afterRender();
  }

  afterRender(type,query) {
    //dish icons display
    document.querySelector("#loader").style.display="block";
    this.model.getAllDishes(type,query)
      .then(result => {
        let menu=result.results;
        for (const dish of menu) {
          let item = create(this.dishes, "div");
          item.id=dish.id;
          item.classList.add("dishItems");
          create(item, "img").src = result.baseUri+dish.imageUrls;
          create(item, "div").textContent = dish.title
        }
      })
      .catch(console.error)
      .finally(()=>document.querySelector("#loader").style.display="none");

  }

  update(model,changeDetails) {
    // TODO lab3
    if(changeDetails.type=="get-all-dishes"){
      deleteAll(this.dishes);
      this.afterRender(changeDetails.searchType,changeDetails.searchQuery);
    }
  }
}
