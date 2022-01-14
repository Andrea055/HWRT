var info2 = {
    pci: '485',
    sc: '',
    cell_id: '36416268',
    rsrq: '-12.0dB',
    rsrp: '-80dBm',
    rssi: '>=-51dBm',
    sinr: '29dB',
    rscp: '',
    ecio: '',
    mode: '7',
    ulbandwidth: '20MHz',
    dlbandwidth: '20MHz',
    txpower: 'PPusch:-11dBm PPucch:-21dBm PSrs:0dBm PPrach:-18dBm',
    tdd: '',
    ul_mcs: 'mcsUpCarrier1:18',
    dl_mcs: 'mcsDownCarrier1Code0:28 mcsDownCarrier1Code1:28',
    earfcn: 'DL:3350 UL:21350',
    rrc_status: '',
    rac: '',
    lac: '',
    tac: '12558',
    band: '7',
    nei_cellid: 'No1:440',
    plmn: '22288',
    ims: '0',
    wdlfreq: '',
    lteulfreq: '25600',
    ltedlfreq: '26800',
    transmode: 'TM[4]',
    enodeb_id: '0142251',
    cqi0: '15',
    cqi1: '15',
    ulfrequency: '2560000kHz',
    dlfrequency: '2680000kHz',
    arfcn: '',
    bsic: '',
    rxlev: ''
  }
var scritti=[]
const fs = require('fs'); 
var n=0
var i=0
function update(){
    fs.appendFile('plotdata/' + n.toString() + ".json", JSON.stringify(info2), function (err) {
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

