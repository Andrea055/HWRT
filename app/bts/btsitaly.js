const fs = require('fs')

fs.readFile('bts.json', 'utf8' , (err, data) => {
    var a=document.getElementById('bts')
    a.setAttribute("src", "https://lteitaly.it/internal/map.php#bts=" + JSON.parse(data)[0] + "." + JSON.parse(data[1]))
  if (err) {
    console.error(err)
    return
}})
