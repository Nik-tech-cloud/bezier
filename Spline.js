import {Vector} from './Vector.js';
import {Bezier} from './Bezier.js';
export class Spline {
    constructor(curves) {
        this.listOfBeziers = curves;
    }


    value(t) {
        for(let i = 0; i < this.listOfBeziers.length; i++){
            if(t >= i && t <= i + 1){
                return this.listOfBeziers[i].value(t - Math.floor(t));
            }
        }
    }

    derivative(t) {
        for(let i = 0; i < this.listOfBeziers.length; i++){
            if(t >= i && t <= i + 1){
                return this.listOfBeziers[i].derivative(t - Math.floor(t));
            }
        }
    }

    makeContinuous() {
        let i = 0;
        while(i < this.listOfBeziers.length-1){
            // calculate the new vector
            var vec = (this.listOfBeziers[i].vectors[this.listOfBeziers[i].vectors.length-1].add(this.listOfBeziers[i+1].vectors[0])).divScalar(2);
            // add the new vector to the list instead of old vectors
            this.listOfBeziers[i].vectors[this.listOfBeziers[i].vectors.length-1] = vec;
            this.listOfBeziers[i+1].vectors[0] = vec;
            i++;
        }
    }

    makeSmooth() {
        let i = 0;
        while(i < this.listOfBeziers.length-1){
            // arithmetic median 
            let der = (this.listOfBeziers[i].derivative(1).add(this.listOfBeziers[i+1].derivative(0))).divScalar(2);
            this.listOfBeziers[i].vectors[this.listOfBeziers[i].vectors.length-2] = (this.listOfBeziers[i].vectors[this.listOfBeziers[i].vectors.length-1]).sub(der.divScalar(this.listOfBeziers[i].vectors.length-1))
            this.listOfBeziers[i+1].vectors[1] = (this.listOfBeziers[i+1].vectors[0]).add(der.divScalar(this.listOfBeziers[i].vectors.length-1));
            i++;
        }

    }
}