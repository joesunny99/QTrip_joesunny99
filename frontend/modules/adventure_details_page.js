import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  //console.log(search);
  //console.log(window.location.search);
  const urlParams = new URLSearchParams(search);
  
  // console.log(urlParams);
  let a = urlParams.get('adventure');
  console.log(a);
  return a;
  // Place holder for functionality to work in the Stubs
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let url= config.backendEndpoint+"/adventures/detail?adventure="+adventureId;
    //console.log(url);
    let res = await fetch(url);
    //console.log(res);
    let data = await res.json();
    //console.log(data);
    return data;
    } catch(err) {
      return null;
    }

  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").innerHTML = adventure.name;
  document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;
  document.getElementById("adventure-content").innerHTML = adventure.content;
  let parentimg = document.getElementById("photo-gallery")
  adventure.images.forEach((image)=>{
    let im = document.createElement("img");
    im.setAttribute("src", image);
    im.setAttribute("class", "activity-card-image");
    parentimg.append(im);
  });
  //console.log(adventure.images.length);
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  //console.log(images);
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let photos = document.getElementById("photo-gallery");
  photos.innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `
  //console.log(photos);
  images.forEach((img, index) => {
    //console.log(img);
    let parentDiv = document.createElement("div");
    if(index === 0){
      parentDiv.className = ("carousel-item active")
    } else {
      parentDiv.className = ("carousel-item")
    }
    let im = document.createElement("img");
    im.setAttribute("src", img);
    im.className = "activity-card-image d-block w-100";
    im.setAttribute("alt", "alt text");
    //console.log(im);
    
    parentDiv.append(im);
    //console.log(parentDiv);
    let imgparent = document.getElementsByClassName("carousel-inner")[0];
    //console.log(imgparent);
    imgparent.append(parentDiv);
    //console.log(photos);
  })
  //console.log(photos);
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  //console.log(adventure);
  //console.log(adventure.available);
  if(adventure.available === true){
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-person-cost").textContent = adventure.costPerHead;
  }else {
    document.getElementById("reservation-panel-available").style.display = "none";
    document.getElementById("reservation-panel-sold-out").style.display = "block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  //console.log(adventure, persons);
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let cost = adventure.costPerHead * persons;
  document.getElementById("reservation-cost").textContent = cost;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  //console.log(adventure);
  let form = document.getElementById("myForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = {
      name: form.elements["name"].value,
      //idname: document.getElementById("myname").value,
      person: form.elements["person"].value,
      date: new Date(form.elements["date"].value),
      adventure: adventure.id,
    }

    console.log(data);

  const options = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    };

    let url = config.backendEndpoint+"/reservations/new";
  
  fetch(url, options)
  .then(data => {
      if (data.ok) {
        alert("Success!")
        location.reload();
       }
       else{
         alert("Failed!")
       }
  });

  
  
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".  
});
}


//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  console.log(adventure.reserved);
  if(adventure.reserved === true){
    document.getElementById("reserved-banner").style.display = "block";
  } else {
    document.getElementById("reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
