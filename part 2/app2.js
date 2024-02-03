const http = require("http");
const fs = require("fs");
const qs = require("querystring");

const server = http.createServer((req, res) => {
    if (req.url == "/register.html") {
        if (req.method === "GET") {

            res.writeHead(200, { 'Content-Type': 'text/html' });
            fs.readFile("register.html", function (err, data) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                    return;
                }
                res.write(data);
                res.end("");
            });
        } else if (req.method === "POST") {
            
            // Handle registration form submission on POST request
            let body = "";
            req.on("data", (chunk) => {
                body += chunk;
            });

            req.on("end", () => {
                const formData = qs.parse(body);
                console.log(formData);

                // Validate password length
                if (formData.password.length < 8) {
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    res.end("Error: Password should be at least 8 characters.");
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end("Registration success!");
                }
            });
        }
    } 
});

server.listen(8081, () => {
    console.log("Server running on http://localhost:8081");
});
