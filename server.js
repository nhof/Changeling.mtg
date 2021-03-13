const http = require ('http');

const server = http.createServer((req, res)=>{
  res.end('This is my first response');
});

//Hosting Provider
server.listen(process.env.PORT || 3000);
