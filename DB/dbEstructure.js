db.createCollection("USUARIOS", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["usuario", "contrasena", "admin"],
        properties: {
          _id: { bsonType: "objectId" },
          usuario: { bsonType: "string", minLength: 3, description: "usuario requerido (>=3 chars)" },
          contrasena: { bsonType: "string", minLength: 8, description: "contrasena requerida (>=8 chars)" },
          admin: { bsonType: "bool", description: "admin debe ser booleano" }
        }
      }
    },
    validationAction: "error",
    validationLevel: "strict"
  });
  
  // Índice recomendado
  db.USUARIOS.createIndex({ usuario: 1 }, { unique: true });
  

  db.createCollection("PELICULAS", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["title", "summary", "year", "popularity", "poster", "backdrop", "genres"],
        properties: {
          _id: { bsonType: "objectId" },
          title: { bsonType: "string", minLength: 1 },
          summary: { bsonType: "string" },
          year: { bsonType: "int", minimum: 1888, maximum: 2100 }, // rango razonable
          popularity: { bsonType: ["int","double","decimal"], minimum: 0 },
          poster: { bsonType: "string" },
          backdrop: { bsonType: "string" },
          // Acepta string o array de strings (>=1)
          genres: {
            bsonType: "array",
            items: {
              bsonType: "string",
              enum: [
                "accion",
                "action & adventure",
                "animacion",
                "aventura",
                "belica",
                "ciencia ficcion",
                "comedia",
                "crimen",
                "documental",
                "drama",
                "familia",
                "fantasia",
                "historia",
                "kids",
                "misterio",
                "musica",
                "news",
                "pelicula de tv",
                "reality",
                "romance",
                "sci-fi & fantasy",
                "soap",
                "suspense",
                "talk",
                "terror",
                "war & politics",
                "western"
              ]
            },
            uniqueItems: true,
            minItems: 1
          }
          
          
        }
      }
    },
    validationAction: "error",
    validationLevel: "strict"
  });
  
  // Índices útiles
  db.PELICULAS.createIndex({ title: "text", summary: "text", genres: "text" });
  db.PELICULAS.createIndex({ year: 1 });
  db.PELICULAS.createIndex({ popularity: -1 });

  
  db.createCollection("RESENAS", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["id_usuario", "id_pelicula", "comentario", "calificacion", "fecha"],
        properties: {
          _id: { bsonType: "objectId" },
          id_usuario: { bsonType: "objectId" },
          id_pelicula: { bsonType: "objectId" },
          comentario: { bsonType: "string", minLength: 1 },
          calificacion: { bsonType: ["int","double","decimal"], minimum: 0, maximum: 10 },
          fecha: { bsonType: "date" }
        }
      }
    },
    validationAction: "error",
    validationLevel: "strict"
  });
  
  // Un usuario solo puede reseñar una vez cada película
  db["RESENAS"].createIndex(
    { id_pelicula: 1, id_usuario: 1 },
    { unique: true }
  );
  
  // Búsquedas rápidas por película
  db["RESENAS"].createIndex({ id_pelicula: 1, fecha: -1 });
  

db.createCollection("REACCIONES", {
  validator: {
    $and: [
      {
        $jsonSchema: {
          bsonType: "object",
          required: ["id_usuario", "id_pelicula", "like", "dislike"],
          properties: {
            _id: { bsonType: "objectId" },
            id_usuario: { bsonType: "objectId" },
            id_pelicula: { bsonType: "objectId" }, // si prefieres ASCII, usa "id_resena"
            like: { bsonType: "bool" },
            dislike: { bsonType: "bool" }
          }
        }
      },
      // Regla: no permitir like && dislike simultáneamente
      { $expr: { $not: { $and: ["$like", "$dislike"] } } }
    ]
  },
  validationAction: "error",
  validationLevel: "strict"
});

// Un usuario solo puede reaccionar una vez por reseña
db["REACCIONES"].createIndex(
  { id_usuario: 1, id_reseña: 1 },
  { unique: true }
);