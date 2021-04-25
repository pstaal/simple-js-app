let pokemonRepository = (function (){
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let modalContainer = document.querySelector(".modal-dialog");

  function showDetails(pokemon) {
    console.log(pokemon);

    // var pokemonItem = e.target.parentNode;
    loadDetails(pokemon).then(function () {
      // Clear all existing modal content
      modalContainer.innerHTML = "";

      let modal = document.createElement("div");
      modal.classList.add("modal-content");

      //header
      let modalHeader = document.createElement("div");
      modalHeader.classList.add("modal-header");
      //title
      let modalTitle = document.createElement("h3");
      modalTitle.classList.add("modal-title");
      modalTitle.innerText = pokemon.name;
      //close button
      let headerButton = document.createElement("button");
      headerButton.classList.add("close");
      headerButton.setAttribute("data-dismiss", "modal");
      headerButton.setAttribute("aria-label", "close");
      headerButton.innerText = "X";

      modalHeader.appendChild(modalTitle);
      modalHeader.appendChild(headerButton);

      //body
      let modalBody = document.createElement("div");
      modalBody.classList.add("modal-body");
      //img
      let pokemonImg = document.createElement("img");
      pokemonImg.classList.add("modal-img");
      pokemonImg.classList.add("w-100");
      pokemonImg.setAttribute("src", pokemon.imageUrl);
      //height
      let heightElement = document.createElement("p");
      heightElement.innerText = `Height: ${pokemon.height}`;

      modalBody.appendChild(pokemonImg);
      modalBody.appendChild(heightElement);

      modal.appendChild(modalHeader);
      modal.appendChild(modalBody);

      modalContainer.appendChild(modal);
    });
  }
}

   function addPokemonClickEvent(button, pokemon) {
    button.addEventListener("click", () => showDetails(pokemon));
  }

  function addListItem(pokemon) {
    
    let pokemonDiv = document.querySelector(".pokemon-list");
    let newDiv = document.createElement("div");
    newDiv.classList.add("card");
    newDiv.classList.add("m-3");
    newDiv.setAttribute("style", "width: 18rem");
    let bodyDiv = document.createElement("div");
    bodyDiv.classList.add("card-body");
    let image = document.createElement("img");
    image.classList.add("card-img-top");
    image.setAttribute('src', "#");
    newDiv.appendChild(image);
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("btn");
    button.classList.add("btn-primary");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#mymodal");
    let header = document.createElement("h5");
    header.classList.add("card-title");
    header.innerText = pokemon.name;
    let paragraph = document.createElement("p");
    paragraph.classList.add("card-text");
    paragraph.innerText = "placeholder text";
    bodyDiv.appendChild(header);
    bodyDiv.appendChild(paragraph);
    bodyDiv.appendChild(button);
    newDiv.appendChild(bodyDiv);
    pokemonDiv.appendChild(newDiv);
    addPokemonClickEvent(button, pokemon);
  }

  function filterPokemon(name) {
    return pokemonList.filter((pokemon) => pokemon.name === name);
  }

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      console.log('check');
      pokemonList.push(pokemon);
    } else {
      throw new Error(
        'You can only add objects with keys "name, height and types" to the list'
      );
    }
  }

  function getAll() {
    return pokemonList;
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          console.log(item);
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          let url = pokemon.detailsUrl;
          return fetch(url).then(function (response) {
        return response.json();}).then(function (details) {
        // Now we add the details to the item
        console.log(pokemon);
        pokemon.imageUrl = details.sprites.front_default;
        console.log(pokemon);
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    });
  });
     

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  return {
    add: add,
    getAll: getAll,
    filterPokemon: filterPokemon,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };

})();

pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  console.log('check2');
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
};