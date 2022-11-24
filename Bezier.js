import {Vector} from './Vector.js';
import {Bernstein} from './Bernstein.js';
export class Bezier {

    constructor(vectors) {
        this.vectors = vectors;
    }

    value(t) {
        let sum = new Vector(new Array(this.vectors[0].vec.length).fill(0));
        for(let i = 0; i<this.vectors.length;i++) {
            let bernstein = new Bernstein(this.vectors.length-1,i);
            sum = sum.add(this.vectors[i].mulScalar(bernstein.value(t)));
        }
        return sum;
    }

    derivative(t) {
        let sum = new Vector(new Array(this.vectors[0].vec.length).fill(0));
        for(let i = 0; i<this.vectors.length-1;i++) {
            let B = new Bernstein(this.vectors.length-2,i);
            sum = sum.add(this.vectors[i+1].sub(this.vectors[i]).mulScalar(B.value(t)));
        }
        return sum.mulScalar(this.vectors.length-1);
            
    }
}