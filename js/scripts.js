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

pokemonList.forEach((pokemon) => {
  if (pokemon.height >  5) {
    // hightlight the big pokemons in the list
    document.write(`<p>${pokemon.name} (height: ${pokemon.height}) Wow! this pokemon is huge!!</p> `);
  } else {
  document.write(`<p>${pokemon.name} (height: ${pokemon.height}) </p>`);
  }
});
