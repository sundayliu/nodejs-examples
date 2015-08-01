console.log("Hello World");

console.log("---Buffer :binary data handle");
var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
var sub = bin.slice(2);

sub[0] = 0x65;
console.log(bin);

var dup = new Buffer(bin.length);
bin.copy(dup);
dup[0] = 0x48;

console.log(bin);
console.log(dup);