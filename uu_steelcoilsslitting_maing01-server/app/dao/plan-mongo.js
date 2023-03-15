"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class PlanMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
    await super.createIndex({ awid: 1, date: 1 });
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async list(awid, pageInfo) {
    const filter = { awid };
    return await super.find(filter, pageInfo, { date: -1 });
  }

  async delete(awid, id) {
    await super.deleteOne({ awid, id });
  }
}

module.exports = PlanMongo;
