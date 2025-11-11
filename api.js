let botonActualDeAdopcion = null; 

//OBTENER Y MOSTRAR LOS ANIMALES
function fetchAnimals() {
  return {
    data: [
      { attributes: { name: "Max", species: "Perro", breed: "Labrador", age: "3 años", size: "Mediano", location: "Avellaneda", healthIssues: "Ninguno", surgeries: "Castrado", pictureThumbnailUrl: "https://placedog.net/400/400?id=1" } },
      { attributes: { name: "Luna", species: "Gato", breed: "Siamés", age: "8 meses", size: "Pequeño", location: "Lanús", healthIssues: "Alergia leve", surgeries: "Vacunada", pictureThumbnailUrl: "https://placekitten.com/400/400" } },
      { attributes: { name: "Rocky", species: "Perro", breed: "Bulldog", age: "10 meses", size: "Grande", location: "Quilmes", healthIssues: "Problemas de articulaciones", surgeries: "Castrado", pictureThumbnailUrl: "https://placedog.net/401/401?id=2" } },
      { attributes: { name: "Mia", species: "Gato", breed: "Persa", age: "6 meses", size: "Pequeño", location: "Lomas de Zamora", healthIssues: "Ninguno", surgeries: "Vacunada", pictureThumbnailUrl: "https://placekitten.com/401/401" } },
      { attributes: { name: "Buddy", species: "Perro", breed: "Beagle", age: "4 años", size: "Mediano", location: "Berazategui", healthIssues: "Problemas de piel", surgeries: "Castrado", pictureThumbnailUrl: "https://placedog.net/402/402?id=3" } },
      { attributes: { name: "Simba", species: "Gato", breed: "Maine Coon", age: "11 meses", size: "Grande", location: "Almirante Brown", healthIssues: "Ninguno", surgeries: "Vacunado", pictureThumbnailUrl: "https://placekitten.com/402/402" } }
    ]
  };
}

function mostrarAnimales(animales) {
  const animalList = document.getElementById('animal-list'); 
  const contador = document.getElementById('contador'); 
  animalList.innerHTML = '';
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
    const { name, species, breed, age, size, location, healthIssues, surgeries, pictureThumbnailUrl } = animal.attributes;
    const card = document.createElement('div');
    card.className = 'animal-card';
    
    card.innerHTML = `
      <img src="${pictureThumbnailUrl}" alt="${name}">
      <div class="animal-info">
        <h3>${name} (${species})</h3>
        <p>Raza: ${breed}</p>
        <p>Edad: ${age}</p>
        <p>Tamaño: ${size}</p>
        <p>Ubicación: ${location}</p>
        <p>Problemas de salud: ${healthIssues}</p>
        <p>Cirugías/Tratamientos: ${surgeries}</p>
        <button class="btn btn-success" data-animal="${name}">Solicitar adopción</button>
      </div>
    `;
    animalList.appendChild(card);
  });

  document.querySelectorAll('.btn-success').forEach(btn => {
    btn.addEventListener('click', () => abrirModal(btn.dataset.animal, btn));
  });
}

//FILTRAR ANIMALES
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

//VENTANA DE SOLICITUD DE ADOPCIÓN
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

//ENVIAR SOLICITUD DE ADOPCIÓN Y CREAR TOAST (mensaje temporal)

function mostrarToast(mensaje) {
  const toast = document.getElementById('toast');
  toast.textContent = mensaje;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
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

//INICIALIZACIÓN DE LA PÁGINA
function init() {
  const animales = fetchAnimals().data;
  mostrarAnimales(animales); 


  document.getElementById('filtrar').addEventListener('click', () => {
    const filtrados = filtrarAnimales(animales);
    mostrarAnimales(filtrados);
  });

  
  document.getElementById('cerrarModal').addEventListener('click', cerrarModal);
  document.getElementById('enviarSolicitud').addEventListener('click', enviarSolicitud);
  
  document.getElementById('modal').addEventListener('click', e => {
    if (e.target.id === 'modal') cerrarModal();
  });
}

window.addEventListener('DOMContentLoaded', init);
