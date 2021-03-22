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
  document.write(`${pokemonList[i].name} (height: ${Pokemonlist[i].height})`);
}