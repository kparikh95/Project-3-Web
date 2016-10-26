/**
 * Created by Krushan on 7/26/2016.
 */
var count = 0;


function onStart() { //This function creates the grid
    var table = document.createElement('table');
    table.id = "grid";


    for (var i = 1; i <= 20; i++){
        var tr = document.createElement('tr');
        for (var j = 1; j <= 20; j++){
            var td = document.createElement('td');
            td.class = "b1";

            td.onmousedown = function() {
                if(this.className != "b2"){
                    this.className = "b2";
                }
                else{
                    this.removeAttribute("Class");
                }
            }
            tr.appendChild(td);
            table.appendChild(tr);
        }
    }
    document.body.appendChild(table);



}
//incerement 23 generation
function inc23(){
    count +=23; //generation counter
    document.getElementById("gene").innerHTML = "Generation:" + "" + count;
    var g1 = document.getElementById('grid'); //creating the grid on the table
    var a1 = convertToArr(g1); //converting to array
    for(var i = 0; i < 23; ++i) {
        a1 = getNextGenArr(a1);
    }
    modifyGrid(g1, a1);
}

//incerement 1 generation
function inc1(){
    count++; //generation counter
    document.getElementById("gene").innerHTML = "Generation:" + "" + count;
    var g1 = document.getElementById('grid'); //creating the grid on the table
    var a1 = convertToArr(g1); //converting to array
    a1 = getNextGenArr(a1);
    modifyGrid(g1, a1);
}

//clearing the table
function reset(){
    count = 0; //setting the generation counter back to 0
    document.getElementById("gene").innerHTML = "Generation:" + "" + count;
    var g1 = document.getElementById('grid');
    var a1 = getResetArr();
    modifyGrid(g1, a1);
}

//
function modifyGrid(g1, a1){
    for(var i = 0; i < g1.childNodes.length; ++i){
        for(var j = 0; j < g1.childNodes[i].childNodes.length; ++j){
            g1.childNodes[i].childNodes[j].className = a1[i][j] ? 'b2' : 'b1';
        }
    }
}

//how to get the clear grid when reset button is pressed
function getResetArr(){
    var a3 = [];
    for(var i = 0; i < 20; ++i){
        a3.push([]);
        for(var j = 0; j < 20; ++j){
            a3[i].push(false);
        }
    }
    return a3;
}

function isValid(i, j){
    return i >= 0 && j >= 0 && i < 20 && j < 20;
}

//rules and checks of the game
function LiveCells(arr, i, j){
    var total = 0;
    if(isValid(i - 1, j - 1) && arr[i - 1][j - 1]) total += 1;
    if(isValid(i - 1, j)     && arr[i - 1][j]) total += 1;
    if(isValid(i - 1, j + 1) && arr[i - 1][j + 1]) total += 1;
    if(isValid(i, j - 1)     && arr[i][j - 1]) total += 1;
    if(isValid(i, j + 1)     && arr[i][j + 1]) total += 1;
    if(isValid(i + 1, j - 1) && arr[i + 1][j - 1]) total += 1;
    if(isValid(i + 1, j)     && arr[i + 1][j]) total += 1;
    if(isValid(i + 1, j + 1) && arr[i + 1][j + 1]) total += 1;
    return total;
}

//the array for the next generation
function getNextGenArr(arr){
    var arr1 = [];
    for(var i = 0; i < 20; ++i){
        arr1.push([]);
        for(var j = 0; j < 20; ++j){
            var neighboursCell = LiveCells(arr, i, j);
            if(arr[i][j]){
                if(neighboursCell < 2 || neighboursCell > 3)
                    arr1[i].push(false);
                else
                    arr1[i].push(true);
            }
            else{
                if(neighboursCell === 3){
                    arr1[i].push(true);
                }
                else{
                    arr1[i].push(false);
                }
            }
        }
    }
    return arr1;
}

function convertToArr(grid){
    var arr = [];
    for(var i = 0; i < grid.childNodes.length; ++i){
        arr.push([]);
        for(var j = 0; j < grid.childNodes[i].childNodes.length; ++j){
            arr[i].push(alive(grid.childNodes[i].childNodes[j]));
        }
    }
    return arr;
}

function alive(td){
    return td.className === 'b2';
}