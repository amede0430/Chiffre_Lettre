//fonction
function lettre(nbre) {
    let res = ""

    switch (nbre) {
        case 1:
            res = res + "un";
            break;
        case 2:
            res = res + "deux";
            break;
        case 3:
            res = res + "trois";
            break;
        case 4:
            res = res + "quatre";
            break;
        case 5:
            res = res + "cinq";
            break;
        case 6:
            res = res + "six";
            break;
        case 7:
            res = res + "sept";
            break;
        case 8:
            res = res + "huit";
            break;
        case 9:
            res = res + "neuf";
            break;
        case 10:
            res = res + "dix";
            break;
        case 11:
            res = res + "onze";
            break;
        case 12:
            res = res + "douze";
            break;
        case 13:
            res = res + "treize";
            break;
        case 14:
            res = res + "quatorze";
            break;
        case 15:
            res = res + "quinze";
            break;
        case 16:
            res = res + "seize";
            break;
        case 17:
            res = res + "dix-sept";
            break;
        case 18:
            res = res + "dix-huit";
            break;
        case 19:
            res = res + "dix-neuf";
            break;
        case 20:
            res = res + "vingt";
            break;
        case 30:
            res = res + "trente";
            break;
        case 40:
            res = res + "quarante";
            break;
        case 50:
            res = res + "cinquante";
            break;
        case 60:
            res = res + "soixante";
            break;
        case 70:
            res = res + "soixante dix";
            break;
        case 80:
            res = res + "quatre vingt";
            break;
        case 90:
            res = res + "quatre vingt dix";
            break;
        default:
            break;
    }

    return res;
}

function lettre1(nbre_carac) {
    res = lettre(parseInt(nbre_carac));

    if (nbre_carac.length == 2 && res == "") {
        if (nbre_carac[1] == "1") {
            a = " et ";
        } else {
            a = " ";
        }
        if (nbre_carac[0] == "7" || nbre_carac[0] == "9") {
            res = lettre((parseInt(nbre_carac[0]) - 1) * 10) + a + lettre(10 + parseInt(nbre_carac[1]));
        } else {
            res = lettre(parseInt(nbre_carac[0]) * 10) + a + lettre(parseInt(nbre_carac[1]));
        }

    }

    return res;
}

function lettre2(nbre_carac) {
    let carac = String(parseInt(nbre_carac));
    res = lettre1(carac);
    if (carac.length == 3) {
        let part = carac.slice(1);
        if (carac[0] == "1") {
            res = " cent " + lettre1(part);

        } else {
            res = lettre(parseInt(carac[0])) + " cent " + lettre1(part);
        }

    }

    return res;
}

function lettre3(nbre_carac) {
    nbre_carac = String(parseInt(nbre_carac));
    res = lettre2(nbre_carac);
    if (nbre_carac.length >= 4 && nbre_carac.length <= 6) {
        let part1 = nbre_carac.slice(-nbre_carac.length, -3);
        let part2 = nbre_carac.slice(-3);
        if (part1 == "1" && nbre_carac.length == 4) {
            res = " mille " + lettre2(part2);

        } else {
            res = lettre2(part1) + " mille " + lettre2(part2);
        }

    }
    return res;
}

function lettre4(nbre_carac) {
    nbre_carac = String(parseInt(nbre_carac));
    res = lettre3(nbre_carac);
    if (nbre_carac.length >= 7 && nbre_carac.length <= 9) {
        let part1 = nbre_carac.slice(-nbre_carac.length, -6);
        let part2 = nbre_carac.slice(-6);
        res = lettre2(part1) + " million " + lettre3(part2);

    }
    return res;
}

function lettre5(nbre_carac) {
    nbre_carac = String(parseInt(nbre_carac));
    res = lettre4(nbre_carac);
    if (nbre_carac.length >= 10 && nbre_carac.length <= 12) {
        let part1 = nbre_carac.slice(-nbre_carac.length, -9);
        let part2 = nbre_carac.slice(-9);
        res = lettre2(part1) + " milliard " + lettre4(part2);

    }
    return res;
}

function en_lettre(nbre, nbre_carac) {
    let res = "";
    if (nbre == 0) {
        res = "zero";
    } else {
        res = lettre5(nbre_carac);
    }

    return res
}

var addToDoButton = document.getElementById('addToDo');
var toDoContainer = document.getElementById('toDoContainer');
var inputField = document.getElementById('inputField');
var msg = document.getElementById('message');

addToDoButton.onclick = function() {

    if (inputField.value != "") {
        msg.innerText = "";
        let res = "";
        let carac = inputField.value;
        let nbre_carac = String(carac).replace(/ /g, "");
        let comp = 0;
        while (comp < nbre_carac.length) {
            if (nbre_carac[comp] == ".") {
                break;
            }
            ++comp;
        }
        if (comp == nbre_carac.length) {
            let nbre = parseInt(nbre_carac);
            res = en_lettre(nbre, nbre_carac);
        } else {
            let part_int = nbre_carac.slice(0, comp + 1);
            let part_dec = nbre_carac.slice(comp + 1);
            res = en_lettre(parseInt(part_int), part_int) + " virgule " + en_lettre(parseInt(part_dec), part_dec);
        }

        res = res.trimStart();
        var paragraph = document.createElement('p');
        paragraph.innerText = carac + '--' + res[0].toUpperCase() + res.slice(1);
        paragraph.classList.add('paragraphe-style');
        toDoContainer.appendChild(paragraph);

        inputField.value = "";
        paragraph.addEventListener('click', function() {
            paragraph.classList.add('paragraph-click');
        })

        paragraph.addEventListener('dblclick', function() {
            toDoContainer.removeChild(paragraph);
        })

    } else {
        msg.innerText = "Le champ est vide!!";
        msg.style.color = "red";
        msg.style.textAlign = "center"

    }


}