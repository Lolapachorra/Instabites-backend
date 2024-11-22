import fs from 'fs';
import  {atualizarPost, createPost, getTodosOsPosts, getTodosUsuarios } from "../models/postsmodels.js";
import gerarDescricaoComGemini from '../services/geminiService.js';

export async function listarPosts(req, res) {
    try{
    // Chama a função para buscar os posts do banco de dados
    const posts = await getTodosOsPosts();
    // Retorna os posts encontrados em formato JSON
    res.status(200).json(posts);
    }
    catch(err){
        console.error('Erro ao listar os posts', err);
        res.status(500).json({message: 'Erro ao listar os posts'});
    }
    } 
    
export async function listarUsuarios(req, res){
    try{
  // Chama a função para buscar os posts do banco de dados
  const usuarios = await getTodosUsuarios();
  // Retorna os posts encontrados em formato JSON
  res.status(200).json(usuarios);
    }
    catch(err){
        console.error('Erro ao listar os usuarios', err);
        res.status(500).json({message: 'Erro ao listar os usuarios'});
    }
}

export async function postarNovoPost(req,res){
    const novoPost = req.body;
    try{
      const postCriado = await createPost(novoPost)

      res.status(201).json(postCriado);
    }
    catch(err){
        console.error('Erro ao postar novo post', err.message);
        res.status(500).json({message: 'Erro ao postar novo post'});
    }
}

export async function uploadImagem(req,res){
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    }
   
    try{
      const postCriado = await createPost(novoPost)
      const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
      fs.renameSync(req.file.path, imagemAtualizada)

      res.status(201).json(postCriado);
    }
    catch(err){
        console.error('Erro ao postar novo post', err.message);
        res.status(500).json({"error": "falha na requisição"});
    }
}

export async function atualizarNovoPost(req,res){
    const id = req.params.id;
    const urlImagem = `http://localhost:3001/${id}.png`
  
   
    
   
    try{
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imgBuffer)

        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }

      const postCriado = await atualizarPost(id, post)
   
    
      res.status(200).json(postCriado);
    }
    catch(err){
        console.error('Erro ao postar novo post', err.message);
        res.status(500).json({message: 'Erro ao postar novo post'});
    }
}