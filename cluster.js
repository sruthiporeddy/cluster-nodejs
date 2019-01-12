const cluster = require('cluster');
const http = require('http');
const os = require('os');
const fs = require('fs');

var data = '';
for(var i=1; i<1500000; i++) {
   data = data +i+"somefdattatt \n" ;
}
var filename = 1;

if (cluster.isMaster) {
    for (var i = 0; i < os.cpus().length; i++) {
        const worker = cluster.fork();
        worker.on('message', (msg) => {
            console.log(msg);
        })
        
    }

    for(let wid in cluster.workers) {
        console.log(wid);
        cluster.workers[wid].send({
            data: data,
            filename: filename
        });
        filename++;
    }
    cluster.on('online', (worker) => {
        console.log('Worker ' + worker.process.pid + ' is online');
    })
 
    cluster.on('exit', (worker,code,signal) => {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    })
} else {
    process.on('message',(msg) => {
        fs.writeFile(msg.filename+'text.txt',msg.data,(err) => {
            if(err) {
                return console.log(err);
            }
            else {
                console.log('file created successfully');
               // process.exit(0);
            }
        });
        
    })
  
}

http.createServer(3000,() => {
    console.log('server started')
})