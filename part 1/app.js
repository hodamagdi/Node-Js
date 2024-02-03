const http = require ('http');
const fs = require("fs");
const url = require("url");



const server = http.createServer((req , res)=>{

    const path = url.parse(req.url).pathname
    switch(path){
        case'/index':
        handelrequest('index.html' , res);
        break;

        case'/about':
        handelrequest('about.html' , res);
        break;  
        
        case'/contact':
        handelrequest('contact.html' , res);
        break;

        default:
            res.end('this page not found');
        break;    
    }

   
});

server.listen(8080 , '127.0.0.1' , ()=>{
    console.log('server runing.....')
});


function handelrequest(filepath , res){

  fs.readFile(filepath,(error , data)=>{
    if(error){
        res.end('file have error')
    }else{
        res.end(data)
    }
})  
}