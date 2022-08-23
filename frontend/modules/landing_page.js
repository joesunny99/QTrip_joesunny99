import config from "../conf/index.js";



async function init() {

  //console.log(config.backendEndpoint);
  
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  //console.log(cities);

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
    
  try{
  let res = await fetch(config.backendEndpoint+"/cities");
    return await res.json();
  }catch(err){
    return null;
  }
  }


//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let parent = document.getElementById("data");
  let mainChild = document.createElement("div");

  mainChild.className = "col-12 col-sm-6 col-lg-3 mb-4";

  mainChild.innerHTML =`
  <a href= "./pages/adventures/?city=${id}" id="${id}">
          <div class="tile">
            <img src="${image} class="img-fluid" />
            <div class="tile-text text-center">
              <h4>${city}</h4>
              <p>${description}</p>          
            </div>  
          </div>
        </a>
  `
parent.append(mainChild);

}

export { init, fetchCities, addCityToDOM };
