

function showSection(section) {
  const sections = document.querySelectorAll('main section');
  sections.forEach(sec => sec.classList.add('hidden'));

  const activeSection = document.getElementById(section);
  activeSection.classList.remove('hidden');
}

const encyclopedia = [];

let creatures = []; // Definir 'creatures' fuera de cualquier función para usarla globalmente

// Cargar el archivo JSON
function loadCards() {
  fetch("data/cards.json")
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error al cargar el JSON: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      creatures = data; // Almacena las cartas directamente en creatures
      console.log("Cartas cargadas correctamente:", creatures);
      displayCardsInEncyclopedia(); // Actualiza la enciclopedia una vez cargadas las cartas
    })
    .catch(error => {
      console.error("Error al cargar las cartas:", error);
    });
}
  

function displayCardsInEncyclopedia() {
  const encyclopediaContainer = document.querySelector(".encyclopedia-container");
  encyclopediaContainer.innerHTML = ""; // Limpiar el contenedor

  creatures.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.innerHTML = `
      <img src="${card.image}" alt="${card.name}">
      <div class="card-name">${card.name}</div>
      <div class="card-rarity">${card.rarity}</div>
    `;
    cardElement.addEventListener("click", () => showCardDetails(card));
    encyclopediaContainer.appendChild(cardElement);
  });
}

window.onload = () => {
  displayCardsInEncyclopedia();
};

function showCardDetails(creature) {
  showSection("card-details");

  // Obtener elementos de la carta
  const cardBackground = document.getElementById("card-details");
  const cardImage = document.getElementById("card-image");
  const cardName = document.getElementById("card-name");
  const cardRarity = document.getElementById("card-rarity");
  const cardCollection = document.getElementById("card-collection");
  const cardStory = document.getElementById("card-story");
  const cardCollectionCards = document.getElementById("card-collection-cards");

  // Establecer los valores de los detalles de la carta
  cardImage.src = creature.image;
  cardName.textContent = creature.name;
  cardRarity.textContent = `Rareza: ${creature.rarity.charAt(0).toUpperCase() + creature.rarity.slice(1)}`;
  cardCollection.textContent = `Colección: ${creature.collection}`;
  cardStory.textContent = creature.story;

  const rarityColors = {
    uncommon: "#8e44ad",
    rare: "#2980b9",
    epic: "red",
    legendary: "yellow",
    default: "white",
  };
  cardBackground.style.backgroundColor = rarityColors[creature.rarity] || rarityColors.default;

  // Mostrar cartas de la colección
  const collectionCards = getCardsByCollection(creature.collection);
  cardCollectionCards.innerHTML = ""; // Limpiar cartas anteriores

  collectionCards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.className = "collection-card";

    // Aplicar desenfoque si no tienes la carta
    if (!encyclopedia.some((item) => item.name === card.name)) {
      cardElement.classList.add("blurred");
      cardElement.innerHTML = `
        <img src="${card.image}" alt="${card.name}">
        <div class="collection-card-name">???</div>
      `;
      cardElement.addEventListener("click", () => {
        alert(`Esta carta se desbloquea así: ${card.unlockInfo || "Información no disponible"}`);
      });
    } else {
      cardElement.innerHTML = `
        <img src="${card.image}" alt="${card.name}">
        <div class="collection-card-name">${card.name}</div>
      `;
      cardElement.addEventListener("click", () => {
        showCardDetails(card);
      });
    }

    cardCollectionCards.appendChild(cardElement);
  });
}



function getCardsByCollection(collection) {
  return creatures.filter((creature) => creature.collection === collection);
}


// Función para seleccionar una carta aleatoria
function gachaPull() {
  const probabilities = {
    legendary: 1,
    epic: 5,
    rare: 15,
    uncommon: 30,
    common: 49,
  };

  const random = Math.random() * 100;
  let sum = 0;
  for (const [rarity, chance] of Object.entries(probabilities)) {
    sum += chance;
    if (random <= sum) {
      const filteredCreatures = creatures.filter((creature) => creature.rarity === rarity);
      return filteredCreatures[Math.floor(Math.random() * filteredCreatures.length)];
    }
  }
}


