const fs=require('fs')
const path=require('path')
const huaweiLteApi = require('huawei-lte-api');

const connection = new huaweiLteApi.Connection('http://admin:pass192.168.100.1/');


connection.ready.then(function() {
    console.log('Ready');




    device.information().then(function(result) {
        var name=result.DeviceName
        exports.nome=name

         var imei=result.Imei
         exports.imei=imei

         var ip=result.WanIPAddress
         exports.ip=ip

         var dns=result.wan_dns_address
         exports.dns=dns

        var mode=result.workmode
        exports.mode=mode

       var serial=result.SerialNumber
       exports.serial=serial

        var mac=result.MacAddress1
        exports.mac=mac
        
    }).catch(function(error) {
        console.log(error);
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
var newrow=[]
var i=0
function leggere(){
  connection.ready.then(function() {
    console.log('Ready');


    const device = new huaweiLteApi.Device(connection);
    device.signal().then(function(result) {
      row.push([i, parseInt(result.sinr)])
      row2.push([i, parseInt(result.rsrp)])
      row2.push([i, parseInt(result.rsrq)])
      i++
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

///sinr
function sinr() {
      console.log("ciao sinr")
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
        console.log("ciao")
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

  data.addRows(row2);

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
  setTimeout(ciao,1000)
}

