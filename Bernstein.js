export class Bernstein {

    constructor(n, k) {
        this.n = n;
        this.k = k;
    }


    value(x) {
        return this.binomial(this.n, this.k) * ((1 - x) ** (this.n-this.k)) * (x**this.k);
    }

    // calculates the binom on (n, k)
    binomial(n, k) {
        if ((typeof n !== 'number') || (typeof k !== 'number')) 
            return false;
        var coeff = 1;
        for (var x = n-k+1; x <= n; x++) coeff *= x;
        for (x = 1; x <= k; x++) coeff /= x;
        return coeff;
    }


    // calculates the derivatve of the bernstein polynomial using https://math.stackexchange.com/questions/2164549/bernstein-polynomial-derivative rule
    derivative(x) {
        return this.n * (
            this.binomial(this.n-1, this.k-1) * ((1 - x) ** ((this.n-1)-(this.k-1))) * (x**(this.k-1)) - 
            this.binomial(this.n-1, this.k) * ((1 - x) ** ((this.n-1)-this.k)) * (x**this.k)
            )
    }



}