'use strict';


/* Elementos que usamos en el HTML */
const newFormElement = document.querySelector('.js-new-form');
const listElement = document.querySelector('.js-list'); // La Ul
const searchButton = document.querySelector('.js-button-search');
const buttonAdd = document.querySelector('.js-btn-add');
const buttonCancelForm = document.querySelector('.js-btn-cancel');
const inputDesc = document.querySelector('.js-input-desc');
const inputPhoto = document.querySelector('.js-input-photo');
const inputName = document.querySelector('.js-input-name');
const inputRace = document.querySelector('.js-input-race');

const linkNewFormElememt = document.querySelector('.js-button-new-form');
const labelMessageError = document.querySelector('.js-label-error');
const input_search_desc = document.querySelector('.js_in_search_desc');
const input_search_race = document.querySelector('.js_in_search_race');

const GITHUB_USER = 'mteresacastro'; // <>?
const SERVER_URL = `https://dev.adalab.es/api/kittens/${GITHUB_USER}`;
const kittenListStored = JSON.parse(localStorage.getItem('kittensList'));

//Objetos con cada gatito

// No hace falta, se coge del servidor
/* const kittenData_1 = {
    image: "https://dev.adalab.es/gato-siames.webp",
    name: "Anastacio",
    desc: "Porte elegante, su patrón de color tan característico y sus ojos de un azul intenso, pero su historia se remonta a Asía al menos hace 500 años, donde tuvo su origen muy posiblemente.",
    race: "Siamés",
};
const kittenData_2 = {
    image: "https://dev.adalab.es/sphynx-gato.webp",
    name: "Fiona",
    desc: "Produce fascinación y curiosidad. Exótico, raro, bello, extraño… hasta con pinta de alienígena han llegado a definir a esta raza gatuna que se caracteriza por la «ausencia» de pelo.",
    race: "Sphynx",
};
const kittenData_3 = {
    image: "https://dev.adalab.es/maine-coon-cat.webp",
    name: "Sofia",
    desc: " Tienen la cabeza cuadrada y los ojos simétricos, por lo que su bella mirada se ha convertido en una de sus señas de identidad. Sus ojos son grandes y las orejas resultan largas y en punta.",
    race: "",
}; */

//const kittenDataList = [kittenData_1, kittenData_2, kittenData_3];
let kittenDataList = []; // let, se le van a cambiar los datos

// Fetch

/*fetch(SERVER_URL) // https://dev.adalab.es/api/kittens/${GITHUB_USER}
    .then((response)=> response.json()) //  response se conv a response.json() para poder manejarlo; response.json = data
    .then((data)=>{
        console.log(data); 
        kittenDataList = data.results; // ????
        console.log(kittenDataList); 
        renderKittenList(kittenDataList);
    });*/

if (kittenListStored !== null) {
    kittenDataList = kittenListStored;
    renderKittenList(kittenDataList);
    } else {
    //sino existe el listado de gatitos en el local storage
    //haz la petición al servidor
    fetch(SERVER_URL) // https://dev.adalab.es/api/kittens/${GITHUB_USER}
        .then((response)=> response.json()) //  response se conv a response.json() para poder manejarlo; response.json = data
        .then((data)=>{
            console.log(data); 
            kittenDataList = data.results; 
            localStorage.setItem('kittensList', JSON.stringify(kittenDataList));
            console.log(kittenDataList); 
            renderKittenList(kittenDataList);
    })
        .catch((error) => {
        console.error(error);
        });
    }

// Funciones

