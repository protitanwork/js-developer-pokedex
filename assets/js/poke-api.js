
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    // melhor cair no official-artwork se dream_world vier null em alguns
    pokemon.photo =
        pokeDetail.sprites.other.dream_world.front_default ||
        pokeDetail.sprites.other["official-artwork"].front_default ||
        pokeDetail.sprites.front_default;

    // detalhes extras
    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;

    pokemon.abilities = (pokeDetail.abilities || []).map(a => a.ability.name);

    pokemon.stats = (pokeDetail.stats || []).map(s => ({
        name: s.stat.name,
        value: s.base_stat
    }));

    return pokemon;
}


pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getPokemonById = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon);
};