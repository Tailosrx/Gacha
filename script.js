// Cartas disponibles
const creatures = [
  { name: "Cristal", rarity: "legendary", image: "assets/cristal.png" },
  { name: "Lolo", rarity: "epic", image: "assets/lolo.png" },
  { name: "Misterio", rarity: "rare", image: "assets/misterio.png" },
  { name: "Lily", rarity: "legendary", image: "assets/lily.jpg" },
  { name: "Waxy", rarity: "common", image: "assets/goblin.png" },
  { name: "Tarko", rarity: "uncommon", image: "assets/tarko.png" },
  { name: "Will", rarity: "uncommon", image: "assets/will.png" },
  { name: "Eustaquio", rarity: "common", image: "assets/draco.png" },
];

const encyclopedia = []; // Para registrar cartas obtenidas

// Cambiar de sección
function showSection(sectionId) {
  const sections = document.querySelectorAll('main > section');
  sections.forEach((section) => section.classList.add('hidden'));

  const selectedSection = document.getElementById(sectionId);
  selectedSection.classList.remove('hidden');
}

// Función para tirar 3 cartas
function summonCards() {
  const cardContainer = document.querySelector(".card-container");
  cardContainer.innerHTML = "";

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * creatures.length);
    const selectedCreature = creatures[randomIndex];

    // Crear carta
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${selectedCreature.image}" alt="${selectedCreature.name}" class="card-image">
      <p class="card-name">${selectedCreature.name}</p>
      <p class="card-rarity ${selectedCreature.rarity}">${selectedCreature.rarity.toUpperCase()}</p>
    `;

    cardContainer.appendChild(card);

    // Añadir a la enciclopedia si no está
    if (!encyclopedia.some((item) => item.name === selectedCreature.name)) {
      encyclopedia.push(selectedCreature);
    }
  }

  updateEncyclopedia();
}

// Actualizar enciclopedia
function updateEncyclopedia() {
  const encyclopediaContainer = document.querySelector(".encyclopedia-container");
  encyclopediaContainer.innerHTML = "";

  encyclopedia.forEach((creature) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${creature.image}" alt="${creature.name}" class="card-image">
      <p class="card-name">${creature.name}</p>
      <p class="card-rarity ${creature.rarity}">${creature.rarity.toUpperCase()}</p>
    `;
    encyclopediaContainer.appendChild(card);
  });
}

// Modo historia
let currentLevel = 1;

const storyData = [
  {
    chapter: 1,
    narrative: ["Te despiertas en un mundo caótico.", "Un dragón amenaza la aldea."],
    reward: { name: "Fénix", rarity: "epic", image: "phoenix.png" },
  },
  {
    chapter: 2,
    narrative: ["Los aldeanos te agradecen.", "Debes enfrentar a un espectro en la montaña."],
    reward: { name: "Espectro Sombrío", rarity: "uncommon", image: "shadow-specter.png" },
  },
  {
    chapter: 3,
    narrative: ["El destino te lleva al templo final.", "La bestia legendaria aguarda."],
    reward: { name: "Dragón de Fuego", rarity: "legendary", image: "dragon-fire.png" },
  },
];

function startLevel(level) {
  if (level > currentLevel) {
    alert("Este capítulo está bloqueado.");
    return;
  }

  const story = storyData.find((s) => s.chapter === level);
  if (!story) return;

  document.getElementById("story-text").textContent = story.narrative[0];
  document.getElementById("map").classList.add("hidden");
  document.getElementById("story-content").classList.remove("hidden");

  story.currentStep = 0;
}

function nextChallenge() {
  const story = storyData.find((s) => s.chapter === currentLevel);
  if (!story) return;

  story.currentStep++;
  if (story.currentStep < story.narrative.length) {
    document.getElementById("story-text").textContent = story.narrative[story.currentStep];
  } else {
    alert(`Capítulo completado. Has ganado: ${story.reward.name}`);
    addToEncyclopedia(story.reward);

    currentLevel++;
    document.querySelectorAll(".level")[currentLevel - 1].classList.remove("locked");

    document.getElementById("map").classList.remove("hidden");
    document.getElementById("story-content").classList.add("hidden");
  }
}

function addToEncyclopedia(creature) {
  if (!encyclopedia.some((item) => item.name === creature.name)) {
    encyclopedia.push(creature);
    updateEncyclopedia();
  }
}
