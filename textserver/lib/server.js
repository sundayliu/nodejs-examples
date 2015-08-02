var fs = require('fs');
var path = require('path');
var http = require('http');

// An object  key-value
// 无序的属性集合
var MIME = {
  '.css':'text/css',
  'js':'application/javascript'
};

function combineFiles(pathnames, callback){
  // array 有序的值集合
  // version 2 :一边读取文件，一边响应,不要将串行读取修改为并行读取
  var output = [];
  (function next(i, len){
    if (i < len){
      fs.readFile(pathnames[i], function(err, data){
        if (err){
          callback(err);
        }else{
          output.push(data);
          next(i+1,len);
        }
      });
    }else {
      callback(null,Buffer.concat(output));
    }
  })(0,pathnames.length);
}

function parseURL(root, url){
  var base,pathname,parts;
  
  if (url.indexOf('??') == -1){
    url = url.replace('/','/??');
  }
  
  console.log(url);
  
  parts = url.split('??');
  console.log(parts[0]);
  console.log(parts[1]);
  base = parts[0];
  pathnames = parts[1].split(',').map(function(value){
    return path.join(root,base,value);
  });
  
  return {
    mime:MIME[path.extname(pathnames[0])]||'text/plain',
    pathnames:pathnames
  }
}

// version 2.0
function outputFiles(pathnames,writer){
  (function next(i, len){
    if (i < len)
    {
      var reader = fs.createReadStream(pathnames[i]);
      reader.pipe(writer,{end:false});
      reader.on('end',function(){
        next(i+1,len);
      });
    }
    else
    {
      writer.end();
    }
  })(0, pathnames.length);
}

function validateFiles(pathnames, callback){
  (function next(i, len){
    if (i < len){
      fs.stat(pathnames[i],function(err,stats){
        if (err){
          callback(err);
        }
        else if (!stats.isFile()){
          callback(new Error());
        }else{
          next(i+1, len);
        }
      });
    }else{
      callback(null,pathnames);
    }
  })(0,pathnames.length);
}


function main(argv){
  var config = JSON.parse(fs.readFileSync(argv[0],'utf-8'));
  var root = config.root||'.';
  var port = config.port || 80;  // if config not set port default set 80
  
  http.createServer(function(request,response){
    console.log(request.url);
    var urlInfo = parseURL(root, request.url);
    /*
    combineFiles(urlInfo.pathnames, function(err,data){
      if (err)
      {
        response.writeHead(404);
        response.end(err.message);
      }
      else
      {
        response.writeHead(200,{
          'Content-Type':urlInfo.mime
        });
        response.end(data);
      }
    });
    */
    
    validateFiles(urlInfo.pathnames, function(err,pathnames){
      if (err)
      {
        response.writeHead(404);
        response.end(err.message);
      }
      else
      {
        response.writeHead(200, {'Content-Type':urlInfo.mime});
        outputFiles(pathnames,response);
      }
    });
  }).listen(port);
}

main(process.argv.slice(2));