"use strict";
const SteelcoilsslittingMainAbl = require("../../abl/steelcoilsslitting-main-abl.js");

class SteelcoilsslittingMainController {
  init(ucEnv) {
    return SteelcoilsslittingMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  load(ucEnv) {
    return SteelcoilsslittingMainAbl.load(ucEnv.getUri(), ucEnv.getSession());
  }

  loadBasicData(ucEnv) {
    return SteelcoilsslittingMainAbl.loadBasicData(ucEnv.getUri(), ucEnv.getSession());
  }
}

module.exports = new SteelcoilsslittingMainController();
