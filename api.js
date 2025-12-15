let botonActual = null;

async function fetchAnimals() {
  try {
    let res = await fetch("https://dog.ceo/api/breeds/image/random/11");
    let data = await res.json();
    console.log("Imágenes de perros de la API:", data.message);

    let animales = getAnimales(data.message);
    console.log("Animales combinados:", animales);

    return animales;
  } catch (err) {
    console.error("Error:", err);
    return getAnimales([]); 
  }
}

function mostrarToast(texto) {
  console.log("TOAST:", texto);
  let toast = document.getElementById("toast");
  toast.textContent = texto;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

function mostrarAnimales(animales) {
  let lista = document.getElementById("animal-list");
  let contador = document.getElementById("contador");
  lista.textContent = "";
  contador.textContent = "Se encontraron " + animales.length + " animales";

  animales.forEach(animal => {
    let a = animal.attributes;

    let card = document.createElement("div");
    card.className = "animal-card";

    let img = document.createElement("img");
    img.src = a.pictureThumbnailUrl;
    img.alt = a.name;

    let info = document.createElement("div");
    info.className = "animal-info";

    let titulo = document.createElement("h3");
    titulo.textContent = a.name + " (" + a.species + ")";
    info.appendChild(titulo);

    ["Raza: " + a.breed,
     "Edad: " + a.age,
     "Tamaño: " + a.size,
     "Ubicación: " + a.location,
     "Problemas de salud: " + a.healthIssues,
     "Cirugías/Tratamientos: " + a.surgeries
    ].forEach(t => {
      let p = document.createElement("p");
      p.textContent = t;
      info.appendChild(p);
    });

    let boton = document.createElement("button");
    boton.className = "btn btn-success";
    boton.textContent = "Solicitar adopción";
    boton.onclick = () => abrirModal(a.name, boton);

    info.appendChild(boton);
    card.appendChild(img);
    card.appendChild(info);
    lista.appendChild(card);
  });
}

function filtrarAnimales(animales) {
  let localidad = document.getElementById("localidad").value;
  let especie = document.getElementById("especie").value;
  let edadTipo = document.getElementById("edadTipo").value;
  console.log("Filtrando animales: localidad=" + localidad + ", especie=" + especie + ", edadTipo=" + edadTipo);

  return animales.filter(animal => {
    let a = animal.attributes;
    if (localidad !== "Todas" && a.location !== localidad) return false;
    if (especie !== "Todas" && a.species !== especie) return false;
    if (edadTipo === "Meses" && !a.age.includes("mes")) return false;
    if (edadTipo === "Años" && !a.age.includes("año")) return false;
    return true;
  });
}

function abrirModal(nombre, boton) {
  document.getElementById("modal").style.display = "flex";
  document.getElementById("nombreAnimal").textContent = "Adoptar a " + nombre;
  botonActual = boton;
  console.log("Abriendo modal para " + nombre);
}

function cerrarModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("nombrePersona").value = "";
  document.getElementById("contactoPersona").value = "";
  document.getElementById("mensajePersona").value = "";
  botonActual = null;
  console.log("Modal cerrado");
}

function enviarSolicitud() {
  let nombre = document.getElementById("nombrePersona").value.trim();
  let contacto = document.getElementById("contactoPersona").value.trim();
  let animal = document.getElementById("nombreAnimal").textContent.replace("Adoptar a ", "");

  if (!nombre || !contacto) {
    mostrarToast("Por favor completa tu nombre y contacto.");
    return;
  }

  if (botonActual) {
    botonActual.disabled = true;
    botonActual.textContent = "¡Solicitado!";
    botonActual.className = "btn btn-secondary";
  }

  mostrarToast(`¡Gracias ${nombre}! En breve nos contactaremos por ${animal}.`);
  console.log("Solicitud enviada por " + nombre + " para " + animal);
  cerrarModal();
}

async function init() {
  let animales = await fetchAnimals();
  mostrarAnimales(animales);

  document.getElementById("filtrar").onclick = () => mostrarAnimales(filtrarAnimales(animales));
  document.getElementById("cerrarModal").onclick = cerrarModal;
  document.getElementById("enviarSolicitud").onclick = enviarSolicitud;

  document.getElementById("modal").onclick = e => { if (e.target.id === "modal") cerrarModal(); };
  console.log("Arranque");
}

window.onload = init;
