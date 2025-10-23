const http = require("http");
const fs = require("fs");
const path =require("path")

const port = 3000;

const  server = http.createServer((req,res)=>{
    const filePath=path.join(__dirname,req.url === "/" ? "index.html":req.url);
    
    const extName = String(path.extname(filePath)).toLowerCase();
    const mimeType = {
        '.html' : 'text/html',
        '.css' : 'text/css',
        '.js' : 'text/javascript',
        '.png' : 'image/png',
    }

    const Type = mimeType[extName] || 'application/octet-stream' //itt is a generic binary type .

    fs.readFile(filePath,(err,content)=>{
        if(err){
            if(err.code === "ENOENT"){
                res.writeHead(404,{"content-Type":
                    "text/html"
                })
                res.end("404 : File not found . Try again Diddy!!")
            }
        }else{
            res.writeHead(200,{'Content-Type':Type}); //here 200 is the status code.
            res.end(content,"utf-8");//here utf-8 is for encoding purpose.
        }
    })
});

server.listen(port,()=>{
    console.log(`serever isd listening to port ${port}`);
    
})