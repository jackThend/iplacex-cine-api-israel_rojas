// ------------------
// IMPORTS
// ------------------
import client from '../common/db.js'; 
import { ObjectId } from 'mongodb'; 

// ------------------
// COLECCIÓN
// ------------------

const peliculaCollection = client.db('cine-db').collection('peliculas');

// ------------------
// CONTROLADORES
// ------------------

const handleInsertPeliculaRequest = async (req, res) => {
  try {
    const nuevaPelicula = req.body; 
    const result = await peliculaCollection.insertOne(nuevaPelicula);
    res.status(201).json({ message: 'Película creada exitosamente', insertedId: result.insertedId });

    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

const handleGetPeliculasRequest = async (req, res) => {
  try {
    const peliculas = await peliculaCollection.find({}).toArray();
    res.status(200).json(peliculas);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

const handleGetPeliculaByIdRequest = async (req, res) => {
  let objectId;
  try {
    objectId = new ObjectId(req.params.id);
  } catch (error) {
    return res.status(400).json({ message: 'El ID proporcionado no es válido (Id mal formado)' });
  }

  try {
    const pelicula = await peliculaCollection.findOne({ _id: objectId });
    if (!pelicula) {
      return res.status(404).json({ message: 'Película no encontrada' });
    }
    res.status(200).json(pelicula);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

const handleUpdatePeliculaByIdRequest = async (req, res) => {
  let objectId;
  try {
    objectId = new ObjectId(req.params.id);
  } catch (error) {
    return res.status(400).json({ message: 'El ID proporcionado no es válido (Id mal formado)' });
  }

  try {
    const datosAActualizar = req.body;
    const result = await peliculaCollection.updateOne(
      { _id: objectId },
      { $set: datosAActualizar }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Película no encontrada para actualizar' });
    }

    res.status(200).json({ message: 'Película actualizada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

const handleDeletePeliculaByIdRequest = async (req, res) => {
  let objectId;
  try {
    objectId = new ObjectId(req.params.id);
  } catch (error) {
    return res.status(400).json({ message: 'El ID proporcionado no es válido (Id mal formado)' });
  }

  try {
    const result = await peliculaCollection.deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Película no encontrada para eliminar' });
    }

    res.status(200).json({ message: 'Película eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

// ------------------
// EXPORTS
// ------------------
export default {
  handleInsertPeliculaRequest,
  handleGetPeliculasRequest,
  handleGetPeliculaByIdRequest,
  handleUpdatePeliculaByIdRequest,
  handleDeletePeliculaByIdRequest,
};