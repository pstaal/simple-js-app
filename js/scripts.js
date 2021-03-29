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
    filterPokemon: filterPokemon
  };
})();

pokemonRepository.getAll().forEach((pokemon) => {
  if (pokemon.height >  5) {
    // hightlight the big pokemons in the list
    document.write(`<p>${pokemon.name} (height: ${pokemon.height}) Wow! this pokemon is huge!!</p> `);
  } else {
  document.write(`<p>${pokemon.name} (height: ${pokemon.height}) </p>`);
  }
});
