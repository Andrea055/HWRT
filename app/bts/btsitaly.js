const fs = require('fs')
    var path = window. location. pathname;
    var page = path. split("/"). pop();

fs.readFile('bts.json', 'utf8' , (err, data) => {
    switch(page){
    case "italy.html":
        document.getElementById('bts').src="https://lteitaly.it/internal/map.php#bts=" + JSON.parse(data)[0] + "." + JSON.parse(data)[1]
    break;
    }

  if (err) {
    alert("Errore!")
    alert(err)
    return
}})
