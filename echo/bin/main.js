var argv = require('argv');
var echo = require('../lib/echo');
var args = argv.option({
    name:'option',
    short:'o',
    type:'string',
    description:'Defines an option for your script',
    example:"script --option=value or script -o value"
}).run();

//var message = argv.join(' ');
//console.log(echo(message));
console.dir(args.options);