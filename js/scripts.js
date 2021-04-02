let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function showDetails(pokemon){
    console.log(pokemon);
  }

  function addPokemonClickEvent (button, pokemon) {
    button.addEventListener('click', () => showDetails(pokemon));
  }

  function addListItem(pokemon) {
    let unOrderedList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
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
    if (typeof pokemon === 'object') {
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

  return {
    add: add,
    getAll: getAll,
    filterPokemon: filterPokemon,
    addListItem: addListItem,
    loadList: loadList
  };
})();

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
