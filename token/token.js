const jwt = require('jsonwebtoken');
const tokenNumberserver = 'h4656j4gdh56fh4k5h4fg564jk56kj4sg56j4ç56ç454545u6yt4gh56k4li54df54gh5g6ntdsoftaluno456456j4564gf54gfh4gf56h4gf65k45gh45mj4h5tg4f54fghj65g4sd56';

exports.altenticarToken = (req,res,next)=>{
    try {
        const  decode = jwt.verify(req.params.token || req.body.token || req.headers.token || req.query.token,tokenNumberserver);
        req.token = decode;
        next();
    } catch (error) {
        return res.status(401).json({
            mensagem:'falha na autenticação',
            error:'token errado ou não informado'
        });
    }
    
}

exports.createToken = (e = {})=>{
    var token = jwt.sign(e, tokenNumberserver, {
        expiresIn: "365d" // expires in 1  ano
    });
    return token;
}

