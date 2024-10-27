const http = require("http");

function throwError(errMessage, res) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ error: errMessage }));
    res.end(); // End the response here
}

http.createServer((req, res) => {
    if (req.url === "/api/data") {
        let body = "";
        
        req.on("data", chunk => {
            body += chunk.toString(); // Accumulate data chunks into `body`
        });

        req.on("end", () => {
            try {
                const parsedData = JSON.parse(body); // Parse the JSON data
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: "Data received", data: parsedData }));
            } catch (error) {
                throwError("Invalid JSON", res); // Send error response
            }
        });
    } else {
        throwError("Not found", res); // Send 404 if route is not `/api/data`
    }
}).listen(8080);
