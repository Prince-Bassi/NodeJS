const http = require("http");
const url = require("url");
const fs = require("fs");

function throwError(err, res) {
       res.writeHead(404, {"Content-Type": "application/json"});
       res.write(err.message);
       return res.end();
}

http.createServer((req, res) => {
       const parsedUrl = url.parse(req.url, true);
       const queries = parsedUrl.query;
       const operation = parsedUrl.pathname;
       const operators = [queries["operator1"], queries["operator2"]];
       let answer;

       if (!(operators[0] && operators[1])) {
              return throwError(Error("One or more Operators are not given."), res);
       }

       switch (operation) {
              case "/add":
                     answer = +operators[0] + +operators[1];
                     break;
              case "/subtract":
                     answer = operators[0] - operators[1];
                     break;
              case "/multiply":
                     answer = operators[0] * operators[1];
                     break;
              case "/divide":
                     if (operators[1] === "0") {
                            return throwError(Error("Error. Divide By 0 is not possible"), res);
                     }
                     answer = (operators[0] / operators[1]).toFixed(2);
                     break;
              default:
                     return throwError(Error("Unknown operation."), res);
                     break;
       }

       res.writeHead(200, {"Content-Type": "application/json"});
       res.write(JSON.stringify(answer));
       res.end();
}).listen(8080);
