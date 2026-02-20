"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.heavyComputation = heavyComputation;
function heavyComputation() {
    const start = Date.now();
    while (Date.now() - start < 5000) {
        Math.sqrt(Math.random());
    }
}
//# sourceMappingURL=index.js.map