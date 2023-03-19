insertPkmnName();

function insertPkmnName() {
  const newForm = document.createElement("form");
  const textInput = newForm.appendChild(document.createElement("input"));
  textInput.type = "text";
  textInput.required = "true";
  textInput.style.width = "125px";
  textInput.style.border = "none";
  textInput.style.borderRadius = "5px";
  textInput.style.padding = "5px";

  const addNewButton = document.querySelector(
    ".cardsContainer__pokeCard-custom__picture"
  );

  addNewButton.addEventListener("mousedown", () => {
    document
      .querySelector(".cardsContainer__pokeCard-custom__pokeball")
      .appendChild(newForm);
  });

  newForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addNewCard(textInput.value);
  });
}

async function addNewCard(pokemonName) {
  //get pokemon data
  const pokeData = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  )
    .then((val) => val.json())
    .catch((err) => console.error("error"));

  //get pokemon description data
  const speciesData = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${pokeData.id}/`
  )
    .then((val) => val.json())
    .catch((err) => console.log("error"));

  //set pokemon field types

  const pokeName = pokeData.name;
  const pokeSprite = pokeData.sprites.front_default;
  const pokeWeight = pokeData.weight;
  const pokeType = pokeData.types[0].type.name;
  let pokeDesc;
  let pokeRegion = speciesData.pokedex_numbers[1].pokedex.name;
  const pokeGen = speciesData.generation.name;

  //set description to english
  for (let i = 0; i < speciesData.flavor_text_entries.length; i++) {
    if (speciesData.flavor_text_entries[i].language.name === "en") {
      pokeDesc = speciesData.flavor_text_entries[i].flavor_text;
    }
  }

  //aggiusta la cazzo di regione
  if (pokeRegion.includes("original-")) {
    console.log("suca");
    pokeRegion =
      pokeRegion.split("-")[1].charAt(0).toUpperCase() +
      pokeRegion.split("-")[1].slice(1);
  } else {
    pokeRegion = pokeRegion.charAt(0).toUpperCase() + pokeRegion.slice(1);
  }

  let cardContainer = document.getElementById("cardsContainer");

  //copy pokemon card and make new one
  let addNew = document.querySelector(".cardsContainer__pokeCard-custom");
  let newCard = document.createElement("div");
  newCard.className = "cardsContainer__pokeCard";
  newCard.innerHTML = `
  <div class="cardcolumn1">
    <div class="cardsContainer__pokeCard__name">
      <h2 id="nameText">${
        pokeName.charAt(0).toUpperCase() + pokeName.slice(1)
      }</h2>
    </div>

    <div class="cardsContainer__pokeCard__picture">
      <img
        id="pokeImg"
        src=${pokeSprite}
        alt=""
      />
    </div>

    <div class="cardsContainer__pokeCard__weight">
      <div>Weight:</div>
      <div id="weightText">${pokeWeight}</div>
    </div>

    <div class="cardsContainer__pokeCard__type">
      <div>Type:</div>
      <div id="typeText">${pokeType}</div>
    </div>
  </div>

  <div class="cardcolumn2">
    <div class="cardsContainer__pokeCard__pokeball">
      <img src="images/pokeball.png" alt="" />
    </div>

    <div class="cardsContainer__pokeCard__description">
      <div id="descText">${pokeDesc.replace(/[]/g, " ")}</div>
    </div>

    <div class="cardsContainer__pokeCard__region">
      <div>Region:</div>
      <div id="regionText">${pokeRegion}</div>
    </div>

    <div class="cardsContainer__pokeCard__generation">
      <div>Generation</div>
      <div id="genText">${pokeGen.split("-")[1].toUpperCase()}</div>
    </div>
  </div>`;

  //add new card to layout before addnew
  cardContainer.insertBefore(newCard, addNew);
}
