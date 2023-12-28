const httpClient = require("http");
const fs = require("fs");
const url = require("url");

const myServer = httpClient.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();
  const log = `${Date.now()}: ${req.method} ${req.url} New request received.\n`;
  const myUrl = url.parse(req.url);
  console.log(myUrl);
  fs.appendFile("./log.txt", log, (err, data) => {
    switch (req.url) {
      case "/":
        res.end("THis is home page");
        break;

      case "/about":
        res.end("I am vikas poute");

      default:
        res.end("404 Not Found");
        break;
    }
  });
});

myServer.listen(8000, () => {
  console.log("Server listening on 8080");
});
