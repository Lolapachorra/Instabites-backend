// Importa o framework Express para criar um servidor HTTP
import express from 'express';
import routes from './src/routes/postsroutes.js';
// Cria uma instância do aplicativo Express
const app = express();
app.use(express.static('uploads'))
routes(app)


// Define a porta onde o servidor irá rodar
const port = 3001;


// Inicia o servidor na porta definida
app.listen(port, () => {

    console.log(`Server is running on port ${port}`);
});



// Função assíncrona que obtém todos os posts da coleção "posts" no banco de dados