function renderKitten(kittenData) { // kittenItem = kittenData; kittenData puede ser Pepito
    console.log('kittenData');
    console.log(kittenData);
    let html = '';
    if (kittenData.race === "") {
        html = `Uy que despiste, no sabemos su raza`;
      } else {
        html = kittenData.race;
      }
 
    // crear el li
    const liElement = document.createElement('li'); 
    /* const listElement = document.querySelector('.js-list'); */

    liElement.classList.add('card');

    // crear la article
    const articleElement  = document.createElement('article'); 
    liElement.appendChild(articleElement);

    // crear la imagen
    const imgElement = document.createElement('img'); 
    imgElement.setAttribute('src', kittenData.image);
    imgElement.setAttribute('alt', 'gatito');
    articleElement.appendChild(imgElement);

    // crear el h3 de card_title
    const h3Element1 = document.createElement('h3');
    h3Element1.setAttribute('class', 'card_title');
    const textH3a = document.createTextNode(kittenData.name); 
    h3Element1.appendChild(textH3a);
    articleElement.appendChild(h3Element1);

    // crear el h3 de card_race
    const h3Element2 = document.createElement('h3');
    h3Element2.setAttribute('class', 'card_race');
    const textH3b = document.createTextNode(html); 
    h3Element2.appendChild(textH3b);
    articleElement.appendChild(h3Element2);

    // crear el párrafo
    const pElement = document.createElement('p');
    pElement.setAttribute('class', 'card_description');
    const textp = document.createTextNode(kittenData.desc); 
    pElement.appendChild(textp);
    articleElement.appendChild(pElement);
    
    return liElement;  

    /* const kitten = `<li class="card">
    <article>
      <img
        class="card_img"
        src=${kittenData.image}
        alt="gatito"
      />
      <h3 class="card_title">${kittenData.name}</h3>
      <h3 class="card_race">${html}</h3>
      <p class="card_description">
      ${kittenData.desc}
      </p>
    </article>
    </li>`; */
    // return kitten;
}

function renderKittenList(kittenDataList) {
    listElement.innerHTML = "";
    for (const kittenItem of kittenDataList) {
        console.log('kittenItem');
        console.log(kittenItem);
        // listElement.innerHTML += renderKitten(kittenItem);
        listElement.appendChild(renderKitten(kittenItem)); // kittenItem = kittenData
    }
}

//Mostrar/ocultar el formulario
function showNewCatForm() {
    newFormElement.classList.remove('collapsed');
}
function hideNewCatForm() {
    newFormElement.classList.add('collapsed');
}

function handleClickNewCatForm(event) {
    event.preventDefault();
    if (newFormElement.classList.contains('collapsed')) {
        showNewCatForm();
    } else {
        hideNewCatForm();
    }
}
//Adicionar nuevo gatito
function addNewKitten(event) {
    event.preventDefault();
    const newKittenDataObject = {
        image: inputPhoto.value, 
        name: inputName.value,
        desc: inputDesc.value,
        race: inputRace.value,
    };

    if (inputDesc.value === "" || inputPhoto.value === "" || inputName.value === "") {
        labelMessageError.innerHTML = "¡Uy! parece que has olvidado algo";
    }
    else if (inputDesc.value !== "" && inputPhoto.value !== "" && inputName.value  !== "") {
        fetch("https://dev.adalab.es/api/kittens/mteresacastro", { //cuando queremos insertar informacion
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newKittenDataObject),
        })
            .then((response)=> response.json()) 
            .then((data)=>{
                labelMessageError.innerHTML = 'Mola! Un nuevo gatito en Adalab!';
                kittenDataList.push(newKittenDataObject);
                renderKittenList(kittenDataList);
            }); 
    } 
    }

    
//Cancelar la búsqueda de un gatito
function cancelNewKitten(event) {
    event.preventDefault();
    newFormElement.classList.add("collapsed");
    inputDesc.value = "";
    inputPhoto.value = "";
    inputName.value = "";
}

//Filtrar por descripción
/*function filterKitten(event) {
    event.preventDefault();
    const descrSearchText = input_search_desc.value;
    listElement.innerHTML = "";
    for (const kittenItem of kittenDataList) {
        if (kittenItem.desc.includes(descrSearchText)) {
            listElement.innerHTML += renderKitten(kittenItem);
        }
    }
}*/

function filterKitten(event) {
    event.preventDefault();
    const kittensearchdesc = input_search_desc.value;
    const kittensearchrace = input_search_race.value;
    const kittenListFiltered = kittenDataList
        .filter((kittenItem)=>kittenItem.desc.toLowerCase().includes(kittensearchdesc.toLowerCase()))
        .filter((kittenItem)=>kittenItem.race.toLowerCase().includes(kittensearchrace.toLowerCase()));
  renderKittenList(kittenListFiltered);
  console.log(kittenListFiltered)
  }

//Mostrar el litado de gatitos en ell HTML
/* renderKittenList(kittenDataList); */
// ¿Por qué aparecería vacío?
/* porque está vacío: let kittenDataList = [] 
   se le añaden los datos en el fecth */

//Eventos
linkNewFormElememt.addEventListener("click", handleClickNewCatForm);
searchButton.addEventListener("click", filterKitten);
buttonAdd.addEventListener("click", addNewKitten);
buttonCancelForm.addEventListener("click", cancelNewKitten);






