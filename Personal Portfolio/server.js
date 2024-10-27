const http = require("http");
const fs = require("fs");
const url = require("url");

function throwError(errMessage, res) {
       res.writeHead(404, {'Content-Type': 'text/html'});
       res.write(errMessage);
       return res.end();
}

http.createServer((req, res) => {
       const urlQuery = url.parse(req.url, true);
       const pathName = "." + urlQuery.pathname;
       let fileToOpen;

       switch (pathName) {
              case "./":
                     fileToOpen = "home.html";
                     break;
              case "./projects":
                     fileToOpen = "projects.html";
                     break;
              case "./about":
                     fileToOpen = "about.html";
                     break;
              default:
                     throwError("Could not find the page.", res);
                     return;
       }

       fs.readFile(fileToOpen, (err, data) => {
              if (err) {
                     return throwError(err.message, res);
              }
              
              res.writeHead(200, {"Content-Type": "text/html"});
              res.write(data);
              return res.end();
       });
}).listen(8080);