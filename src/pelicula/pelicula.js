import { ObjectId } from 'mongodb';

// schema que define la estructura de un documento de pelicula
export const Pelicula = {
  _id: ObjectId,
  nombre: String,
  generos: Array,
  anioEstreno: Number // en bson, 'int' se representa como 'number' en javascript
};
