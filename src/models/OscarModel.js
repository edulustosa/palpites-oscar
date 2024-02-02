const { Schema, model } = require("mongoose");
const { compareSync } = require("bcryptjs");
const { isEmail } = require("validator");

const OscarSchema = new Schema(
  {
    email: String,
    password: String,
    results: Object,
  },
  { collection: "oscar" }
);

const OscarModel = model("oscar", OscarSchema);

class OscarWinner {
  constructor(winners) {
    this.winners = winners;
  }

  async save(email) {
    return await OscarModel.findOneAndUpdate(
      { email },
      { $set: { results: this.winners } },
      { new: true }
    );
  }

  static async results() {
    const { results } = await OscarModel.findById(process.env.OSCARID);
    return results || {};
  }

  static async login(email, password) {
    if (!isEmail(email)) return false;

    const oscarData = await OscarModel.findOne({ email });

    if (!oscarData) return false;

    if (!compareSync(password, oscarData.password)) return false;

    return true;
  }
}

module.exports = OscarWinner;
