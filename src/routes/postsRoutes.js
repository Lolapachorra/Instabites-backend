// Importa o framework Express para criar um servidor HTTP
import express from 'express';
import multer from 'multer';
import cors from 'cors';
const corsOptions = {
    origin: 'http://localhost:8000',
    optionsSucessStatus: 200
}
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'uploads/');
    },
    filename: function(req,file, cb){
        cb(null, file.originalname);
    }
})
       
const upload = multer({dest: './uploads', storage});
import { listarPosts, listarUsuarios, postarNovoPost, uploadImagem, atualizarNovoPost } from '../controllers/postsControler.js';


const routes = (app) => {
    // Configura o Express para interpretar requisições com corpo no formato JSON
app.use(express.json());
app.use(cors(corsOptions))
// Define uma rota que retorna todos os posts da coleção "posts"
app.get('/posts', listarPosts);
app.get('/usuarios', listarUsuarios);
app.post('/posts', postarNovoPost);
app.post('/upload', upload.single('imagem'), uploadImagem)
app.put('/upload/:id',  atualizarNovoPost)
}


export default routes;