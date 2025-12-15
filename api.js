let botonActualDeAdopcion = null; 

async function fetchAnimals() {
  const dogImgResponse = await fetch("https://dog.ceo/api/breeds/image/random/3");
  const dogImages = (await dogImgResponse.json()).message;

  return {
    data: getAnimales(dogImages)
  };
}

function mostrarToast(mensaje) {
  const toast = document.getElementById('toast');
  toast.textContent = mensaje;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
} 

function mostrarAnimales(animales) {
  const animalList = document.getElementById('animal-list');
  const contador = document.getElementById('contador');

  animalList.textContent = '';
  contador.textContent = '';

  if (animales.length === 0) {
    const mensaje = document.createElement('p');
    mensaje.textContent = 'No se encontraron animales con esos filtros.';
    mensaje.className = 'no-results';
    animalList.appendChild(mensaje);
    return;
  }

  contador.textContent = `Se encontraron ${animales.length} animales`;

  animales.forEach(animal => {
    const a = animal.attributes;

    const card = document.createElement('div');
    card.className = 'animal-card';

    const img = document.createElement('img');
    img.src = a.pictureThumbnailUrl;
    img.alt = a.name;

    const info = document.createElement('div');
    info.className = 'animal-info';

    const titulo = document.createElement('h3');
    titulo.textContent = `${a.name} (${a.species})`;

    const pRaza = document.createElement('p');
    pRaza.textContent = `Raza: ${a.breed}`;

    const pEdad = document.createElement('p');
    pEdad.textContent = `Edad: ${a.age}`;

    const pTam = document.createElement('p');
    pTam.textContent = `Tamaño: ${a.size}`;

    const pLoc = document.createElement('p');
    pLoc.textContent = `Ubicación: ${a.location}`;

    const pSalud = document.createElement('p');
    pSalud.textContent = `Problemas de salud: ${a.healthIssues}`;

    const pCir = document.createElement('p');
    pCir.textContent = `Cirugías/Tratamientos: ${a.surgeries}`;

    const btn = document.createElement('button');
    btn.className = 'btn btn-success';
    btn.textContent = 'Solicitar adopción';
    btn.addEventListener('click', () => abrirModal(a.name, btn));

    info.appendChild(titulo);
    info.appendChild(pRaza);
    info.appendChild(pEdad);
    info.appendChild(pTam);
    info.appendChild(pLoc);
    info.appendChild(pSalud);
    info.appendChild(pCir);
    info.appendChild(btn);

    card.appendChild(img);
    card.appendChild(info);

    animalList.appendChild(card);
  });
}

function filtrarAnimales(animales) {
  const localidad = document.getElementById('localidad').value;
  const especie = document.getElementById('especie').value;
  const edadTipo = document.getElementById('edadTipo').value;

  return animales.filter(a => {
    const { location, species, age } = a.attributes;
    if (localidad !== 'Todas' && location !== localidad) return false;
    if (especie !== 'Todas' && species !== especie) return false;
    if (edadTipo === 'Meses' && !age.includes('mes')) return false;
    if (edadTipo === 'Años' && !age.includes('año')) return false;
    return true;
  });
}

function abrirModal(nombreAnimal, botonElemento) { 
  document.getElementById('modal').style.display = 'flex';
  document.getElementById('nombreAnimal').textContent = `Adoptar a ${nombreAnimal}`;
  botonActualDeAdopcion = botonElemento; 
}

function cerrarModal() {
  document.getElementById('modal').style.display = 'none';
  document.getElementById('nombrePersona').value = '';
  document.getElementById('contactoPersona').value = '';
  document.getElementById('mensajePersona').value = '';
  botonActualDeAdopcion = null; 
}

function enviarSolicitud() {
  const nombreAnimal = document.getElementById('nombreAnimal').textContent.replace('Adoptar a ', '');
  const nombre = document.getElementById('nombrePersona').value.trim();
  const contacto = document.getElementById('contactoPersona').value.trim();

  if (!nombre || !contacto) {
    mostrarToast("Por favor completa tu nombre y contacto.");
    return;
  }

  if (botonActualDeAdopcion) {
    botonActualDeAdopcion.disabled = true;
    botonActualDeAdopcion.textContent = "¡Solicitado!";
    botonActualDeAdopcion.classList.remove('btn-success');
    botonActualDeAdopcion.classList.add('btn-secondary');
  }

  mostrarToast(`¡Gracias ${nombre}! En breve nos contactaremos por ${nombreAnimal}.`);
  cerrarModal();
}

async function init() {
  const resultado = await fetchAnimals();
  const animales = resultado.data;

  mostrarAnimales(animales);

  document.getElementById('filtrar').addEventListener('click', () => {
    mostrarAnimales(filtrarAnimales(animales));
  });

  document.getElementById('cerrarModal').addEventListener('click', cerrarModal);
  document.getElementById('enviarSolicitud').addEventListener('click', enviarSolicitud);

  document.getElementById('modal').addEventListener('click', e => {
    if (e.target.id === 'modal') cerrarModal();
  });
}

window.addEventListener('DOMContentLoaded', init);
