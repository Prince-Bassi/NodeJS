const http = require("http");
const mysql = require("mysql");
const fs = require("fs");
const url = require("url");
const formidable = require("formidable");

const db = mysql.createConnection({
       host: "localhost",
       user: "Prince",
       password: "Shal@1313",
       database: "contacts"
});

function throwError(err, statusCode, res) {
       res.writeHead(statusCode, {"Content-Type": "text/html"});
       res.write(err.message);
       return res.end();
}

function serveFile(res, filePath, contentType) {
       fs.readFile(filePath, (err, data) => {
              if (err) {
                     return throwError(Error(`Error reading '${filePath}'`), 404, res);
              }
              res.writeHead(200, {"Content-Type": contentType});
              res.write(data);
              return res.end();
       });
}

function displayData(res) {
       db.query("select * from contactList;", (err, result, fields) => {
              if (err) {
                     return throwError(err, 404, res);
              }

              res.writeHead(200, {"Content-Type": "application/json"});
              res.write(JSON.stringify(result));
              return res.end();
       });
}

function addData(req, res) {
       const form = new formidable.IncomingForm();
       
       form.parse(req, (err, fields, files) => {
              if (err) {
                     return throwError(err, 404, res);
              }

              const name = fields.name ? fields.name[0].trim() : null;
              const phoneNum = fields.phoneNum ? fields.phoneNum[0].trim() : null;
              const countryCode = fields.countryCode ? fields.countryCode[0].trim() : null;

              if (name && phoneNum && countryCode) {
                     db.query("INSERT INTO contactList (name, phoneNum, countryCode) VALUES (?, ?, ?);", [name, phoneNum, countryCode], (err, result) => {
                            if (err) {
                                   return throwError(Error("Error inserting data into database."), 404, res);
                            }

                            res.writeHead(200, {"Content-Type": "application/json"});
                            res.write(JSON.stringify("Data successfully added."));
                            return res.end();
                     });
              } 
              else {
                     return throwError(Error("Error: Missing or invalid data."), 400, res);
              }
       });
}

function deleteData(req, res) {

}

http.createServer((req, res) => {
       const parsedURL = url.parse(req.url, true);
       const pathName = parsedURL.pathname;
       console.log(pathName);

       switch (pathName) {
              case "/":
                     serveFile(res, "index.html", "text/html");
                     break;
              case "/style.css":
                     serveFile(res, "style.css", "text/css");
                     break;
              case "/script.js":
                     serveFile(res, "script.js", "application/javascript");
                     break;
              case "/components":
                     serveFile(res, "components.js", "application/javascript");
                     break;
              case "/display":
                     displayData(res);
                     break;
              case "/add":
                     addData(req, res);
                     break;
              case "/delete":
                     deleteData(req, res);
                     break;
              default:
                     throwError(Error("Route Not Found"), 404, res);
       }
}).listen(8080);