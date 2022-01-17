const fs=require('fs')
const path=require('path')
const huaweiLteApi = require('huawei-lte-api');
const connection = new huaweiLteApi.Connection('http://admin:Af4339XcbrSn@192.168.100.1/');

connection.ready.then(function() {
    
    const device = new huaweiLteApi.Device(connection);
    device.information().then(function(result) {
        var nome=result.DeviceName


         var imei=result.Imei


         var ip=result.WanIPAddress
 

         var dns=result.wan_dns_address


        var mode=result.workmode


       var serial=result.SerialNumber


        var mac=result.MacAddress1
      var all=[nome,imei,ip,dns,mode,serial,mac]

    fs.writeFile('info.json', JSON.stringify(all), function (err) {
      if (err) return console.log(err);
      console.log('Hello World > helloworld.txt');
    });
    }).catch(function(error) {
        alert("Incorrectible error:" + error);
    });

});
connection.ready.then(function() {
    
  const device = new huaweiLteApi.Device(connection);
  device.signal().then(function(result) {
    var band=result.mode
    var bandwidth=result.dlbandwidth + "/" + result.ulbandwidth
    var plmn=result.plmn
    switch(plmn){
      case "22288":
        var plmn=result.plmn+ "WindTre"
      default:
        break;
    }
    var all=[result.mode,bandwidth, result.plmn,result.band,result.enodeb_id,result.dl_mcs,result.transmode,result.tac,result.arfcn,result.cell_id,result.pci]

  fs.writeFile('band.json', JSON.stringify(all), function (err) {
    if (err) return console.log(err);
    console.log('Hello World > helloworld.txt');
  });
  }).catch(function(error) {
      alert("Incorrectible error:" + error);
  });

});

var dati=[]
 function readFilesSync(dir) {
    const files = [];
  
    fs.readdirSync(dir).forEach(filename => {
      const name = path.parse(filename).name;
      const ext = path.parse(filename).ext;
      const filepath = path.resolve(dir, filename);
      const stat = fs.statSync(filepath);
      const isFile = stat.isFile();
  
      if (isFile) files.push({ filepath, name, ext, stat });
    });
  
    files.sort((a, b) => {
      // natural sort alphanumeric strings
      // https://stackoverflow.com/a/38641281
      return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
    });
  
    return files;
}
var row=[]
var row2=[]
var row3=[]
var upload=[]
var downloadg=[]
var i=0
function leggere(){
  connection.ready.then(function() {


    var device = new huaweiLteApi.Device(connection);
    device.signal().then(function(result) {
      row.push([i, parseInt(result.sinr)])
      row2.push([i, parseInt(result.rsrp)])
      row3.push([i, parseInt(result.rsrq)])
      var enode=result.enodeb_id.split("")
      if(enode[0]==0){
        var enodevero=result.enodeb_id
        var scritto=enodevero.substring(1)
      }else{
        var scritto=result.enodeb_id
      }
      var info=[result.plmn,scritto]
    fs.writeFile('bts.json', JSON.stringify(info), function (err) {
      if (err) return console.log(err);
    });
      i++
      if(i>10){
        row.slice(1)
        row2.slice(1)
        row3.slice(1)
      }
    }).catch(function(error) {
        console.log(error);
    });

});
connection.ready.then(function() {


  var device = new huaweiLteApi.Monitoring(connection);
  device.trafficStatistics().then(function(result) {
    upload.push([i,parseInt(result.CurrentUploadRate)/100000])
    downloadg.push([i, parseInt(result.CurrentDownloadRate)/100000])
    if(i>10){
      upload.slice(1)
      downloadg.slice(1)

    }
  }).catch(function(error) {
      console.log(error);
  });


});

}

leggere()

google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(sinr);
google.charts.setOnLoadCallback(ciao);
google.charts.setOnLoadCallback(rsrq);
google.charts.setOnLoadCallback(datausage);
google.charts.setOnLoadCallback(downloadgra);
///sinr
function sinr() {
    
      var data = new google.visualization.DataTable();
      data.addColumn('number', 'dB');
      data.addColumn('number', 'SINR');

      data.addRows(row);

      var options = {
        hAxis: {
          title: 'Seconds'
        },
        vAxis: {
          title: 'SINR'
        }
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

      chart.draw(data, options);
      leggere();
      setTimeout(sinr,1000)
    }



///rsrp

  
  function ciao() {
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'dB');
        data.addColumn('number', 'RSRP');
  
        data.addRows(row2);
  
        var options = {
          hAxis: {
            title: 'Seconds'
          },
          vAxis: {
            title: 'RSRP'
          }
        };
  
        var chart = new google.visualization.LineChart(document.getElementById('new'));
  
        chart.draw(data, options);
        setTimeout(ciao,1000)
      }

///rsrq

function rsrq() {
  console.log("ciao")
  var data = new google.visualization.DataTable();
  data.addColumn('number', 'dB');
  data.addColumn('number', 'RSRQ');

  data.addRows(row3);

  var options = {
    hAxis: {
      title: 'Seconds'
    },
    vAxis: {
      title: 'RSRQ'
    }
  };

  var chart = new google.visualization.LineChart(document.getElementById('rsrq'));

  chart.draw(data, options);
  setTimeout(rsrq,1000)
}

///data usage

function datausage() {
  var data = new google.visualization.DataTable();
  data.addColumn('number', 'Mbps');
  data.addColumn('number', 'Upload rate');

  data.addRows(upload);

  var options = {
    hAxis: {
      title: 'Seconds'
    },
    vAxis: {
      title: 'Upload Mbps'
    }
  };

  var chart = new google.visualization.LineChart(document.getElementById('data'));

  chart.draw(data, options);
  setTimeout(datausage,1000)
}

function downloadgra() {
  var data = new google.visualization.DataTable();
  data.addColumn('number', 'Mbps');
  data.addColumn('number', 'Download rate');

  data.addRows(downloadg);

  var options = {
    hAxis: {
      title: 'Seconds'
    },
    vAxis: {
      title: 'Download Mbps'
    }
  };

  var chart = new google.visualization.LineChart(document.getElementById('downloadgraph'));

  chart.draw(data, options);
  setTimeout(downloadgra,1000)
}
