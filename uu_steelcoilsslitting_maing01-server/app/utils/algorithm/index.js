"use strict";

const { Algorithm } = require("./Algorithm");
const { Roll } = require("./Roll");
const { Strip } = require("./Strip");

const runAlgorithm = (input) => {
  const rolls = [];
  const strips = [];

  input.rolls.forEach((roll) => {
    rolls.push(new Roll(roll.weight, roll.serie, input.thickness, input.width));
  });

  input.strips.forEach((strip) => {
    strips.push(new Strip(strip.width, strip.neededWeight));
  });

  const result = Algorithm.run(rolls, strips, input.minWaste, input.maxWaste, input.overweight);
  if (!result || !result.rollsUsedForMerge.length) return null;

  return mapForClient(result);
};

function mapForClient(result) {
  const output = {};

  if (result.output.length > 0) {
    const mapa = result.output[0]._strips;
    const arrayOfStrips = [];
    if (mapa) {
      mapa.forEach((key, value) => {
        const obj = {};
        obj[key] = {
          currentWeight: value._currentWeight,
          neededWeight: value._neededWeight,
          width: value._width,
        };
        arrayOfStrips.push(obj);
      });

      output.strips = arrayOfStrips;
    }
  }

  output.usedRolls = result.rollsUsedForMerge.map((roll) => ({ serie: roll._serie, weight: roll._weight }));
  output.unusedRolls = result.output.slice(1).map((roll) => ({ serie: roll._serie, weight: roll._weight }));

  return output;
}

module.exports.runAlgorithm = runAlgorithm;
