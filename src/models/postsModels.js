import 'dotenv/config'
// src/services/dbService.js
import { ObjectId } from 'mongodb';
import conectarAoBanco from '../config/dbconfig.js'; // Função para conexão com o banco de dados MongoDB

// Conecta ao banco de dados MongoDB usando a string de conexão definida em uma variável de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);



// Função para obter todos os posts
export async function getTodosOsPosts() {
    try{
    const db = conexao.db('imersao-instabits');
    const colecao = db.collection('posts');
    return colecao.find().toArray();
    } catch(error) {
        console.error('Erro ao buscar posts:', error);
        throw error;
    }
}

// Função para obter todos os usuários
export async function getTodosUsuarios() {
    try{
    const db = conexao.db('imersao-instabits');
    const colecao = db.collection('usuarios');
    return colecao.find().toArray();
    } catch(error) {
        console.error('Erro ao buscar usuários:', error);
        throw error;
    }
    	
}
export async function createPost(novoPost){
    const db = conexao.db('imersao-instabits');
    const colecao = db.collection('posts');
    return colecao.insertOne(novoPost)
}
export async function atualizarPost(id, novoPost){
    const db = conexao.db('imersao-instabits');
    const colecao = db.collection('posts');
     const objId = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objId)}, {$set:novoPost})
}


// Exportação padrão da conexão, se necessário
export default conexao
