import { ObjectId } from 'mongodb';

// schema que define la estructura de un documento de actor
export const Actor = {
  _id: ObjectId,
  idPelicula: String,
  nombre: String,
  edad: Number,
  estaRetirado: Boolean,
  premios: Array
};
