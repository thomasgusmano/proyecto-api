function getAnimales(dogImages) {
  return [
    {
      attributes: {
        name: "Max",
        species: "Perro",
        breed: "Labrador",
        age: "3 años",
        size: "Mediano",
        location: "Avellaneda",
        healthIssues: "Ninguno",
        surgeries: "Castrado",
        pictureThumbnailUrl: dogImages[0]
      }
    },
    {
      attributes: {
        name: "Rocky",
        species: "Perro",
        breed: "Bulldog",
        age: "10 meses",
        size: "Grande",
        location: "Quilmes",
        healthIssues: "Problemas de articulaciones",
        surgeries: "Castrado",
        pictureThumbnailUrl: dogImages[1]
      }
    },
    {
      attributes: {
        name: "Buddy",
        species: "Perro",
        breed: "Beagle",
        age: "4 años",
        size: "Mediano",
        location: "Berazategui",
        healthIssues: "Problemas de piel",
        surgeries: "Castrado",
        pictureThumbnailUrl: dogImages[2]
      }
    },
    {
      attributes: {
        name: "Luna",
        species: "Gato",
        breed: "Siamés",
        age: "8 meses",
        size: "Pequeño",
        location: "Lanús",
        healthIssues: "Alergia leve",
        surgeries: "Vacunada",
        pictureThumbnailUrl: "https://placecats.com/400/400"
      }
    }
  ];
}
