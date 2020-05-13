const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

// Iniciando aplicação 
const app = express();
// Permite a entrada de objetos com tipo JSON 
app.use(express.json());
// Utiliza o cors para liberar o acesso de origem cruzada para qualquer dominio
app.use(cors());

// Iniciando a conexão com o mongodb
mongoose.connect(
    'mongodb://localhost:27017/nodeapirocketseat', 
    { 
        useUnifiedTopology: true, 
        useNewUrlParser: true
    }
);

// Faz um require de todos os arquivos do diretório
requireDir('./src/models');

// Definindo rotas
app.use('/api', require('./src/routes'));

app.listen(3001);