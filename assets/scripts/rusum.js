var enginetype = "benzin,dizel,qaz,benzinhibrid,dizelhibrid,electric";
var price;
var enginesize;
var productionyear;
var aksiz;
var idxal;
var edv;
var year = productionyear - Date;
var currency;
var gomrukyigimi = 120;
var vesigehaqqi = 30;
var elektrongomruk = 30;
var elektrongomrukedv = elektrongomruk * 0.18;


//idxal rusumu
switch (enginetype) {
    case "electric":
        idxal = price * currency * 0.15;
        break;
    case "benzin", "dizel", "qaz", "benzinhibrid", "dizelhibrid":
        if (enginesize < 1500) {
            if (year < 1) {
                idxal = enginesize * currency * 0.4;
            } else idxal = enginesize * 0.7 * currency;
        } else {
            if (year < 1) {
                idxal = enginesize * currency * 0.7;
            } else enginesize * 1.2 * currency
        }
        break;
    default:
}

var c = 0;
var k = 1;

//aksiz
if (year > 3) {
    c = 1;
}
if (year > 7 && (enginetype == "benzin" || enginetype == "qaz" || enginetype == "benzinhibrid")) {
    k = 1.2;
} else if (year > 7 && (enginetype == "dizel" || enginetype == "dizelhibrid")) {
    k = 1.5;
}
switch (enginesize) {
    case enginesize <= 2000:
        aksiz = enginesize * 0.3 * k;
        break;
    case 2000 < enginesize <= 3000:
        aksiz = (600 + ((enginesize - 2000) * 5)) * k;
        break;
    case 3000 < enginesize <= 4000:
        var a = 2;
        aksiz = (5600 + ((enginesize - 3000) * (13 + a * c))) * k;
        break;
    case 4000 < enginesize <= 5000:
        var a = 5;
        aksiz = (18600 + ((enginesize - 4000) * (35 + a * c))) * k;
        break;
    case enginesize > 5000:
        var a = 10;
        aksiz = (53600 + ((enginesize - 5000) * (79 + a * c))) * k;
        break;
    default:
        break;
}
//gomrukyigimi
if (price * currency < 1000) {
    gomrukyigimi = 15
} else if (price * currency < 10000) {
    gomrukyigimi = 60
} else if (price * currency < 50000) {
    gomrukyigimi = 120
} else if (price * currency < 100000) {
    gomrukyigimi = 200
} else if (price * currency < 500000) {
    gomrukyigimi = 300
} else if (price * currency < 1000000) {
    gomrukyigimi = 600
} else gomrukyigimi = 1000

//edv
if (((enginetype == "benzinhibrid" || enginetype == "dizelhibrid") && year < 3 && enginesize <= 2500) || enginetype == "electric") {
    edv = gomrukyigimi * 0.18;
} else edv = (idxal + aksiz + (price * currency) + gomrukyigimi + vesigehaqqi) * 0.18


