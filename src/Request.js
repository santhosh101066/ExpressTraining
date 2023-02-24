const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.get("/base", (req, res) => {
  res.send(`<pre>
    ${req.baseUrl}
    </pre>`);
});
router.get("/method", (req, res) => {
  res.send(`<pre>
    Accept html: ${req.accepts("html")}
    get Content type: ${req.get('connection')}
    headder: ${JSON.stringify(req.headers)}
    isHtml: ${req.is('html')} [null if content-type missing]
    </pre>`);
});
router.get("/pass/:info", (req, res) => {
  console.log(req.route);
  res.send(`<pre>
    Prams:  ${JSON.stringify(req.params)} 
    isFresh :${req.fresh} 
    Host: ${req.hostname} 
    IP: ${req.ip} 
    Method: ${req.method}
    OriginalUrl: ${req.originalUrl}
    Path: ${req.path}
    Protocol: ${req.protocol}
    Secure: ${req.secure}
    Stale: ${req.stale}
    Subdomain: ${req.subdomains}
    Xml request: ${req.xhr}
    </pre>`);
});
router.post("/text", bodyParser.text({ extended: false }), (req, res) => {
  res.send(req.body);
});
router.post("/json", bodyParser.json(), (req, res) => {
  res.send(req.body);
});

module.exports = router;
