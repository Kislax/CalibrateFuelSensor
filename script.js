let valueData = document.getElementById("valueData");
let fuelData = document.getElementById("fuelData");
let tbody = document.getElementsByClassName("tbody")[0];
let number = 0;
let csv = "data:text/csv;charset=utf-8,";

function save(){
    let encodedUri = encodeURI(csv);
//
//     // if you want to download
    let downloadLink = document.createElement("a");
    downloadLink.setAttribute("download", "FILENAME.csv");
    downloadLink.setAttribute("href", encodedUri);
    document.body.appendChild(downloadLink); // Required for FF
    downloadLink.click();
    downloadLink.remove();
}
function next() {
     // accept data as CSV
    csv += fuelData.value + ";" + valueData.value + ";" ; // concat form value on csv var and add ; to create columns (you can change to , if want)

    console.log("check", csv)
}


//
// function next()
// {
//
//     number++
//
//     let newRow = tbody.insertRow(tbody.rows.length)
//     let newCell = newRow.insertCell(0);
//     let newText = document.createTextNode(number);
//     newCell.appendChild(newText);
//     newCell = newRow.insertCell(1);
//     newText = document.createTextNode(fuelData.value);
//     newCell.appendChild(newText);
//     newCell = newRow.insertCell(2);
//     newText = document.createTextNode(valueData.value);
//     newCell.appendChild(newText);
//
//     valueData.value = "";
//     fuelData.value = "";
// }
