const expres = require('express');
const app=express();

app.use('/',express.static('static'));

app.listen(8080,()=>console.log('Example listening on port 8080!'));