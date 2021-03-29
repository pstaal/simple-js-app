let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: 'Bulbasaur',
      height: 7,
      types: ['grass', 'poison']
    },
    {
      name: 'Caterpie',
      height: 3,
      types: ['grass', 'ground']
    },
    {
      name: 'Rattata',
      height: 5,
      types: ['tackle', 'super fang']
    },
  ];

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
    if (typeof pokemon === 'object' && Object.keys(pokemon) === ['name', 'height', 'types']) {
      pokemonList.push(pokemon);
    } else {
      throw new Error('You can only add objects with keys "name, height and types" to the list')
    }
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll,
    filterPokemon: filterPokemon,
    addListItem: addListItem
  };
})();

pokemonRepository.getAll().forEach((pokemon) => {
  pokemonRepository.addListItem(pokemon);
});
