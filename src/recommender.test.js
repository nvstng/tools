import {readFileSync} from 'fs';

it('should pass', async function () {
    let x = readFileSync("./src/recommender.js", "utf8");
    x += "console.log(valuation(0.30));";
    x += "console.log(trendValuationAction('neg', valuation(0.30), true, 'UND'));";
    let eval2 = eval(x);
});
