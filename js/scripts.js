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


for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height >  5) {
    // hightlight the big pokemons in the list
    document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height}) Wow! this pokemon is huge!! `);
  } else {
  document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height}) `);
  }
}