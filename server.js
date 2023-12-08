const http = require('http');
const fs = require("fs");


const server = http.createServer((req, res) => {
  // Your code here
  console.log(`${req.method} ${req.url}`);

  let contentType = '';
  if(req.url.startsWith('/static')){
    const reqArr = req.url.split('/');
    if(reqArr[2] === 'images'){
      contentType = 'image/jpg'
    } else if (reqArr[2] === 'css'){
      contentType === 'text/css'
    }
  }
  const fileContents = fs.readFileSync(`.${req.url}`, 'utf-8');
  res.statusCode = 200;
  res.setHeader('Content-Type', contentType);
  res.end(fileContents)

  // let reqBody = '';
  // req.on('data', data => {
  //   reqBody += data;
  // })

  // console.log(reqBody);
  // const fileContents = fs.readFileSync('./index.html', 'utf-8')
  // res.statusCode = 200;
  // res.setHeader('Content-Type', 'text/html')
  // res.end(fileContents)
});

const port = 5001;

server.listen(port, () => console.log('Server is listening on port', port));
