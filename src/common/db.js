// libreria de Mongodb
import { MongoClient, ServerApiVersion } from 'mongodb';

// obtiene la cadena de conexion exclusivamente desde las variables de entorno.
const uri = process.env.MONGODB_URI;

// si la variable de entorno no esta definida, la aplicación tira error.
if (!uri) {
  throw new Error('FATAL ERROR: La variable de entorno MONGODB_URI no está definida. La aplicación no puede iniciarse.');
}

// nuevo cliente de mongodb y configuracion
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1, 
    strict: true,
    deprecationErrors: true,
  }
});

// exportamos el cliente para poder usarlo en otras partes
export default client;
