const http = require("http");
const mysql = require("mysql");

const connection = mysql.createConnection({
       host: "localhost",
       user: "Prince",
       password: "Shal@1313",
       database: "NodeJS"
});

connection.connect((err) => {
       if (err) {
              console.log(err);
       }
       else {
              console.log("Connected.");
       }
       const _query = "select * from Test;";

       connection.query(_query, (err, result, fields) => {
              if (err) {
                     console.log(err);
              }
              else {
                     console.log(result[0].name, fields);
              }
       });
});

/*
__________________________________________
Email sender


const http = require("http");
const nodemailer = require("nodemailer");
const formidable = require("formidable");
const fs = require("fs");
const url = require("url");
const SendmailTransport = require("nodemailer/lib/sendmail-transport");
const { message } = require("statuses");

function error(err, res) {
       fs.readFile("error.html", (_err, data) => {
              if (err) {
                     res.write(`<h1>Error</h1><p>${_err}</p>`);
                     return;
              }

              pageData = data.toString().replace("{errorMessage}", err);

              res.writeHead(404, {'Content-Type': 'text/html'});
              res.write(pageData);
       });

       return res.end();
}

function sendMail(fields, res) {       
       const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                     user: fields["senderEmail"][0],
                     pass: fields["senderPassword"][0]
              }
       });

       const mailOptions = {
              from: fields["senderEmail"][0],
              to: fields["receiverEmail"][0],
              subject: fields["subject"][0],
              text: fields["text"][0],
       }

       transporter.sendMail(mailOptions, (err, info) => {
              if (err) {
                     error(err, res);
              }
              else {
                     console.log(info.response);
              }
       });
}

http.createServer((req, res) => {
       const urlQuery = url.parse(req.url, true);
       const pathName = "." + urlQuery.pathname;
       let pathToOpen;


       switch (pathName) {
              case "./mailSent":
                     pathToOpen = "mailSent.html";
                     const form = new formidable.IncomingForm();

                     form.parse(req, (err, fields, files) => {
                            if (err) {
                                   return error(err, res);
                            }

                            sendMail(fields, res); 
                     });

                     break;
              case "./":
                     pathToOpen = "index.html";
                     break;
              default:
                     return error(TypeError("An error occured"), res);
       }
       
       fs.readFile(pathToOpen, (err, data) => {
              if (err) {
                     return error(err, res);
              }
              res.writeHead(200, {'Content-Type': 'text/html'});
              res.write(data);
              return res.end();
       });
}).listen(8080);

____________________________________________________
File upload and moving to another location on the computer


var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

http.createServer(function (req, res) {
  if (req.url === '/fileupload' && req.method.toLowerCase() === 'post') {
    var form = new formidable.IncomingForm();
    form.uploadDir = 'D:/'; // Setting a custom directory for uploads
    form.keepExtensions = true;

    form.parse(req, function (err, fields, files) {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('File upload failed');
        return;
      }

      const uploadedFile = files.filetoupload[0]; // Access the first item in the array ------------------IMPORTANT
      const oldpath = uploadedFile ? uploadedFile.filepath : null;
      const newpath = 'D:/' + (uploadedFile ? uploadedFile.originalFilename : '');

      if (!oldpath) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('File path not found in upload');
        return;
      }

      // Move the file to the new path
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    res.end();
  }
}).listen(8080);

console.log("Server running at http://localhost:8080/");





___________________________________________________
Default home page with no path; reading and displaying files

var http = require('http');
var fs = require('fs');
const url = require("url");
const events = require("events")

function error(err, res) {
       res.writeHead(404, {'Content-Type': 'text/html'});
       res.write(err.message);
       return res.end()
}

const eventEmitter = new events.EventEmitter();
eventEmitter.on("error", error);

http.createServer(function (req, res) {
       const urlQuery = url.parse(req.url, true);
       const fileName = "." + urlQuery.pathname;

       if (fileName === "./") {
              fs.readFile("home.html", (err, data) => {
                     if (err) {
                            return eventEmitter.emit("error", err, res);
                     }
                     
                     res.writeHead(200, {'Content-Type': 'text/html'});
                     res.write(data);
                     return res.end();
              });
       }
       else {
              fs.readFile(fileName, function(err, data) {
                     if (err) {
                            return eventEmitter.emit("error", err, res);
                     }
                     res.writeHead(200, {'Content-Type': 'text/html'});
                     res.write(data);
                     return res.end();
              });
       }

}).listen(8080);


const http = require("http");
const url = require("url");

http.createServer((req, res) => {
       const urlQuery = url.parse(req.url, true);
       const pathName = "." + urlQuery.pathname;
       const queries = urlQuery.query;
       const name = (queries.name) ? queries.name : "-I don't know who-";

       res.writeHead(200, {'Content-Type': 'text/html'});
       switch (pathName) {
              case "./":
                     res.write(`Welcome ${name}`);
                     break;
              case "./about":
                     res.write("My age is 173896783676784623786");
                     break;
              default:
                     res.write("An error occured");
       }

       res.end();
}).listen(8080);
*/