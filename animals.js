async function fetchAnimals() {
  let res = await fetch("https://dog.ceo/api/breeds/image/random/11");
  let data = await res.json();

  let animales = getAnimales(data.message);
  return animales;
}


function getAnimales(dogImages) {
  return [
    {
      name: "Max",
      breed: "Labrador",
      age: "3 años",
      size: "Mediano",
      location: "Avellaneda",
      healthIssues: "Ninguno",
      surgeries: "Castrado",
      pictureThumbnailUrl: dogImages[0]
    },
    {
      name: "Rocky",
      breed: "Bulldog",
      age: "10 meses",
      size: "Grande",
      location: "Quilmes",
      healthIssues: "Problemas de articulaciones",
      surgeries: "Castrado",
      pictureThumbnailUrl: dogImages[1]
    },
    {
      name: "Buddy",
      breed: "Beagle",
      age: "4 años",
      size: "Mediano",
      location: "Berazategui",
      healthIssues: "Problemas de piel",
      surgeries: "Castrado",
      pictureThumbnailUrl: dogImages[2]
    },
    {
      name: "Charlie",
      breed: "Golden Retriever",
      age: "2 años",
      size: "Grande",
      location: "Avellaneda",
      healthIssues: "Ninguno",
      surgeries: "Castrado",
      pictureThumbnailUrl: dogImages[3]
    },
    {
      name: "Duke",
      breed: "Rottweiler",
      age: "5 años",
      size: "Grande",
      location: "Avellaneda",
      healthIssues: "Problemas dentales",
      surgeries: "Castrado",
      pictureThumbnailUrl: dogImages[4]
    },
    {
      name: "Bella",
      breed: "Pitbull",
      age: "3 años",
      size: "Mediano",
      location: "Lanús",
      healthIssues: "Sobrepeso",
      surgeries: "Castrada",
      pictureThumbnailUrl: dogImages[5]
    },
    {
      name: "Coco",
      breed: "Chihuahua",
      age: "1 año",
      size: "Pequeño",
      location: "Quilmes",
      healthIssues: "Ninguno",
      surgeries: "Castrado",
      pictureThumbnailUrl: dogImages[6]
    },
    {
      name: "Toby",
      breed: "Dachshund",
      age: "6 años",
      size: "Pequeño",
      location: "Lomas de Zamora",
      healthIssues: "Problemas de movilidad",
      surgeries: "Castrado",
      pictureThumbnailUrl: dogImages[7]
    },
    {
      name: "Jack",
      breed: "Jack Russell Terrier",
      age: "2 años",
      size: "Mediano",
      location: "Ezeiza",
      healthIssues: "Ninguno",
      surgeries: "Castrado",
      pictureThumbnailUrl: dogImages[8]
    },
    {
      name: "Zoe",
      breed: "Poodle",
      age: "4 años",
      size: "Mediano",
      location: "Florencio Varela",
      healthIssues: "Alergia",
      surgeries: "Castrada",
      pictureThumbnailUrl: dogImages[9]
    },
    {
      name: "Milo",
      breed: "Cocker Spaniel",
      age: "7 meses",
      size: "Mediano",
      location: "Almirante Brown",
      healthIssues: "Ninguno",
      surgeries: "Castrado",
      pictureThumbnailUrl: dogImages[10]
    }
  ];
}
