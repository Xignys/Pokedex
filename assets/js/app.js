// Rango de IDs permitidos
const MIN_ID = 1;
const MAX_ID = 889; // ajusta si quieres limitar a 802 o a otra gen

// Número aleatorio inclusivo entre min y max
const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Secciones (pantallas) de info
const sections = ["abilities", "stats", "types", "expbase"];

function showSection(active) {
  sections.forEach((section) => {
    document.getElementById(section).style.display =
      section === active ? "block" : "none";
  });
}

const abilities = () => showSection("abilities");
const stats = () => showSection("stats");
const types = () => showSection("types");
const expbase = () => showSection("expbase");

// Estado global del Pokémon actual
let id = null;

// Lógica principal cuando el DOM está listo
document.addEventListener("DOMContentLoaded", () => {
  // Mostrar sección inicial
  showSection("abilities");

  // ID inicial aleatorio
  id = getRandom(MIN_ID, MAX_ID);
  fetchData(id);

  // Botones
  document.getElementById("botonizq").addEventListener("click", () => {
    if (id <= MIN_ID) return;
    id -= 1;
    fetchData(id);
  });

  document.getElementById("botonder").addEventListener("click", () => {
    if (id >= MAX_ID) return;
    id += 1;
    fetchData(id);
  });

  document.getElementById("botoncentral").addEventListener("click", () => {
    id = getRandom(MIN_ID, MAX_ID);
    fetchData(id);
  });
});

const fetchData = async (id) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    mostrarCarta(data);
  } catch (error) {
    console.log(error);
  }
};

const mostrarCarta = (pokemon) => {
  console.log(pokemon);

  // Imagen, nombre, id
  document
    .querySelector("#aquivaelpoke")
    .setAttribute("src", pokemon.sprites.front_default);
  document.querySelector("#aquivaelnombre").textContent = pokemon.name;
  document.querySelector("#aquivaelid").textContent = pokemon.id;

  // Stats (con algo de protección por si cambia el orden o faltan)
  const hp = pokemon.stats[0]?.base_stat ?? "";
  const atk = pokemon.stats[1]?.base_stat ?? "";
  const def = pokemon.stats[2]?.base_stat ?? "";

  document.querySelector("#aquivaelstat1").textContent = `HP ${hp}`;
  document.querySelector("#aquivaelstat2").textContent = `ATK ${atk}`;
  document.querySelector("#aquivaelstat3").textContent = `DEF ${def}`;

  // Exp base
  document.querySelector("#aquivalaexp").textContent =
    "EXP: " + (pokemon.base_experience ?? "");

  // Tipos (no todos tienen 2 tipos)
  const type1 = pokemon.types[0]?.type?.name ?? "";
  const type2 = pokemon.types[1]?.type?.name ?? "";

  document.querySelector("#aquivaeltype1").textContent = type1;
  document.querySelector("#aquivaeltype2").textContent = type2;

  // Habilidades (no todos tienen 3)
  const ability1 = pokemon.abilities[0]?.ability?.name ?? "";
  const ability2 = pokemon.abilities[1]?.ability?.name ?? "";
  const ability3 = pokemon.abilities[2]?.ability?.name ?? "";

  document.querySelector("#aquivalainfo1").textContent = ability1;
  document.querySelector("#aquivalainfo2").textContent = ability2;
  document.querySelector("#aquivalainfo3").textContent = ability3;
};
