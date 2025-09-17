// ------------------
// IMPORTS
// ------------------
import client from '../common/db.js';
import { ObjectId } from 'mongodb';

// ------------------
// COLECCIONES
// ------------------
const actorCollection = client.db('cine-db').collection('actores');
const peliculaCollection = client.db('cine-db').collection('peliculas');

// ------------------
// CONTROLADORES
// ------------------
const handleInsertActorRequest = async (req, res) => {
  try {
    const nuevoActor = req.body;

    if (!nuevoActor.idPelicula) {
      return res.status(400).json({ message: 'El campo idPelicula es requerido.' });
    }

    let peliculaObjectId;
    try {
      peliculaObjectId = new ObjectId(nuevoActor.idPelicula);
    } catch(error) {
      return res.status(400).json({ message: 'El formato de idPelicula no es válido.' });
    }

    // buscamos si la película existe en la colección de películas
    const peliculaExistente = await peliculaCollection.findOne({ _id: peliculaObjectId });

    if (!peliculaExistente) {
      // si la película no existe, devolvemos un error y no insertamos el actor
      return res.status(404).json({ message: 'La película con el ID proporcionado no existe.' });
    }

    const result = await actorCollection.insertOne(nuevoActor);
    res.status(201).json({ message: 'Actor creado exitosamente', insertedId: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

const handleGetActoresRequest = async (req, res) => {
  try {
    const actores = await actorCollection.find({}).toArray();
    res.status(200).json(actores);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

const handleGetActorByIdRequest = async (req, res) => {
  let objectId;
  try {
    objectId = new ObjectId(req.params.id);
  } catch (error) {
    return res.status(400).json({ message: 'El ID proporcionado no es válido (Id mal formado)' });
  }

  try {
    const actor = await actorCollection.findOne({ _id: objectId });
    if (!actor) {
      return res.status(404).json({ message: 'Actor no encontrado' });
    }
    res.status(200).json(actor);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

const handleGetActoresByPeliculaIdRequest = async (req, res) => {
  try {

    const peliculaId = req.params.pelicula; 


    const actores = await actorCollection.find({ idPelicula: peliculaId }).toArray();

    res.status(200).json(actores);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

// ------------------
// EXPORTS
// ------------------
export default {
  handleInsertActorRequest,
  handleGetActoresRequest,
  handleGetActorByIdRequest,
  handleGetActoresByPeliculaIdRequest,
};              