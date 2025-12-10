
const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

document.addEventListener("DOMContentLoaded", () => {
  const random = getRandom(1, 802);
  fetchData(random);
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

  document
    .querySelector("#aquivaelpoke")
    .setAttribute("src", pokemon.sprites.front_default); //trae imagen
  document.querySelector("#aquivaelnombre").textContent = pokemon.name; // trae el nombre
  document.querySelector("#aquivaelid").textContent = pokemon.id; // trae el id del pokemon

  document.querySelector("#aquivaelstat1").textContent =
    "HP " + pokemon.stats[0].base_stat; //trae el stat de vida
  document.querySelector("#aquivaelstat2").textContent =
    "ATK " + pokemon.stats[1].base_stat; //el stat de ataque
  document.querySelector("#aquivaelstat3").textContent =
    "DEF " + pokemon.stats[2].base_stat; // el stat de defensa
  document.querySelector("#aquivalaexp").textContent =
    "EXP: " + pokemon.base_experience; // la experiencia base

  document.querySelector("#aquivaeltype1").textContent =
    pokemon.types[0].type.name; // el tipo de pokemon (hierba, veneno, volador, etc etc)

  document.querySelector("#aquivalainfo1").textContent =
    pokemon.abilities[0].ability.name; // trae la habilidad pasiva del pokemon
  document.querySelector("#aquivalainfo2").textContent =
    pokemon.abilities[1].ability.name; //trae la segunda habilidad pasiva del pokemon (si tiene)
  document.querySelector("#aquivalainfo3").textContent =
    pokemon.abilities[2].ability.name; //trae la tercera habilidad pasiva del pokemon (si tiene)

  document.querySelector("#aquivaeltype2").textContent =
    pokemon.types[1].type.name; // algunos pokemon tienen dos tipos (hierba, veneno, etc etc) si tiene la trae
};

//hiden
document.getElementById("abilities").style.display = "block";
document.getElementById("stats").style.display = "none";
document.getElementById("types").style.display = "none";
document.getElementById("expbase").style.display = "none";

const abilities = () => {
  document.getElementById("abilities").style.display = "block";
  document.getElementById("stats").style.display = "none";
  document.getElementById("types").style.display = "none";
  document.getElementById("expbase").style.display = "none";
};

const stats = () => {
  document.getElementById("abilities").style.display = "none";
  document.getElementById("stats").style.display = "block";
  document.getElementById("types").style.display = "none";
  document.getElementById("expbase").style.display = "none";
};

const types = () => {
  document.getElementById("abilities").style.display = "none";
  document.getElementById("stats").style.display = "none";
  document.getElementById("types").style.display = "block";
  document.getElementById("expbase").style.display = "none";
};

const expbase = () => {
  document.getElementById("abilities").style.display = "none";
  document.getElementById("stats").style.display = "none";
  document.getElementById("types").style.display = "none";
  document.getElementById("expbase").style.display = "block";
};

//Botones
let id = getRandom;
document.getElementById("botonizq").addEventListener("click", () => {
  if(id === 1){
    return
  }else
{  id-=1
  fetchData(id);}
}  )
document.getElementById("botonder").addEventListener("click", () => {
  if (id === 889) {
    return
  }else
{  id+=1
  fetchData(id);}
})
document.getElementById("botoncentral").addEventListener("click", () => {
  id = Math.floor(Math.random() * (889 - 1)) + 1;
  fetchData(id); 
})

