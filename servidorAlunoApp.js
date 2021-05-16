const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const login = require('./routes/login');
const matricula = require('./routes/matriculas');
const fotoAluno = require('./routes/imagens');
const paisAluno = require('./routes/filhos');
const videosAluno = require('./routes/videoAula');
const notification = require('./routes/pushNotification');
const financeiro = require('./routes/financeiro');
const boleto = require('./routes/boleto');
const gerarToken = require('./routes/gerarToken');
const frequencia = require('./routes/frequencia');
const presencaApp = require('./routes/presencaApp');
const alunoviu = require('./routes/alunoViu');
const cors = require('cors');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors());

app.use('/login',login);
app.use('/matricula',matricula);
app.use('/fotoAluno',fotoAluno);
app.use('/filhos',paisAluno);
app.use('/videos',videosAluno);
app.use('/notification',notification);
app.use('/financeiro',financeiro);
app.use('/boleto',boleto);
app.use('/gerarToken',gerarToken);
app.use('/frequencia',frequencia);
app.use('/presencaApp',presencaApp);
app.use('/alunoviu',alunoviu);

app.use((req,res,next)=>{
    res.send({
        error:"rota não encontrada"
    });
});



app.listen(3333,()=>{console.log('rodando na porta:3333')})