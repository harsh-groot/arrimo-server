const express = require("express");
const testRouter = express.Router();



testRouter.get("/", (req,res) => {
    
    res.writeHead(200, { 'Content-Type': 'text/html' }); 
        
        // set response content    
        res.write('<html><body><p>This is home Page.</p></body></html>');
        res.end();
});


module.exports = testRouter;