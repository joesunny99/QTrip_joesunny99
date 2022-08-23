import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const urlParams = new URLSearchParams(search);
  
  // console.log(urlParams);
  let a = urlParams.get('city');
  
  return a;
  //console.log(search);
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data

  try {
  //console.log(config.backendEndpoint+"/adventures?city="+city);
  let res = await fetch(config.backendEndpoint+"/adventures?city="+city);
  //console.log(res);
  let data = await res.json();
  return data;
  } catch(err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let parentEle = document.getElementById("data");
  //console.log(parentEle);
  
  adventures.forEach(adv =>{
    //console.log(adv);

    let mainChild = document.createElement("div");

    mainChild.className = "col-12 col-sm-6 col-lg-3 mb-4";
  
    mainChild.innerHTML = `
    <a href= "detail/?adventure=${adv.id}" id = "${adv.id}" class = "activity-card">
      
        <div class = "image-holder">
          <span class="category-banner">${adv.category}</span>
          <img src ="${adv.image}" />
        </div>
        
        <div class = "d-flex justify-content-between p-2">
            <p>${adv.name}</p>
            <p>${adv.costPerHead}</p>
        </div>
        <div class = "d-flex justify-content-between p-2">
            <p>Duration</p>
            <p>${adv.duration}</p>
        </div>
        
      
    </a>
    `
  parentEle.append(mainChild);

  })
 
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let newList = [];
  if(low){
    newList = list.filter(a =>{
      if(a.duration>=low && a.duration <= high){
        return a;
      }
    })
    return newList;
}
else{
  return list;
}
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  // let cat = categoryList[0];
  // let filtered = list.filter(a=> a.category === cat);
  // return filtered;
  //console.log(categoryList);
  let newList =[]
  if(categoryList.length === 0){
    return list;
  } else{
    categoryList.forEach(cat => {
      let filtered = list.filter(a=> a.category === cat);
      newList.push(...filtered);
    })
    //console.log(newList);
    return newList;
  }
}




// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  //let cat = filters.category[0];
  //console.log(filters);
  let Categorylist = filterByCategory(list, filters.category);
  // // Place holder for functionality to work in the Stubs
  //console.log(filters);
  //console.log(Categorylist);
  let low, high;
  switch(filters.duration){
    case "0-2":
      low = 1;
      high = 2;
      break;
    case "2-6":
      low = 3
      high = 6
      break;
    case "6-12":
      low = 7;
      high = 12;
      break;
    case "12-20":
      low = 13;
      high = 20;
      break;
    default:
      break;
  }
  let finallist = filterByDuration(Categorylist, low, high);
  //console.log(finallist);
  return finallist;
  
}





//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem('filters', JSON.stringify(filters));
  //return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  return JSON.parse(window.localStorage.getItem('filters'));

  // Place holder for functionality to work in the Stubs
  //return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  filters.category.forEach((filter) => {
    let newFilter = document.createElement("p");
    newFilter.className = "category-filter";
    newFilter.textContent = filter;
    newFilter.onclick = (event) => {
      let newList = filters.category.filter(item => item !== filter);
      filters.category = newList;
      console.log(filters);
      
      let elem = event.target;
      //elem.parentNode.removeChild(elem);
      elem.remove();
      let removedfilter = event.target.textContent;
      let list = document.getElementsByClassName("category-banner");      
      let a= list.length;
      for(let i = 0; i < a;){
        
        if(list[i].textContent === removedfilter){
          let el = list[i].parentNode.parentNode.parentNode;
          el.remove();
          a--;
        }
        else{
          i++;
        }
      }
    }; 
    //console.log(newFilter);
    document.getElementById("category-list").append(newFilter);
  })
    //console.log(filters.duration);
    //console.log(typeof filters.duration);
    

  //$('#duration-select').val(filters.duration);

  switch(filters.duration){
    case "0-2":
      document.getElementById("duration-select").selectedIndex = 1;
      break;
    case "2-6":
      document.getElementById("duration-select").selectedIndex = 2;
      break;
    case "6-12":
      document.getElementById("duration-select").selectedIndex = 3;
      break;
    case "12-20":
      document.getElementById("duration-select").selectedIndex = 4;
      break;
    default:
      break;
  }
}

// function RemoveCurrentFilter(List, Removedfilter){
//   console.log(List, Removedfilter);
//   let newList = List.filter(item => item !== Removedfilter);
//   console.log(newList);
//   //generateFilterPillsAndUpdateDOM(newList);
//   //return newList;
// }
function remove(el) {
  var element = el;
  element.remove();
}


export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
