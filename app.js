const http = require('http');
const fs = require('fs');
var data = '';
for (let j= 1; j<8; j++ ) {
    for(let i =0 ; i< 1500000;i++) {
        data = data + i + "dtfydfhsfdtyadfsgftdsafx \n";
    }
    fs.writeFile(j+'old.txt', data, (err) => {
        if(err) {
            return console.log(err);
        }
        else {
            console.log('File created successfully');
        }
    });
    data = '';
}

http.createServer(3000,() => {
    console.log("server started");
})