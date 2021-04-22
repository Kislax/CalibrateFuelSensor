let valueData = document.getElementById("valueData"),
    fuelData = document.getElementById("fuelData"),
    tbody = document.getElementsByClassName("tbody")[0],
    workspace = document.getElementsByClassName("workspace"),
    createModal = document.getElementsByClassName("createFileBlock"),
    lastBlock = document.getElementsByClassName("lastFileBlock"),
    inputs= document.getElementsByClassName("input"),
    prevHeader = document.getElementsByClassName("prevDiv-header"),
    prevSensor = document.getElementsByClassName("prevDiv-sensor"),
    prevFuel = document.getElementsByClassName("prevDiv-fuel"),
    prevTotalFuel = document.getElementsByClassName("prevDiv-totalFuel"),
    prevData = document.getElementsByClassName("prevDiv-data"),
    header = document.getElementsByClassName("header"),
    headVisible = document.getElementsByClassName("headVisible"),
    btnNext = document.getElementsByClassName("btn-next"),
    listLastFiles = document.getElementsByClassName("listLastFiles"),
    carNumber = document.getElementById("carNumber"),
    startSensorValue = document.getElementById("startSensorValue"),
    fuelTank = document.getElementById("fuelTank"),
    btnResultTable = document.getElementsByClassName("prevDiv-resultTable"),
    tableBlock = document.getElementsByClassName("table-block"),
    storage = window.localStorage,
    table = null,
    row = {},
    fileList = [],
    file={},
    file32 = {
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

// convert arrows to csv file
function convertToCSV(arr){

}

function clearAll(){
    Storage.clear();
}

function next(){
    fileList =  JSON.parse(storage.getItem("fileList"))
    if (!fileList) {
        alert("Пожалуйста создайте файл")
    }

    file = fileList[fileList.length-1]
    if (file.table){
        let lastRow = file.table[file.table.length-1]
    }
    let lastRow="0"

 // TODO FIX CHECK VALUE FOR NEXT
 if ((lastRow) && (valueData.value === "" || fuelData.value === "" || valueData.value === lastRow.valueData && fuelData.value === lastRow.fuelData  )) {
    if (confirm("Вы уверены, что значения должны быть пустыми?")) {
        valueData.value = "0"
        fuelData.value = "0"
    }
 }else {

     if ((lastRow) &&  (lastRow.fuelData >= valueData.value || lastRow.fuelData >= fuelData.value)) {
         alert("Значения не могут быть меньше чем предыдущие")
     } else {
         const len = file.table.length
         row = {
             number: len + 1,
             valueTime: new Date().toLocaleTimeString(),
             valueData: valueData.value,
             fuelData: fuelData.value,
             totalFuelData: file.table.length ? file.table.reduce((a, b) => a + Number(b.fuelData), 0) + Number(fuelData.value) : Number(fuelData.value)
         }
         if (!file.table) {
             file.table = [row]
         } else {
             file.table = [...file.table, row]
         }

         //TODO FIX this logic

         // перезапись в массив файлов не происходит, выполняется только добавление.

         storage.setItem("fileList", JSON.stringify(fileList))

         valueData.value = "";
         fuelData.value = "";
         valueData.focus();
         addRowInTable(file.table);
     }
 }
}

// OPEN/CLOSED popup

function openCreateModal(){
    createModal[0].classList.toggle("active");
}

function closeCreateModal(){
    createModal[0].classList.toggle("active");
}


function openModalLastFile(){
    fileList = JSON.parse(storage.getItem("fileList"))

    lastBlock[0].classList.toggle("active");
    listLastFiles.innerHTML="";

    for(let i = 0; i < fileList.length; i++){
        let newRow = listLastFiles.insertRow(i)
        let newCell = newRow.insertCell(0);
        let newText = document.createTextNode( i + 1 );
        newCell.appendChild(newText);
        newCell = newRow.insertCell(1);
        newText = document.createTextNode( fileList[i].name );
        newCell.appendChild(newText);
        newCell = newRow.insertCell(2);
        newText = document.createTextNode( fileList[i].createDate );
    }
}


function closedModalLastFile(){
    lastBlock[0].classList.toggle("active");
}


//TODO create new file to localStorage, used data from input
function createFile() {
    if ( carNumber.value === "" || fuelTank.value === "" || startSensorValue.value === "" ) {
        if (confirm("Вы уверены, что значения должны быть пустыми?")) {
            carNumber.value = "X999XX"
            fuelTank.value = "1"
            startSensorValue.value = "0"
        }
    }
        let newFileName =  carNumber.value + "_Сетевой№" + fuelTank.value + "_Исполнитель" + new Date().toLocaleDateString()
        if(storage.getItem("fileList")) {
            fileList = JSON.parse(storage.getItem("fileList"))
        }
        if  (!!fileList.filter((a)=>a.name === newFileName)){
            alert("Такое имя уже существует, мы добавили к названию время")
            newFileName = new Date().toLocaleDateString() + newFileName
        }
            let  file={
                name: newFileName,
                table: [],
                data: new Date().toLocaleDateString()
            }
        if (!fileList){
            fileList=[file]
        }else {
            fileList = [...fileList, file]
        }
        storage.setItem("fileList", JSON.stringify(fileList))
        createModal[0].classList.remove("active");
}



//TODO open last file from list
function openLastFile(name){
        file.table = JSON.parse(storage.getItem(name))
        addRowInTable(file.table)
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













// * Inteface

btnResultTable[0].onclick = () => {
    tableBlock[0].classList.toggle("disable");
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






for (let i = 0 ; i < inputs.length; i++) {
    inputs[i].addEventListener("keypress", function (e) {
        if (e.which === 13) {
            e.preventDefault();
            let nextInput = document.querySelectorAll('[tabIndex="' + (this.tabIndex + 1) + '"]');
            if ((nextInput.length === 0) || (document.activeElement === btnNext[0])) {
                nextInput = document.querySelectorAll('[tabIndex="1"]');
            }
            nextInput[0].focus();

        }
    })
}
