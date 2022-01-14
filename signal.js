var scritti=[]
const fs = require('fs'); 
var info2={}
var n=0
const huaweiLteApi = require('huawei-lte-api');

const connection = new huaweiLteApi.Connection('http://admin:pass@192.168.100.1/');

connection.ready.then(function() {
    console.log('Ready');


    const device = new huaweiLteApi.Device(connection);
    device.signal().then(function(result) {
        info2=result
    }).catch(function(error) {
        console.log(error);
    });

});
var i=0
function update(){
    fs.appendFile('plotdata/' + n.toString() + ".json", JSON.stringify(info2), function (err) {
      connection.ready.then(function() {
        console.log('Ready');
    
    
        const device = new huaweiLteApi.Device(connection);
        device.signal().then(function(result) {
            info2=result
        }).catch(function(error) {
            console.log(error);
        });
    
    });
        if (err) throw err;
        console.log('Updated plot data!');
      }); 
      if(n>30){
          fs.unlinkSync('plotdata/' + i + '.json');
          i++;
      }
      n++;
    setTimeout(update, 1000);
}

fs.writeFile('plotdata/' + n.toString() + ".json", JSON.stringify(info2), function (err) {
    if (err) throw err;
    n++;
    update();
})

