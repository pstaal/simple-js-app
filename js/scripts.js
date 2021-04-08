let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');

  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

  function showDetails(pokemon){
    loadDetails(pokemon).then(function () {
      // Clear all existing modal content
      modalContainer.innerHTML = '';

      let modal = document.createElement('div');
      modal.classList.add('modal');

      // Add the new modal content
      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'X';
      closeButtonElement.addEventListener('click', hideModal);

      let myImage = document.createElement('img');
      myImage.src = pokemon.imageUrl;

      let titleElement = document.createElement('h1');
      titleElement.innerText = pokemon.name;

      let contentElement = document.createElement('p');
      contentElement.innerText = `Height: ${pokemon.height}`;

      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modal.appendChild(myImage);
      modalContainer.appendChild(modal);

      modalContainer.classList.add('is-visible');
        });
  }

  function addPokemonClickEvent (button, pokemon) {
    button.addEventListener('click', () => showDetails(pokemon));
  }



  function showLoadingMessage() {
    let unOrderedList = document.querySelector('.pokemon-list');
    let loadMessageElement = document.createElement('div');
    loadMessageElement.innerText= "Waiting for data to load!"
    unOrderedList.appendChild(loadMessageElement);
  }

  function hideLoadingMessage() {
    let elementToRemove = document.querySelector('.pokemon-list > div');
    if (elementToRemove) {
      elementToRemove.remove();
    }
  }

  function addListItem(pokemon) {
    let unOrderedList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    listItem.classList.add("group-list-item");
    let button = document.createElement('button')
    button.innerText = pokemon.name;
    addPokemonClickEvent(button, pokemon);
    button.classList.add('highlighted');
    listItem.appendChild(button);
    unOrderedList.appendChild(listItem);
  }

  function filterPokemon(name) {
    return pokemonList.filter(pokemon => pokemon.name === name)
  }

  function add(pokemon) {
    if (typeof pokemon === 'object' && "name" in pokemon && "detailsUrl" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      throw new Error('You can only add objects with keys "name, height and types" to the list')
    }
  }

  function getAll() {
    return pokemonList;
  }

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        hideLoadingMessage();
      });
    }).catch(function (e) {
      console.error(e);
      hideLoadingMessage();
    })
  }

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      hideLoadingMessage();
    }).catch(function (e) {
      console.error(e);
      hideLoadingMessage();
    });
  }

  window.addEventListener('keydown', (e) => {
    
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
  });

  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  return {
    add: add,
    getAll: getAll,
    filterPokemon: filterPokemon,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
