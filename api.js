const http = require('http');
var n=0
infohttp=JSON.stringify({...info})
const requestListener = function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(infohttp);
}

const server = http.createServer(requestListener);
server.listen(80);
