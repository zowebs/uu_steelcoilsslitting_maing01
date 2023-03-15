"use strict";

const SteelcoilsslittingMainUseCaseError = require("./steelcoilsslitting-main-use-case-error.js");
const PLAN_ERROR_PREFIX = `${SteelcoilsslittingMainUseCaseError.ERROR_PREFIX}plan/`;

const Create = {
  UC_CODE: `${PLAN_ERROR_PREFIX}create/`,

  InvalidDtoIn: class extends SteelcoilsslittingMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  PlanCreateFailed: class extends SteelcoilsslittingMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}planCreateFailed`;
      this.message = "Creating plan failed.";
    }
  },
};

const List = {
  UC_CODE: `${PLAN_ERROR_PREFIX}list/`,

  InvalidDtoIn: class extends SteelcoilsslittingMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const Delete = {
  UC_CODE: `${PLAN_ERROR_PREFIX}delete/`,

  InvalidDtoIn: class extends SteelcoilsslittingMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  PlanDeleteFailed: class extends SteelcoilsslittingMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}planDeleteFailed`;
      this.message = "Deleting plan failed.";
    }
  },
};

module.exports = {
  Delete,
  List,
  Create,
};
