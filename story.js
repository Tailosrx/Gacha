document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("overlay");
  const rambiText = document.getElementById("rambi-text");
  const container = document.getElementById("rambi-container");
  const rambiNextBtn = document.getElementById("rambi-next-btn");
  const tiradasButton = document.getElementById("pull-button");
  const pointer = document.createElement("div");
  const cards = document.querySelector(".card-container");
  const part = document.getElementById("particles-js");

  // Configuración inicial de la flecha
  pointer.classList.add("pointer", "hidden");
  document.body.appendChild(pointer);

  const tutorialSteps = [
    { text: "", id: 0 },
    { text: "Necesito ayuda para que estudiemos todos los sucesos que ocurren. ¿Me ayudas?", id: 1 },
    { text: "Perfecto. Sé que fue buena idea crearte.", id: 2 },
    { text: "Aquí puedes realizar tiradas para obtener cartas. Haz clic en el cofre para probar suerte. Esta invita el Gran Nenúfar", id: 3 },
    { text: "En la 'Enciclopedia', puedes ver todas las cartas que has coleccionado.", id: 4 },
    { text: "En 'Modo Historia', vivirás aventuras increíbles. ¡Vamos a empezar!", id: 5 },
    { text: "¡Listo! Ahora puedes disfrutar de la página. ¡Diviértete!", id: 6 },
  ];


  const missions = {
    1: {
      name: "La guarida del goblin",
      description: "Explora la cueva y derrota al jefe goblin.",
      type: "battle", // Puede ser "battle", "event" o "store"
      reward: "50 oro y 1 carta rara"
    },
    2: {
      name: "El cruce de caminos",
      description: "Encuentras a un mercader misterioso.",
      type: "event",
      options: [
        { choice: "Comprar poción", effect: "Ganas una poción de salud." },
        { choice: "Robar al mercader", effect: "Ganas 30 oro, pero pierdes 10 de moral." }
      ]
    },
    3: {
      name: "Fortaleza abandonada",
      description: "Enfréntate a un enemigo poderoso.",
      type: "battle",
      reward: "100 oro y 2 cartas raras"
    }
  };

  let currentStep = 0;
  overlay.classList.remove("hidden");


// Función para avanzar al siguiente paso del tutorial
function nextTutorialStep() {
  currentStep++;

  if (currentStep < tutorialSteps.length) {
    rambiText.textContent = tutorialSteps[currentStep].text;

    if (tutorialSteps[currentStep].id === 3) {
      // Resaltamos elementos relevantes en este paso
      tiradasButton.style.display = "block";
      tiradasButton.classList.add("highlight");
      cards.classList.add("highlight");
      part.classList.add("highlight");
      container.style.left = "15%";
      container.style.marginBottom = "15%";
    } else if (tutorialSteps[currentStep - 1]?.id === 3) {
      // Ocultar el cofre después de la tirada gratuita
      tiradasButton.style.display = "none";
      tiradasButton.classList.remove("highlight");
    }
  } else {
    // Finalizar el tutorial automáticamente
    skipTutorial();
  }
}

function skipTutorial() {
  currentStep = tutorialSteps.length; 
  rambiText.textContent = ""; 

  overlay.style.display = "none";
  tiradasButton.classList.remove("highlight");
  cards.classList.remove("highlight");
  part.classList.remove("highlight");
  container.style.display = "none";

  container.style.left = "";
  container.style.marginBottom = "";

  const skipButton = document.getElementById("skipTutorial");
  skipButton.style.display = "none";
}

document.getElementById("skipTutorial").addEventListener("click", skipTutorial);
nextTutorialStep();


  // Avanzar tutorial con el botón
  rambiNextBtn.addEventListener("click", nextTutorialStep);



  function startMission(missionId) {
    const mission = missions[missionId];
    const storyText = document.getElementById("story-text");
  
    if (mission.type === "battle") {
      storyText.textContent = `¡Batalla iniciada! ${mission.description}`;
      startBattle(missionId);
    } else if (mission.type === "event") {
      storyText.textContent = `Evento: ${mission.description}`;
      showEventOptions(mission.options);
    } else if (mission.type === "store") {
      storyText.textContent = "Has llegado a una tienda. ¿Qué deseas comprar?";
      openStore();
    }
  }
  
  // Ejemplo de inicio de batalla
  function startBattle(missionId) {
    console.log(`Iniciando batalla de la misión ${missionId}`);
    // Aquí puedes llamar a tu sistema de batalla o cargar el escenario
  }
  
  // Mostrar opciones de evento
  function showEventOptions(options) {
    options.forEach(option => {
      console.log(`Opción: ${option.choice} -> ${option.effect}`);
      // Podrías renderizar botones para cada opción
    });
  }
  





});
