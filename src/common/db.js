// libreria de MongoDB
import { MongoClient, ServerApiVersion } from 'mongodb';

const envUri = process.env.MONGODB_URI;
const defaultUser = 'eva3_express';
const defaultPass = 'CHANGE_ME';

const uri = envUri || `mongodb+srv:${'//'}${defaultUser}:${encodeURIComponent(defaultPass)}@cluster-express.dsiror4.mongodb.net/?retryWrites=true&w=majority&appName=cluster-express`;

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