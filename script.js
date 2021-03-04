let valueData = document.getElementById("valueData"),
    fuelData = document.getElementById("fuelData"),
    tbody = document.getElementsByClassName("tbody")[0],
    workspace = document.getElementsByClassName("workspace"),
    createModal =document.getElementsByClassName("createFileBlock"),
    storage = window.localStorage,
    table = null,
    row = {},
file = {
    name:"tar",
    csv:"data:text/csv;charset=utf-8,",
    arr:[]
};
//TODO export csv file
function save(){
    let encodedUri = encodeURI(file.csv);
//
//     // if you want to download
    let downloadLink = document.createElement("a");
    downloadLink.setAttribute("download", file.name + ".csv");
    downloadLink.setAttribute("href", encodedUri);
    document.body.appendChild(downloadLink); // Required for FF
    downloadLink.click();
    downloadLink.remove();
}
function next(){
    row = {
        valueData:valueData.value,
        fuelData:fuelData.value,
    }
    if (!file.arr){
        file.arr = [row]
    }else{
        file.arr = [...file.arr, row]
    }

    storage.setItem(file.name, JSON.stringify(file.arr))

    valueData.value = "";
    fuelData.value = "";
    createTable(file.arr);
}
//TODO add class modal-window
function createFile(){
    workspace.classList.add("dimmer");
    createModal.classList.add("active");
}

// function nixt() {
//      // accept data as CSV
//     file.csv += fuelData.value + "; " + valueData.value + "\r\n" ; // concat form value on csv var and add ; to create columns (you can change to , if want)
//     valueData.value = "";
//     fuelData.value = "";
//     console.log("check", file.csv)
//
//     // storage.setItem(file.name, file.csv)
//     Table(file.arr)
// }


function openFile(){
    console.log(storage.getItem("tar"))
    file.arr = JSON.parse(storage.getItem("tar"))
    createTable(file.arr)
}

function createTable(arr) {
    let number = 1;
    tbody.innerHTML = '';
    for(let i = 0; i < arr.length; i++){
        let newRow = tbody.insertRow(i)
        let newCell = newRow.insertCell(0);
        let newText = document.createTextNode(number);
        newCell.appendChild(newText);
        newCell = newRow.insertCell(1);
        newText = document.createTextNode(arr[i].valueData);
        newCell.appendChild(newText);
        newCell = newRow.insertCell(2);
        newText = document.createTextNode(arr[i].fuelData);
        newCell.appendChild(newText);
        number++
        }
    valueData.value = "";
    fuelData.value = "";
}
// function makeTable ( csv ) {
//         tbody.removeChild("");
//         csv = csv.split("data:text/csv;charset=utf-8,")
//     let rows = csv[1].split("\r\n"),
//         tr = null, td = null,
//         tds = null;
//     for ( let i = 0; i < rows.length; i++ ) {
//         tr = document.createElement('tr');
//         tds = rows[i].split(';');
//         for ( let j = 0; j < tds.length; j++ ) {
//             td = document.createElement('td');
//             td.innerHTML = tds[j];
//             tr.appendChild(td);
//         }
//         tbody.appendChild(tr);
//     }
//
//     document.appendChild(tbody);
//
// }
//

//
//
//

//
//     valueData.value = "";
//     fuelData.value = "";
//
