let botonActual = null;

async function fetchAnimals() {
  let res = await fetch("https://dog.ceo/api/breeds/image/random/11");
  let data = await res.json();

  console.log("Imágenes API:", data.message.length);

  let animales = getAnimales(data.message);
  console.log("Animales:", animales.length);

  return animales;
}

function mostrarToast(texto) {
  let toast = document.getElementById("toast");
  toast.textContent = texto;
  toast.classList.add("show");

  setTimeout(function () {
    toast.classList.remove("show");
  }, 3000);
}

function crearParrafo(clase, texto) {
  let p = document.createElement("p");
  p.className = clase;
  p.textContent = texto;
  return p;
}

function mostrarAnimales(animales) {
  let lista = document.getElementById("animal-list");
  let contador = document.getElementById("contador");

  lista.innerHTML = "";
  contador.textContent = "Se encontraron " + animales.length + " animales";

  animales.forEach(function (animal) {

    let card = document.createElement("div");
    card.className = "animal-card";

    let img = document.createElement("img");
    img.className = "animal-img";
    img.src = animal.pictureThumbnailUrl;
    img.alt = animal.name;

    let nombre = document.createElement("h3");
    nombre.className = "animal-name";
    nombre.textContent = animal.name;

    let boton = document.createElement("button");
    boton.className = "animal-adopt-btn btn btn-primary";
    boton.textContent = "Adoptar";
    boton.onclick = function () {
      abrirModal(animal.name, boton);
    };

    card.appendChild(img);
    card.appendChild(nombre);
    card.appendChild(crearParrafo("animal-breed", animal.breed));
    card.appendChild(crearParrafo("animal-age", animal.age));
    card.appendChild(crearParrafo("animal-size", animal.size));
    card.appendChild(crearParrafo("animal-location", animal.location));
    card.appendChild(crearParrafo("animal-health", animal.healthIssues));
    card.appendChild(crearParrafo("animal-surgeries", animal.surgeries));
    card.appendChild(boton);

    lista.appendChild(card);
  });
}

function filtrarAnimales(animales) {
  let localidad = document.getElementById("localidad").value;
  let edadTipo = document.getElementById("edadTipo").value;

  let resultado = animales.filter(function (animal) {
    if (localidad !== "Todas" && animal.location !== localidad) return false;
    if (edadTipo === "Meses" && animal.age.indexOf("mes") === -1) return false;
    if (edadTipo === "Años" && animal.age.indexOf("año") === -1) return false;
    return true;
  });

  return resultado;
}

function abrirModal(nombre, boton) {
  document.getElementById("modal").style.display = "flex";
  document.getElementById("nombreAnimal").textContent = "Adoptar a " + nombre;
  botonActual = boton;
}

function cerrarModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("nombrePersona").value = "";
  document.getElementById("contactoPersona").value = "";
  document.getElementById("mensajePersona").value = "";
  botonActual = null;
}

function enviarSolicitud() {
  let nombre = document.getElementById("nombrePersona").value.trim();
  let contacto = document.getElementById("contactoPersona").value.trim();
  let animal = document
    .getElementById("nombreAnimal")
    .textContent.replace("Adoptar a ", "");

  if (!nombre || !contacto) {
    mostrarToast("Por favor completa tu nombre y contacto.");
    return;
  }

  if (botonActual) {
    botonActual.disabled = true;
    botonActual.textContent = "¡Solicitado!";
    botonActual.className = "btn btn-secondary";
  }

  mostrarToast("¡Gracias " + nombre + "! Nos contactaremos por " + animal + ".");
  cerrarModal();
}

async function init() {
  let animales = await fetchAnimals();
  mostrarAnimales(animales);

  document.getElementById("filtrar").onclick = function () {
    mostrarAnimales(filtrarAnimales(animales));
  };

  document.getElementById("cerrarModal").onclick = cerrarModal;
  document.getElementById("enviarSolicitud").onclick = enviarSolicitud;

  document.getElementById("modal").onclick = function (e) {
    if (e.target.id === "modal") cerrarModal();
  };
}

window.onload = init;
