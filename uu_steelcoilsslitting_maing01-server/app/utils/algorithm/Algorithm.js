"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Algorithm = void 0;
var Roll_1 = require("./Roll");
var Algorithm = /** @class */ (function () {
    function Algorithm() {
    }
    Algorithm.run = function (rolls, strips, minWaste, maxWaste, percentAbove) {
        this.MIN_WASTE = minWaste;
        this.MAX_WASTE = maxWaste;
        this.MAX_PERCENT_ABOVE_LIMIT = percentAbove;
        this.START_TIME = new Date().getTime();
        var output = this.createConnections(rolls, strips);
        if (this.TIME_OUT) {
            this.TIME_OUT = false;
            this.STOP_REQUIRED = false;
            return false;
        }
        return {
            output: output,
            rollsUsedForMerge: this.ROLLS_USED_FOR_MERGE,
        };
    };
    /**
     * @param rolls pole svitků
     * @param strips pole pásek
     * @returns pole svitků, kde první svitek je spojenina, a za ním jsou ty, co vypadli
     */
    Algorithm.createConnections = function (rolls, strips) {
        var thrownAwayRolls = [];
        var times = rolls.length;
        for (var i = 0; i < times; i++) {
            var occurences = this.countMaxOccurences(rolls, strips);
            var mergedRollWeight = rolls
                .map(function (roll) { return roll.weight; })
                .reduce(function (a, b) { return a + b; }, 0);
            var mergedRoll = new Roll_1.Roll(mergedRollWeight, "1", rolls[0].thickness, rolls[0].width);
            this.ROLLS_USED_FOR_MERGE = rolls;
            var stripLenghts = this.runStripFinder(occurences, strips, mergedRoll);
            // console.log(stripLenghts);
            var areLenghtsFound = stripLenghts.reduce(function (a, b) { return a + b; }, 0) > 0;
            if (!areLenghtsFound) {
                console.log("No match found, removing roll");
                thrownAwayRolls.push(rolls.pop());
                continue;
            }
            var mapped = this.mapStripsWithLength(strips, stripLenghts);
            mergedRoll.strips = mapped;
            this.addWeightToStrips(mergedRoll);
            // console.log(mergedRoll);
            thrownAwayRolls.unshift(mergedRoll);
            this.STOP_REQUIRED = false;
            break;
        }
        return thrownAwayRolls;
    };
    /**
     * @param rolls pole svitků
     * @param  strips pole pásek
     * @returns pole s maximálním počtem pásek co se vejde do sloučení všech svitků
     */
    Algorithm.countMaxOccurences = function (rolls, strips) {
        var maxOccurences = [];
        var rollsWidth = rolls[0].width;
        var rollsWeight = rolls
            .map(function (roll) { return roll.weight; })
            .reduce(function (a, b) { return a + b; }, 0);
        for (var i = 0; i < strips.length; i++) {
            var strip = strips[i];
            var weightOfOneStrip = (rollsWeight / rollsWidth) * strip.width;
            var stillNeededWeight = strip.neededWeight - strip.currentWeight;
            var stillNecessaryStrips = Math.ceil(stillNeededWeight / weightOfOneStrip);
            while (stillNecessaryStrips * weightOfOneStrip >
                stillNeededWeight * this.MAX_PERCENT_ABOVE_LIMIT) {
                if (stillNecessaryStrips === 0)
                    break;
                stillNecessaryStrips--;
            }
            var numberOfMaxOccurences = Math.ceil(rollsWidth / strip.width);
            while (numberOfMaxOccurences * weightOfOneStrip >
                stillNeededWeight * this.MAX_PERCENT_ABOVE_LIMIT) {
                if (numberOfMaxOccurences === 0)
                    break;
                numberOfMaxOccurences--;
            }
            maxOccurences[i] = Math.min(stillNecessaryStrips, numberOfMaxOccurences);
        }
        return maxOccurences;
    };
    /**
     * @param  occurences pole počtů pásek
     * @param  strips pole pásek
     * @param  roll svitek
     * @returns  pole s šířkama pásek jak se vejdou do svitku
     */
    Algorithm.runStripFinder = function (occurences, strips, roll) {
        if (occurences.length !== strips.length || occurences.length === 0) {
            console.error("CRITICAL ERROR, runStripFinder");
        }
        var stripLenghts = strips.map(function (strip) { return strip.width; });
        // hledání funguje tak, že se zkouší od posledního prvku, je nutné otočit pole od indexu 1 do konce
        var modifiedOccurences = this.reverseElementsExceptOfFirst(occurences);
        var modifiedStripLenghts = this.reverseElementsExceptOfFirst(stripLenghts);
        console.log("Occurences: INITIAL->SORTED", occurences, modifiedOccurences);
        console.log("Strips: INITIAL->SORTED", stripLenghts, modifiedStripLenghts);
        var saveHere = [];
        for (var first = modifiedOccurences[0]; first >= 0; first--) {
            if (this.STOP_REQUIRED)
                break;
            var currentIndexes = [first];
            this.tryCombination(modifiedOccurences, modifiedStripLenghts, roll, 1, currentIndexes, saveHere);
        }
        var finalVersion = this.reverseElementsExceptOfFirst(saveHere);
        return finalVersion;
    };
    /**
     * rekurzivně hledá výsledek pro naskládání pásek do svitku, který pak uloží do pole "saveHere"
     * @param  occurences pole s maximálními výskyty
     * @param  stripLenghts délky pásek
     * @param  roll svitek
     * @param  index momentální index
     * @param  currentIndexes momentální počty pásek na pozicích
     * @param  saveHere pole, kam se uloží výsledek
     */
    Algorithm.tryCombination = function (occurences, stripLenghts, roll, index, currentIndexes, saveHere) {
        if (new Date().getTime() - this.START_TIME > this.MAX_RUN_TIME_MILIS) {
            this.STOP_REQUIRED = true;
            this.TIME_OUT = true;
        }
        if (occurences.length === 1) {
            var one_noRefCurrentIndexes = __spreadArray([], currentIndexes, true);
            var one_sum = one_noRefCurrentIndexes[0] * stripLenghts[0];
            console.log(one_noRefCurrentIndexes, "sum_ofOne: ".concat(one_sum));
            var one_isOk = this.isCorrect(roll, one_sum, saveHere, one_noRefCurrentIndexes, stripLenghts);
            if (one_isOk)
                return;
        }
        if (occurences.length <= index || this.STOP_REQUIRED)
            return;
        for (var cycle = 0; cycle <= occurences[index]; cycle++) {
            if (this.STOP_REQUIRED)
                break;
            var noRefCurrentIndexes = __spreadArray(__spreadArray([], currentIndexes, true), [cycle], false);
            var sum = 0;
            for (var i = 0; i <= index; i++) {
                sum += noRefCurrentIndexes[i] * stripLenghts[i];
            }
            console.log(noRefCurrentIndexes, "sum: ".concat(sum));
            var isOk = this.isCorrect(roll, sum, saveHere, noRefCurrentIndexes, stripLenghts);
            if (isOk)
                return;
            this.tryCombination(occurences, stripLenghts, roll, index + 1, noRefCurrentIndexes, saveHere);
        }
    };
    /**
     * @param array pole prvků
     * @returns pole, kde 0. index je na svém místě, ale ostatní jsou v opačném pořadí
     */
    Algorithm.reverseElementsExceptOfFirst = function (array) {
        var first = array[0], others = array.slice(1);
        others.reverse();
        return __spreadArray([first], others, true);
    };
    /**
     * vytvoří mapu, kde se k páskám přiřadí jejich počty
     * @param  strips pásky
     * @param  lenghts počty pásek
     * @returns  mapa pásek-jejich počtů
     */
    Algorithm.mapStripsWithLength = function (strips, lenghts) {
        if (strips.length !== lenghts.length) {
            console.error("CRITICAL ERROR, mapStripsWithLengtg");
            // console.log(strips, lenghts);
            return null;
        }
        var result = new Map();
        for (var i = 0; i < strips.length; i++) {
            result.set(strips[i], lenghts[i]);
        }
        return result;
    };
    /**
     * přidá vyrobené váhy do pásek v daném svitku
     * @param roll svitek
     */
    Algorithm.addWeightToStrips = function (roll) {
        var strips = roll.strips;
        if (!strips)
            return;
        strips.forEach(function (value, key) {
            var weightOfOneStrip = (roll.weight / roll.width) * key.width;
            var weightOfAllStrips = weightOfOneStrip * value;
            key.addWeight(weightOfAllStrips);
        });
    };
    /**
     * určí, zda je požadovaná kombinace vhodná do svitku, pokud ano, vrátí true
     * pokud ne, tak false
     * pole příp. uloží do parametru saveHere
     * @param  roll svitek
     * @param  sum součet délek
     * @param  saveHere pole, kam se uloží výsledek
     * @param  currentIndexes momentální počty pásek na pozicích
     * @param  stripLenghts délky pásek
     * @returns true/false podle toho zda se povedlo či nikoliv
     */
    Algorithm.isCorrect = function (roll, sum, saveHere, currentIndexes, stripLenghts) {
        if (roll.width - this.MAX_WASTE * 2 <= sum &&
            sum <= roll.width - this.MIN_WASTE * 2) {
            console.log("MATCH FOUND", currentIndexes);
            saveHere.push.apply(saveHere, currentIndexes);
            var saveHereLength = saveHere.length;
            var mustHave = stripLenghts.length;
            var missing = mustHave - saveHereLength;
            for (var x = 0; x < missing; x++)
                saveHere.push(0); //doplní nuly, aby bylo pole stejné velikosti a nedělalo to pak bordel, pokud se najde kombinace zrovna když je tam nějaký svitek 0x
            this.STOP_REQUIRED = true;
            return true;
        }
        return false;
    };
    Algorithm.STOP_REQUIRED = false;
    Algorithm.MAX_RUN_TIME_MILIS = 15000;
    Algorithm.TIME_OUT = false;
    return Algorithm;
}());
exports.Algorithm = Algorithm;
