const API_BASE = "https://rickandmortyapi.com/api/character";

const searchInput = document.getElementById("searchInput");
const statusSelect = document.getElementById("statusSelect");
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");
const resultInfo = document.getElementById("resultInfo");
const cardsContainer = document.getElementById("cardsContainer");
const emptyState = document.getElementById("emptyState");

let state = {
  page: 1,
  totalPages: 1,
  totalResults: 0,
  name: "",
  status: "",
};

function buildUrl() {
  const params = new URLSearchParams();

  params.set("page", String(state.page));
  if (state.name) params.set("name", state.name);
  if (state.status) params.set("status", state.status);

  return `${API_BASE}?${params.toString()}`;
}

function getStatusClass(status) {
  const normalized = status.toLowerCase();
  if (normalized === "alive") return "badge badge--alive";
  if (normalized === "dead") return "badge badge--dead";
  return "badge badge--unknown";
}

function clearCards() {
  cardsContainer.innerHTML = "";
}

function createCharacterCard(character) {
  const card = document.createElement("article");
  card.className = "card";

  const image = document.createElement("img");
  image.className = "card__image";
  image.src = character.image;
  image.alt = `Personagem ${character.name}`;

  const body = document.createElement("div");
  body.className = "card__body";

  const name = document.createElement("h3");
  name.className = "card__name";
  name.textContent = character.name;

  const meta = document.createElement("p");
  meta.className = "card__meta";
  meta.textContent = `${character.species} - ${character.gender}`;

  const badge = document.createElement("span");
  badge.className = getStatusClass(character.status);
  badge.textContent = `Status: ${character.status}`;

  body.appendChild(name);
  body.appendChild(meta);
  body.appendChild(badge);
  card.appendChild(image);
  card.appendChild(body);

  return card;
}

function renderCards(characters) {
  clearCards();

  if (!characters.length) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;
  characters.forEach((character) => {
    const card = createCharacterCard(character);
    cardsContainer.appendChild(card);
  });
}

function updatePaginationControls() {
  pageInfo.textContent = `Pagina ${state.page} de ${state.totalPages}`;
  prevBtn.disabled = state.page <= 1;
  nextBtn.disabled = state.page >= state.totalPages;
}

async function loadCharacters() {
  resultInfo.textContent = "Carregando dados da API...";

  try {
    const response = await fetch(buildUrl());
    if (!response.ok) {
      throw new Error(`Erro HTTP ${response.status}`);
    }

    const data = await response.json();

    state.totalPages = data.info?.pages || 1;
    state.totalResults = data.info?.count || 0;
    resultInfo.textContent = `${state.totalResults} personagens encontrados`;
    renderCards(data.results || []);
  } catch {
    state.totalPages = 1;
    state.totalResults = 0;
    resultInfo.textContent = "Nao foi possivel carregar personagens para esse filtro";
    renderCards([]);
  } finally {
    updatePaginationControls();
  }
}

function applyFilters() {
  state.name = searchInput.value.trim();
  state.status = statusSelect.value;
  state.page = 1;
  loadCharacters();
}

searchBtn.addEventListener("click", applyFilters);
resetBtn.addEventListener("click", () => {
  searchInput.value = "";
  statusSelect.value = "";
  state.name = "";
  state.status = "";
  state.page = 1;
  loadCharacters();
});

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    applyFilters();
  }
});

prevBtn.addEventListener("click", () => {
  if (state.page <= 1) return;
  state.page -= 1;
  loadCharacters();
});

nextBtn.addEventListener("click", () => {
  if (state.page >= state.totalPages) return;
  state.page += 1;
  loadCharacters();
});

loadCharacters();
