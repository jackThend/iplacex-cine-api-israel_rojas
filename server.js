import express from 'express';
import cors from 'cors';
import client from './src/common/db.js';
import peliculaRoutes from './src/pelicula/routes.js';
import actorRoutes from './src/actor/routes.js';

// configuracion
const app = express();
const PORT = process.env.PORT || 4000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// funcion principal para iniciar el servidor
const startServer = async () => {
  try {
    // conectar al cliente de mongodb
    await client.connect();
    console.log('✅ conexion a mongodb atlas establecida correctamente.');

    // rutas
    app.get('/', (req, res) => {
      res.json('bienvenido al cine iplacex');
    });

    app.use('/api', peliculaRoutes);
    app.use('/api', actorRoutes);

    // iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 servidor corriendo en http://localhost:${PORT}`);
    });

  } catch (error) {
    // manejo de errores de conexion a la base de datos
    console.error('❌ error al conectar con mongodb atlas:', error);
    process.exit(1); // detiene la aplicacion si no se puede conectar a la db
  }
};

// ejecutar servidor
startServer();
