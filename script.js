let valueData = document.getElementById("valueData"),
    fuelData = document.getElementById("fuelData"),
    tbody = document.getElementsByClassName("tbody")[0],
    workspace = document.getElementsByClassName("workspace"),
    createModal = document.getElementsByClassName("createFileBlock"),
    prevDiv = document.getElementsByClassName("prevDiv"),
    prevHeader = document.getElementsByClassName("prevDiv-header"),
    prevSensor = document.getElementsByClassName("prevDiv-sensor"),
    prevFuel = document.getElementsByClassName("prevDiv-fuel"),
    prevTotalFuel = document.getElementsByClassName("prevDiv-totalFuel"),
    prevData = document.getElementsByClassName("prevDiv-data"),
    header = document.getElementsByClassName("header"),
    headVisible = document.getElementsByClassName("headVisible"),
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

//TODO convert arrows to csv file
function convertToCSV(arr){

}

function clearAll(){
    Storage.clear();
}

function next(){
    const len = file.arr.length
    file.arr.map(a => console.log(a.totalFuelData))
    row = {
        number:len+1,
        valueTime:new Date().toLocaleTimeString(),
        valueData:valueData.value,
        fuelData:fuelData.value,
        totalFuelData: file.arr.length ? file.arr.reduce((a, b) => a + Number(b.fuelData), 0) +  Number(fuelData.value) : Number(fuelData.value)
    }
    if (!file.arr){
        file.arr = [row]
    }else{
        file.arr = [...file.arr, row]
    }

    storage.setItem(file.name, JSON.stringify(file.arr))

    valueData.value = "";
    fuelData.value = "";
    addRowInTable(file.arr);
}


function openCreateModal(){
    workspace[0].classList.toggle("dimmer");
    createModal[0].classList.toggle("active");
}

function closeCreateModal(){
    workspace[0].classList.toggle("dimmer");
    createModal[0].classList.toggle("active");
}

//TODO create new obj to localStorage, used data from input
function createFile(){

}

//TODO open view list last files from localStorage
function openModalLastFile(){

}

//TODO closed view list last files from localStorage
function closedModalLastFile(){

}

//TODO open last file from list
function openLastFile(){

        file.arr = JSON.parse(storage.getItem("tar"))
        addRowInTable(file.arr)
}

//TODO edit rows value
function editRow(rowNumber){

}

//TODO save row in local storage
function saveEditingRow(){

}


//TODO used this function to create SCV file

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



function addRowInTable(arr) {
    let number = 1;
    tbody.innerHTML = '';
    for(let i = 0; i < arr.length; i++){
        let newRow = tbody.insertRow(i)
        let newCell = newRow.insertCell(0);
        let newText = document.createTextNode( number );
        newCell.appendChild(newText);
        newCell = newRow.insertCell(1);
        newText = document.createTextNode( arr[i].valueTime );
        newCell.appendChild(newText);
        newCell = newRow.insertCell(2);
        newText = document.createTextNode( arr[i].valueData );
        newCell.appendChild(newText);
        newCell = newRow.insertCell(3);
        newText = document.createTextNode( arr[i].fuelData );
        newCell.appendChild(newText);
        newCell = newRow.insertCell(4);
        newText = document.createTextNode(arr[i].totalFuelData);
        newCell.appendChild(newText);
        number++
        prevSensor[0].innerHTML = "ДУТ: " + arr[i].valueData;
        prevFuel[0].innerHTML = "Литров: " + arr[i].fuelData ;
        prevTotalFuel[0].innerHTML = "Всего литров: " + arr[i].totalFuelData ;
        }

    //TODO fix prev value sensor
    valueData.value = "";
    fuelData.value = "";
}

prevHeader[0].onclick = () => {
    prevData[0].classList.toggle("disable");
}

headVisible[0].onclick = () => {
    header[0].classList.toggle("hide");
    headVisible[0].classList.toggle("headVisible-down");
    workspace[0].classList.toggle("upWorkspace");
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
