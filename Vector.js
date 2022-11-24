export class Vector {
    constructor(vec) {
        this.vec = vec;
    }

    toArray() {
        return this.vec;
    }

    add(v) {
        let sum = new Array(this.vec.length);
        for (let i = 0; i < this.vec.length; i++) {
            sum[i] = this.vec[i] + v.vec[i];
        }
        return new Vector(sum);
    }

    sub(v) {
        let sub = new Array(this.vec.length);
        for (let i = 0; i < this.vec.length; i++) {
            sub[i] = this.vec[i] - v.vec[i];
        }
        return new Vector(sub);
        
    }

    mul(v) {
        let sum = new Array(this.vec.length);
        for (let i = 0; i < this.vec.length; i++) {
            sum[i] = this.vec[i] * v.vec[i];
        }
        return new Vector(sum);
    }

    div(v) {
        let sum = new Array(this.vec.length);
        for (let i = 0; i < this.vec.length; i++) {
            sum[i] = this.vec[i] / v.vec[i];
        }
        return new Vector(sum);
    }

    mulScalar(s) {
        let sum = new Array(this.vec.length);
        for (let i = 0; i < this.vec.length; i++) {
            sum[i] = this.vec[i] * s;
        }
        return new Vector(sum);
    }

    divScalar(s) {
        let sum = new Array(this.vec.length);
        for (let i = 0; i < this.vec.length; i++) {
            sum[i] = this.vec[i] / s;
        }
        return new Vector(sum);
    }
}
