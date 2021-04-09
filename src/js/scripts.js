let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('.modal-dialog');

  

  function showDetails(pokemon){
    loadDetails(pokemon).then(function () {
      // Clear all existing modal content
      modalContainer.innerHTML = '';

      let modal = document.createElement('div');
      modal.classList.add('modal-content');
      
      //header
      let modalHeader = document.createElement('div');
      modalHeader.classList.add('modal-header');
      //title
      let modalTitle = document.createElement('h3');
      modalTitle.classList.add('modal-title');
      modalTitle.innerText = pokemon.name;
      //close button
      let headerButton = document.createElement('button');
      headerButton.classList.add('close');
      headerButton.setAttribute('data-dismiss', 'modal');
      headerButton.setAttribute('aria-label', 'close');
      headerButton.innerText = 'X';

      modalHeader.appendChild(modalTitle);
      modalHeader.appendChild(headerButton);

      //body
      let modalBody = document.createElement('div');
      modalBody.classList.add('modal-body');
      //img
      let pokemonImg = document.createElement('img');
      pokemonImg.classList.add('modal-img');
      pokemonImg.classList.add('w-100');
      pokemonImg.setAttribute('src', pokemon.imageUrl);
      //height
      let heightElement = document.createElement('p');
      heightElement.innerText = `Height: ${pokemon.height}`;
      
      modalBody.appendChild(pokemonImg);
      modalBody.appendChild(heightElement);

      modal.appendChild(modalHeader);
      modal.appendChild(modalBody);
      modalContainer.appendChild(modal);
      
        });
  }

  function addPokemonClickEvent (button, pokemon) {
    button.addEventListener('click', () => showDetails(pokemon));
  }


  function addListItem(pokemon) {
    let pokemonDiv = document.querySelector('.pokemon-list');
    let newDiv = document.createElement('div');
    newDiv.classList.add('w-25');
    newDiv.classList.add('mb-1');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    addPokemonClickEvent(button, pokemon);
    button.classList.add('group-list-item');
    button.classList.add('text-center');
    button.classList.add('list-group-item-action');
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "mymodal")
    newDiv.appendChild(button);
    pokemonDiv.appendChild(newDiv);
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
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

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
