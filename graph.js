const fs=require('fs')
const path=require('path')
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

const files = readFilesSync('../plotdata');

var row=[]
for(var i=0; i<files.length; i++){
    var nome= files[i]['name']+files[i]['ext']

    try {
        const data = fs.readFileSync('../plotdata/' + nome, 'utf8')
        console.log(data)
        dato=JSON.parse(data)
        var temp=[i, parseInt(dato.sinr)]
        row.push(temp)
    } catch (err) {
        console.error(err)
    }
}
google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(sinr);

for(var i=0;i<row.length;i++){
    console.log(row[i])
}
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
    }
