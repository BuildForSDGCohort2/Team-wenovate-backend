const connect = require("../models/Connect");
const createConnect = require("../helpers/createConnect");

class Connect {
  /**
   *  @param {object} req
   *  @param {object} res
   *  @return {object} response data
   *  @memeberof Connect class
   */
  static async addConnect(req, res) {
    try {
      // const {title,description,connectType,userId} = req.body;
      const addConnect = await connect.create({ ...req.body });

      return res
        .status(201)
        .json({ message: "connect added", data: createConnect(addConnect) });
    } catch (error) {
      res.status(400).json({ message: "an error occurred", error });
    }
  }
  /***
   * @param {object} req
   * @param {object} res
   * @return {object} response data
   * @memberof Connect class
   */
  static async fetchConnect(req, res) {
    try {
      let { limit } = req.query;
      limit = limit || 10;
      const getConnect = await connect.find({}).limit(limit);
      // .populate("ser")
      return res
        .status(200)
        .json({ message: "connect fetched", data: getConnect });
    } catch (error) {
      return res.status(400).json({ message: "an error occurred", error });
    }
  }
}
module.exports = Connect;
