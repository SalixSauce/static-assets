const http = require('http');
const fs = require("fs");

function getContentType(filename){
  const ext = filename.split('.')[1];
  let contentType = 'text/plain';

  switch (ext) {
    case 'jpg':
    case 'jpeg':
      contentType = 'image/jpeg'
      break;
    case 'png':
      contentType: 'image/png';
      break;
    case 'css':
      contentType = 'text/css'
      break;
    default:
      contentType = 'text/plain'
      break;
  }
}

const server = http.createServer((req, res) => {
  // Your code here
  console.log(`${req.method} ${req.url}`);

  // PHASE 2
  if(req.method === 'GET' && req.url.startsWith('/static')){
    const assetPath = req.url.split('/static')[1];
    try {
      const resBody = fs.readFileSync('./assets', + assetPath);
      res.statusCode = 200;
      res.setHeader('Content-Type', getContentType(assetPath))
      res.end(resBody)
    } catch {
      console.error("Cannot find asset", assetPath, "in assets folder");
      res.statusCode = 400;
      return res.end();
    }
  }

  // PHASE 1
  const fileContents = fs.readFileSync('./index.html', 'utf-8')
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html')
  res.end(fileContents)
});

const port = 5001;

server.listen(port, () => console.log('Server is listening on port', port));
