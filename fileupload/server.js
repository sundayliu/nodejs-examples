var http = require('http');
var url = require('url');

function start(route,handle){
    var port = 9999;
    http.createServer(function(request,response){
        var postData = "";
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + "received.");
        
        request.setEncoding("utf8");
        request.addListener("data", function(postDataChunk){
            postData += postDataChunk;
            console.log("Request POST data chunk'" + postDataChunk + "'.");
        });
        
        request.addListener("end", function(){
            route(handle, pathname, response, postData);
        });
        
       // response.writeHead(200,{"Content-Type":"text/plain"});
       // response.write("Hello World");
       // response.end();
    }).listen(port);

    console.log("Server has started");
}

exports.start = start;
