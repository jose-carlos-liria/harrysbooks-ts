const PRICE:number = 8.00;

export const initArray = (cart) => {
    var dp = [];

    var basket = [];
    basket[0] = typeof cart.get(1) !== "undefined" ? cart.get(1) : 0;
    basket[1] = typeof cart.get(2) !== "undefined" ? cart.get(2) : 0;
    basket[2] = typeof cart.get(3) !== "undefined" ? cart.get(3) : 0;
    basket[3] = typeof cart.get(4) !== "undefined" ? cart.get(4) : 0;
    basket[4] = typeof cart.get(5) !== "undefined" ? cart.get(5) : 0;

    //If we buy zero books
    var aux = [[0, 0, 0, 0, 0], 0.00];
    dp.push(aux);

    //If we buy only one book
    aux = [[0, 0, 0, 0, 1], PRICE];
    dp.push(aux);
    aux = [[0, 0, 0, 1, 0], PRICE];
    dp.push(aux);
    aux = [[0, 0, 0, 1, 1], PRICE * 2 * 0.95];        
    dp.push(aux);
    aux = [[0, 0, 1, 0, 0], PRICE];
    dp.push(aux);
    aux = [[0, 0, 1, 0, 1], PRICE * 2 * 0.95];    
    dp.push(aux);
    aux = [[0, 0, 1, 1, 0], PRICE * 2 * 0.95];    
    dp.push(aux);
    aux = [[0, 0, 1, 1, 1], PRICE * 3 * 0.90];    
    dp.push(aux);
    aux = [[0, 1, 0, 0, 0], PRICE];
    dp.push(aux);
    aux = [[0, 1, 0, 0, 1], PRICE * 2 * 0.95];    
    dp.push(aux);
    aux = [[0, 1, 0, 1, 0], PRICE * 2 * 0.95];    
    dp.push(aux);
    aux = [[0, 1, 0, 1, 1], PRICE * 3 * 0.90];    
    dp.push(aux);
    aux = [[0, 1, 1, 0, 0], PRICE * 2 * 0.95];    
    dp.push(aux);
    aux = [[0, 1, 1, 0, 1], PRICE * 3 * 0.90];    
    dp.push(aux);
    aux = [[0, 1, 1, 1, 0], PRICE * 3 * 0.90];    
    dp.push(aux);
    aux = [[0, 1, 1, 1, 1], PRICE * 4 * 0.80];    
    dp.push(aux);
    aux = [[1, 0, 0, 0, 0], PRICE];
    dp.push(aux);
    aux = [[1, 0, 0, 0, 1], PRICE * 2 * 0.95];
    dp.push(aux);
    aux = [[1, 0, 0, 1, 0], PRICE * 2 * 0.95];
    dp.push(aux);
    aux = [[1, 0, 0, 1, 1], PRICE * 3 * 0.90];    
    dp.push(aux);
    aux = [[1, 0, 1, 0, 0], PRICE * 2 * 0.95];
    dp.push(aux);
    aux = [[1, 0, 1, 0, 1], PRICE * 3 * 0.90];    
    dp.push(aux);
    aux = [[1, 0, 1, 1, 0], PRICE * 3 * 0.90];    
    dp.push(aux);
    aux = [[1, 0, 1, 1, 1], PRICE * 4 * 0.80];    
    dp.push(aux);
    aux = [[1, 1, 0, 0, 0], PRICE * 2 * 0.95];
    dp.push(aux);
    aux = [[1, 1, 0, 0, 1], PRICE * 3 * 0.90];    
    dp.push(aux);
    aux = [[1, 1, 0, 1, 0], PRICE * 3 * 0.90];    
    dp.push(aux);
    aux = [[1, 1, 0, 1, 1], PRICE * 4 * 0.80];    
    dp.push(aux);
    aux = [[1, 1, 1, 0, 0], PRICE * 3 * 0.90];    
    dp.push(aux);
    aux = [[1, 1, 1, 0, 1], PRICE * 4 * 0.80];    
    dp.push(aux);
    aux = [[1, 1, 1, 1, 0], PRICE * 4 * 0.80];    
    dp.push(aux);
    aux = [[1, 1, 1, 1, 1], PRICE * 5 * 0.75];    
    dp.push(aux);

    return [basket, dp];
}

/**
 * Returns true if aux can be belongs to a possible finale solution, otherwise returns false
 * 
 * @param { array } basket 
 * @param { array } si 
 * @param { array } aux 
 */
export const solution = (basket:number[], si:number[][], sol:number[]) => {
    var ps = [...sol];
    if (si.length > 0){
        for (var i:number = 0; i < si.length; i++){
            for (var j:number = 0; j < ps.length; j++){
                 ps[j] = si[i][j] + ps[j];
            }    
        }
    }    
    for (var i:number = 0; i < basket.length; i++){
        if ((basket[i] - ps[i]) < 0)
            return false
    }
    return true;
}

export const validSolution = (basket:number[], si:number[][]) => {
    var aux = [...basket];
    for (var i:number = 0; i < si.length; i++){
        var sol:number[] = si[i];
        for (var j = 0; j < aux.length; j++){
            //aux[j] = parseInt(aux[j] - sol[j]);
            aux[j] = aux[j] - sol[j];
        }
    }
    var distinctZero = aux.filter(item => item > 0);
    return distinctZero.length == 0 ? true : false;
}

export const checkOut = (cart:Map<number, number>) => {
    const [basket, dp] = initArray(cart);
    var voa:number = Number.POSITIVE_INFINITY;
    var value:number = 0;
    var soa = [];
    var si:number[][] = [];
    var level:number = 1;
    var i:number = 1;
    while (level < Math.pow(2, 5)){
        var aux = dp[i][0];
        if (solution(basket, si, aux)){
            si.push(aux);
            value = value + dp[i][1];
            i = level;
        }else if (i < (Math.pow(2, 5) - 1)){
            i++
        }else{
            level++;
            i = level;
            si = [];
            value = 0;
        }
        if (validSolution(basket, si)){
            if (value < voa){
                voa = value;
            }
            soa.push([si, value]);
            value = 0;            
            si = [];
            level++;
            i = level;            
        }
    }
    //console.log(voa);
    // //console.log(soa);
    // console.log(soa[8][0][1]);
    // for (var i = 0; i < soa.length; i++){
    //     console.log(soa[i])
    // }

    return voa;
}