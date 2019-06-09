var positionsButton = document.querySelector("#button1"),
    valuesButton = document.querySelector("#button2"),
    plottingButton = document.querySelector("#button3"),

    positionsDiv = document.querySelector("#output1"),
    valuesDiv = document.querySelector("#output2"),

    acquisitionTime = document.querySelector("#number");

//----------Promises----------//
var positionsPromise = new Promise(function(resolve, reject){
    button1.onchange = function(e){
        if(e.target){
            var reader = new FileReader();
            
            reader.onload = function(){
                var content = reader.result.substring();
                resolve(content);
            }
            reader.readAsText(e.target.files[0]);
        } else{
            reject("Error: promise not fulfilled.")
        }
    }
})

var valuesPromise = new Promise(function(resolve, reject){
    valuesButton.onchange = function(e){
        if(e.target){
            var reader = new FileReader();
            
            reader.onload = function(){
                var content = reader.result.substring();
                resolve(content);
            }
            reader.readAsText(e.target.files[0]);
        } else{
            reject("Error: promise not fulfilled.")
        }
    }
})

//----------Then Promises----------//
positionsPromise.then(function(resultPromise){
    var stringArray = resultPromise.split(/\t|\n/);

    window.positionsArray = stringArray.map(function(x){
        return parseInt(x,10);
    })

    positionsDiv.innerHTML = positionsArray
});

valuesPromise.then(function(resultPromise){
    var stringArray = resultPromise.split(/\t|\n/);

    window.valuesArray = stringArray.map(function(x){
        return parseInt(x,10);
    })

    valuesDiv.innerHTML = valuesArray
});


plottingButton.onclick = function(){
    //----------Arrays Assembling----------//
    //---Values Divided by Acquisition Time---//
    var valuesArrayTime = valuesArray.map(function(x){
        return x/acquisitionTime.value;
    })  

    //---Positions New Composition---//
    var positionArrayD = positionsArray,
        positionArrayA = positionsArray,
        positionArrayC = positionsArray,
        positionArrayB = positionsArray;

    //---Values New Composition---//
    var valuesArrayD = valuesArrayTime.splice(0,64),
        valuesArrayA = valuesArrayTime.splice(0,64),
        valuesArrayC = valuesArrayTime.splice(0,64),
        valuesArrayB = valuesArrayTime.splice(0,64);


//----------Mapping Section----------//
    //---Assigning Values---//
    var emptyObjectA = {},
        emptyObjectB = {},
        emptyObjectC = {},
        emptyObjectD = {};


//----------Mapping Section----------//
    //---Assigning Values---//
    var emptyObjectA = {},
        emptyObjectB = {},
        emptyObjectC = {},
        emptyObjectD = {};

    function assigningValues(positionArr, valuesArr, object){
        positionArr.forEach(function(key,i){
            object[key] = valuesArr[i];
        })
        return object
    }

    var objectA = assigningValues(positionArrayA, valuesArrayA, emptyObjectA),
        objectB = assigningValues(positionArrayB, valuesArrayB, emptyObjectB),
        objectC = assigningValues(positionArrayC, valuesArrayC, emptyObjectC),
        objectD = assigningValues(positionArrayD, valuesArrayD, emptyObjectD);
    
    //---Converting Objects to Arrays---//
    var emptyArrayA=[],
        emptyArrayB=[],
        emptyArrayC=[],
        emptyArrayD=[];

    function arrayConverter(object,array){
        for(var value in object){
            array.push(object[value]);
        }
        return array;
    }

    var arrayA = arrayConverter(objectA, emptyArrayA),
        arrayB = arrayConverter(objectB, emptyArrayB),
        arrayC = arrayConverter(objectC, emptyArrayC),
        arrayD = arrayConverter(objectD, emptyArrayD);

        console.log(arrayA)

    //---Converting Arrays to Matrices---//
    var emptyMatrixA=[],
        emptyMatrixB=[],
        emptyMatrixC=[],
        emptyMatrixD=[];

    function matrixConverter(array,matrix){
        var i,j,cutArray,chunk=8;
        for(i=0, j=array.length;i<j;i+=chunk){
            cutArray=array.slice(i,i+chunk);
            matrix.push(cutArray);
        }
        return matrix;
    }

    var matrixA = matrixConverter(arrayA, emptyMatrixA),
        matrixB = matrixConverter(arrayB, emptyMatrixB),
        matrixC = matrixConverter(arrayC, emptyMatrixC),
        matrixD = matrixConverter(arrayD, emptyMatrixD);


//----------Transposition Section----------//
    //---A Transposition---//
    for (var i=0; i<matrixA.length; i++){
        matrixA[i].reverse();
    }

    //---B Transposition---
    for (var i=0; i<matrixB.length; i++){
        matrixB[i].reverse();
    }

    //---C Transposition---
    for (var i=0; i<matrixC.length; i++){
        matrixC[i].reverse();
    }

    //---D Transposition---
    for (var i=0; i<matrixD.length; i++){
        matrixD[i].reverse();
    }

//----------Plotting Section----------//
    //---A Plotting---//
    var layoutA = {
        title: "Photodetector Tube 1",
        titlefont: {size: 20},
        margin: {
            t: 50,
            r: 0,
            b: 30,
            l: 40
        }
    };

    var arrayAPlot = [{
        z: matrixA,
        x: ['1','2','3','4','5','6','7','8'],
        y: ['1','2','3','4','5','6','7','8'],
        type: 'heatmap'    
    }];
    
    Plotly.newPlot("myDivA", arrayAPlot, layoutA, {displaylogo: false});

    //---B Plotting---
    var layoutB = {
        title: "Photodetector Tube 2",
        titlefont: {size: 20},
        margin: {
            t: 50,
            r: 0,
            b: 30,
            l: 40
        }
    };

    var arrayBPlot = [{
        z: matrixB,
        x: ['1','2','3','4','5','6','7','8'],
        y: ['1','2','3','4','5','6','7','8'],
        type: 'heatmap'    
    }];
    
    Plotly.newPlot("myDivB", arrayBPlot, layoutB, {displaylogo: false});

    // ---C Plotting---
    var layoutC = {
        title: "Photodetector Tube 3",
        titlefont: {size: 20},
        margin: {
            t: 50,
            r: 0,
            b: 30,
            l: 40
        }
    };

    var arrayCPlot = [{
        z: matrixC,
        x: ['1','2','3','4','5','6','7','8'],
        y: ['1','2','3','4','5','6','7','8'],
        type: 'heatmap'    
    }];

    Plotly.newPlot("myDivC", arrayCPlot, layoutC, {displaylogo: false});

    //---D Plotting---
    var layoutD = {
        title: "Photodetector Tube 4",
        titlefont: {size: 20},
        margin: {
            t: 50,
            r: 0,
            b: 30,
            l: 40
        }
    };

    var arrayDPlot = [{
        z: matrixD,
        x: ['1','2','3','4','5','6','7','8'],
        y: ['1','2','3','4','5','6','7','8'],
        type: 'heatmap'    
    }];
    
    Plotly.newPlot("myDivD", arrayDPlot, layoutD, {displaylogo: false});

}