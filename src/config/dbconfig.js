import { MongoClient } from "mongodb";

export default async function conectarAoBanco(stringConexao){
    let mongoClient;
    try{
        mongoClient = new MongoClient(stringConexao);
        console.log('conectando ao cluster do banco de dados')
        await mongoClient.connect();
        console.log('conectado ao mongodbatlas com sucesso')
        return mongoClient
    }
    catch(err){
        console.error("Erro ao conectar ao MongoDB", err);
        process.exit(1);
    }
}