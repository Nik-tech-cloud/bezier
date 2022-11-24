import {Spline} from "./Spline.js";
import {Vector} from "./Vector.js";
import {Bezier} from "./Bezier.js";

window.addEventListener('load', () => {
    // we create a new canvas and give tis context
    let canvas = document.getElementById('Canvas');
    let button1 = document.getElementById('button1');
    let button2 = document.getElementById('button2');
    let button3 = document.getElementById('button3');
    let input = document.getElementById('favcolor');
    let ctx = canvas.getContext('2d');

    // variables
    let sizeOfConponents = 8;
    let listOfBeziers = [];
    let listOfNewVectors = [];
    let listOfSplines = [];
    let colourOfSplines = [];
    let activeSpline = 0;
    let editing = []; // if empty, no edit!

    // resize window function
    function resize() {
        canvas.height = window.innerHeight-100;
        canvas.width = window.innerWidth;
    }
    window.addEventListener('resize', resize);
    window.addEventListener('resize', drawStuff);
    resize();


    function drawStuff() {
        // clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // drawing points and sqares
        for (let index = 0; index < listOfSplines.length; index++) {
            drawPoints(listOfSplines[index]); 
        }

        //  drawing the spline
        for (let index = 0; index < listOfSplines.length; index++) {
            drawSpline(listOfSplines[index], colourOfSplines[index]); 
        }
    }

    // point drawing function
    function drawPoints(LOB) {
        for(let i = 0; i < LOB.length; i++) {
            for(let j = 0; j < LOB[i].vectors.length; j++) {
                if(j==0 || j==3) {
                    ctx.beginPath();
                    ctx.arc(LOB[i].vectors[j].vec[0], LOB[i].vectors[j].vec[1], sizeOfConponents/2, 0, 2*Math.PI);
                    ctx.fill();
                    ctx.closePath();
                } else {
                    ctx.fillRect(LOB[i].vectors[j].vec[0]-(sizeOfConponents/2),LOB[i].vectors[j].vec[1]-(sizeOfConponents/2),sizeOfConponents,sizeOfConponents);

                    
                }
            }
        }
    }


    // spline drawing function
    function drawSpline(LOB, colour) {
        // creating a spline from an existong list of beziers
        let spline = new Spline(LOB);
        spline.makeSmooth();
        spline.makeContinuous();
        ctx.beginPath();
        ctx.moveTo(spline.value(0).vec[0],spline.value(0).vec[1])
        for(let i=0; i < spline.listOfBeziers.length; i+= 0.01) {
            ctx.lineTo(spline.value(i).vec[0],spline.value(i).vec[1])
        }
        ctx.lineWidth = 1;
        ctx.strokeStyle = colour;
        ctx.stroke();
    }

    function findSpline(posX,posY) {
        for (let index = 0; index < listOfSplines.length; index++) {
            for (let index2 = 0; index2 < listOfSplines[index].length; index2++) {
                for (let index3 = 0; index3 < listOfSplines[index][index2].vectors.length; index3++) {
                    let X = listOfSplines[index][index2].vectors[index3].vec[0];
                    let Y = listOfSplines[index][index2].vectors[index3].vec[1];
                    if(posX-sizeOfConponents-5 < X && posX+sizeOfConponents+5 > X && posY-sizeOfConponents-5 < Y && posY+sizeOfConponents+5 > Y ) {
                        return [index, index2, index3];
                    }  
                }
            }
        }
        return [-1,-1,-1];
    }



    // start point drawing
    canvas.addEventListener('mousedown', (e) => {

        // editing
        if(findSpline(e.clientX,e.clientY)[0] >= 0) {
            editing = findSpline(e.clientX,e.clientY);

        // no editing
        }else {
            // if e.clientX in client Y sta v slizini neke tocke izbeti ta spline kot zeljen in 
            listOfNewVectors.push(new Vector([e.clientX, e.clientY]));
            // drawing temporary circles
            ctx.beginPath();
            ctx.arc(e.clientX, e.clientY, sizeOfConponents/2, 0, 2*Math.PI);
            ctx.fill();
            ctx.closePath();
        }
        
    });




    // endpoint drawing
    canvas.addEventListener('mouseup', (e) => {

        // editing
        if(editing.length > 0) {
            // move point
            listOfSplines[editing[0]][editing[1]].vectors[editing[2]].vec[0] = e.clientX;
            listOfSplines[editing[0]][editing[1]].vectors[editing[2]].vec[1] = e.clientY;

            // select new spline
            activeSpline = editing[0];
            listOfBeziers = listOfSplines[activeSpline];
            listOfNewVectors= [listOfSplines[editing[0]][editing[1]].vectors[2],listOfSplines[editing[0]][editing[1]].vectors[3]]
            editing = [];
            drawStuff();

        // no editing
        } else {
            listOfNewVectors.push(new Vector([e.clientX, e.clientY]));

            if (listOfNewVectors.length == 4) {
                // shifting 3rd and 2nd vector
                let vec1 = listOfNewVectors[3];
                listOfNewVectors[3] = listOfNewVectors[2];
                listOfNewVectors[2] = vec1; 
                listOfBeziers.push(new Bezier(listOfNewVectors));
                listOfSplines[activeSpline] = listOfBeziers;
                if(listOfSplines.length != colourOfSplines.length) {
                    colourOfSplines[activeSpline] = 'black';
                }
                // make contnous
                listOfNewVectors = [listOfNewVectors[3],(listOfNewVectors[2].add( (listOfNewVectors[3].sub(listOfNewVectors[2])).mulScalar(2) ))];
                drawStuff();
            }

            // drawing temporary sqares
            ctx.fillRect(e.clientX-(sizeOfConponents/2),e.clientY-(sizeOfConponents/2),sizeOfConponents,sizeOfConponents);
        }
    });

    //on button1 click
    button1.addEventListener('click', () => {
        listOfSplines.push(listOfBeziers);
        listOfBeziers = [];
        listOfNewVectors = [];
        activeSpline +=1;
        input.value = '#000000'
    });

    // colour changer
    button3.addEventListener('click', (e) => {
        colourOfSplines[activeSpline] = input.value;
        console.log(listOfSplines)
        drawStuff();
    });

    //the spline destroyer
    button2.addEventListener('click', () => {
        if (listOfSplines.length > 1) {
            listOfSplines.splice(activeSpline,1);
            colourOfSplines.splice(activeSpline,1)
            activeSpline = listOfSplines.length-1;
            listOfBeziers = listOfSplines[activeSpline];
            listOfNewVectors = [listOfBeziers[listOfBeziers.length-1].vectors[2],listOfBeziers[listOfBeziers.length-1].vectors[3]];
            drawStuff();
        }else { // in casre of last splene del --> we reset
            listOfSplines = [];
            colourOfSplines = [];
            activeSpline = 0;
            listOfBeziers = [];
            listOfNewVectors = [];
            drawStuff();
        }
    });


});
