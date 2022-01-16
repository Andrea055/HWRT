const fs = require('fs')

fs.readFile('bts.json', 'utf8' , (err, data) => {
    document.getElementById('bts').src="https://lteitaly.it/internal/map.php#bts=" + JSON.parse(data)[0] + "." + JSON.parse(data)[1]
  if (err) {
    alert("Errore!")
    alert(err)
    return
}})