function summonCards() {
  triggerJuicyParticlesWithFadingExplosion();

  document.querySelector(".card-container").innerHTML = "";

  setTimeout(() => {
    for (let i = 0; i < 3; i++) {
      const pulledCard = gachaPull();
      if (pulledCard) {
        const cardDiv = document.createElement("div");
        cardDiv.className = `card ${pulledCard.rarity}`;
        cardDiv.innerHTML = `
          <img src="${pulledCard.image}" alt="${pulledCard.name}">
          <div class="card-name">${pulledCard.name}</div>
          <div class="card-rarity">${pulledCard.rarity.toUpperCase()}</div>
        `;
        document.querySelector(".card-container").appendChild(cardDiv);
        addToEncyclopedia(pulledCard);
      }
    }
  }, 2500);
}


function triggerJuicyParticlesWithFadingExplosion() {
  const particlesConfig = {
    particles: {
      number: { value: 200, density: { enable: true, value_area: 800 } },
      color: { value: ["#FFD700", "#FF4500", "#ADFF2F", "#00BFFF"] },
      shape: { type: ["circle", "triangle", "star"] },
      opacity: { value: 0.8, random: true },
      size: { value: 5, random: true },
      move: {
        enable: true,
        speed: 10,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "destroy"
      }
    },
    interactivity: { detect_on: "canvas" },
    retina_detect: true
  };

  // Inicializar partículas
  particlesJS("particles-js", particlesConfig);

  // Activar explosión final tras 1.5 segundos con difuminado
  setTimeout(() => {
    const explosionParticles = {
      particles: {
        number: { value: 300 },
        color: { value: ["#FF0000", "#FFFF00", "#FFFFFF"] },
        shape: { type: "circle" },
        size: { value: 8, random: true },
        opacity: {
          value: 0.8,
          anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
        },
        move: {
          enable: true,
          speed: 15,
          direction: "none",
          out_mode: "destroy",
          random: true
        }
      },
      retina_detect: true
    };

    particlesJS("particles-js", explosionParticles);

    // Gradualmente detener partículas tras 1 segundo
    setTimeout(() => {
      const fadeOutParticles = {
        particles: {
          number: { value: 0 }, // Reducir gradualmente el número de partículas
          opacity: {
            value: 0.1, // Hacerlas completamente transparentes
            anim: { enable: true, speed: 0.5, opacity_min: 0, sync: true }
          },
          size: {
            value: 0, // Reducir el tamaño progresivamente
            anim: { enable: true, speed: 1, size_min: 0, sync: true }
          }
        },
        retina_detect: true
      };
      particlesJS("particles-js", fadeOutParticles);
    }, 1000); // Sincronizar con el difuminado
  }, 1500);
}





// Añadir criatura a la enciclopedia si no está ya registrada
function addToEncyclopedia(creature) {
  if (!encyclopedia.some((item) => item.name === creature.name)) {
    encyclopedia.push(creature);
    updateEncyclopedia();
  }
}

// Actualizar enciclopedia visual
function updateEncyclopedia() {
  const container = document.querySelector(".encyclopedia-container");
  container.innerHTML = "";
  encyclopedia.forEach((creature) => {
    const card = document.createElement("div");
    card.className =` card ${creature.rarity}`;
    card.innerHTML = `
      <img src="${creature.image}" alt="${creature.name}">
      <div class="card-name">${creature.name}</div>
      <div class="card-rarity">${creature.rarity.toUpperCase()}</div>
    `;
    card.addEventListener("click", () => showCardDetails(creature));
    container.appendChild(card);
  });
}

// Inicializar partículas al cargar la página
particlesJS('particles-js', {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: "#ff4500"  
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#ffffff"
        },
        polygon: {
          nb_sides: 5
        },
        image: {
          src: "img/github.svg",
          width: 100,
          height: 100
        }
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 5,
        random: true,
        anim: {
          enable: true,
          speed: 40,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#ff4500",  // Color de las líneas entre partículas
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 6,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "repulse"
        },
        onclick: {
          enable: true,
          mode: "push"
        },
        resize: true
      }
    },
    retina_detect: true
  });

  // Acción al hacer clic en el botón
  document.getElementById('pull-button').addEventListener('click', function() {  
      // Mostrar las partículas al hacer clic
      particlesJS('particles-js', {
        particles: {
          number: {
            value: 100,  // Cambia el número de partículas
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: "#ff4500"
          },
          shape: {
            type: "circle"
          },
          opacity: {
            value: 0.5,
            random: true
          },
          size: {
            value: 3,
            random: true
          },
          line_linked: {
            enable: true,
            color: "#ff4500",
            opacity: 0.4
          },
          move: {
            enable: true,
            speed: 6,
            direction: "none"
          }
        }
        
      });
      summonCards();
    });

    window.onload = () => {
      loadCards(); // Carga las cartas al cargar la página
    };
    