const http = require('http');
var info ={
    DeviceName: 'B628-265',
    SerialNumber: 'RDPDW21823002203',
    Imei: '868426042257657',
    Imsi: '222881254231168',
    Iccid: '8939880825048674325',
    Msisdn: '',
    HardwareVersion: 'WL1B628M',
    SoftwareVersion: '10.0.5.1(H203SP13C00)',
    WebUIVersion: 'WEBUI 10.0.5.1(W2SP17C03)',
    MacAddress1: '28:54:71:15:A6:8A',
    MacAddress2: '',
    WanIPAddress: '10.16.129.177',
    wan_dns_address: '151.5.216.25,151.5.216.225',
    WanIPv6Address: '',
    wan_ipv6_dns_address: '',
    ProductFamily: 'LTE',
    Classify: 'cpe',
    supportmode: 'LTE|WCDMA|GSM',
    workmode: 'LTE',
    submask: '255.255.255.255',
    Mccmnc: '22288',
    iniversion: 'B628-265-CUST 10.0.5.1(C00)',
    uptime: '1469378',
    ImeiSvn: '01',
    WifiMacAddrWl0: '28:54:71:15:A6:8B',
    WifiMacAddrWl1: '28:54:71:15:A6:90',
    spreadname_en: 'HUAWEI 4G CPE Pro 2',
    spreadname_zh: '华为 4G CPE Pro 2'
  }
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
var n=0
infohttp=JSON.stringify({...info})
const requestListener = function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(infohttp);
}

const server = http.createServer(requestListener);
server.listen(80);
