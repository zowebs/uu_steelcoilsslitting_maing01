"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/plan-error.js");
const { runAlgorithm } = require("../utils/algorithm");

const WARNINGS = {
  deleteUnsupportedKeys: {
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`,
  },
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`,
  },
};

class PlanAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("plan");
  }

  async delete(awid, dtoIn) {
    let uuAppErrorMap = {};
    let dtoOut = {};

    //HDS 1
    let validationResult = this.validator.validate("deleteDtoInType", dtoIn);

    //A1
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    //HDS 2
    try {
      dtoOut = await this.dao.delete(awid, dtoIn.id);
    } catch (e) {
      throw new Errors.Delete.PlanDeleteFailed({ uuAppErrorMap }, e);
    }

    return dtoOut;
  }

  async list(awid, dtoIn) {
    let uuAppErrorMap = {};

    //HDS 1
    let validationResult = this.validator.validate("planListDtoInType", dtoIn.pageInfo);

    //A1
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    //HDS 2
    const dtoOut = await this.dao.list(awid, dtoIn);

    //HDS return dtoOut
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async create(awid, dtoIn) {
    let uuAppErrorMap = {};
    let dtoOut = {};

    //HDS 1
    let validationResult = this.validator.validate("createDtoInType", dtoIn);

    //A1
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    //HDS 2
    const output = runAlgorithm(dtoIn);

    dtoOut = {
      output,
      input: dtoIn,
      date: new Date(),
      awid,
    };

    //HDS 3
    try {
      await this.dao.create(dtoOut);
    } catch (e) {
      throw new Errors.Create.PlanCreateFailed({ uuAppErrorMap }, e);
    }

    return dtoOut;
  }
}

module.exports = new PlanAbl();
