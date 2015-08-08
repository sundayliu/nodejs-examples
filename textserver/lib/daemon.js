var child_process = require('child_process');

var worker;

function spawn(server, config){
    console.log(server)
    console.log(config)
    worker = child_process.spawn('node', [ server, config ]);
    worker.on('exit', function(code){
        if (code != 0)
        {
            console.log("exit code !=0");
            console.log(code);
            spawn(server, config);
        }
    });
}

function main(argv){
    spawn('server.js', argv[0]);
    process.on('SIGTERM', function(){
        worker.kill();
        process.exit(0);
    });
}

main(process.argv.slice(2));