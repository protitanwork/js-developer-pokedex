const container = document.getElementById("pokemonDetails");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

function renderDetails(pokemon) {
  container.innerHTML = `
    <div class="pokemon ${pokemon.type}" style="border-radius: 1rem; padding: 1rem;">
      <span class="number">#${pokemon.number}</span>
      <h1 class="name" style="text-transform: capitalize; margin: .5rem 0;">
        ${pokemon.name}
      </h1>

      <div class="detail">
        <ol class="types">
          ${pokemon.types.map((t) => `<li class="type ${t}">${t}</li>`).join("")}
        </ol>

        <img src="${pokemon.photo}" alt="${pokemon.name}">
      </div>

      <hr style="opacity:.2; margin: 1rem 0;" />

      <div>
        <p><strong>Altura:</strong> ${pokemon.height ?? "—"}</p>
        <p><strong>Peso:</strong> ${pokemon.weight ?? "—"}</p>

        <p><strong>Habilidades:</strong></p>
        <ul>
          ${(pokemon.abilities ?? []).map(a => `<li>${a}</li>`).join("") || "<li>—</li>"}
        </ul>

        <p><strong>Status:</strong></p>
        <ul>
          ${(pokemon.stats ?? []).map(s => `<li>${s.name}: ${s.value}</li>`).join("") || "<li>—</li>"}
        </ul>
      </div>
    </div>
  `;
}

async function init() {
  if (!id) {
    container.innerHTML = "Faltou o id na URL. Ex: details.html?id=25";
    return;
  }

  try {
    const pokemon = await pokeApi.getPokemonById(id);
    renderDetails(pokemon);
  } catch (err) {
    console.error(err);
    container.innerHTML = "Erro ao carregar o Pokémon. Veja o console.";
  }
}

init();
