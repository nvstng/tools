import {it} from "@jest/globals";
import {txDataImport} from "./estimator.js";

it('should calc txDataImport', function () {
    console.log(txDataImport(1, 20000));
    console.log(txDataImport(2, 20000));
    console.log(txDataImport(5, 20000));
    console.log(txDataImport(10, 20000));
});
