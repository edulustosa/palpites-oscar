const { Schema, model } = require("mongoose");

const RoomSchema = new Schema({
  name: { type: String, required: true },
  admin: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  members: [{ type: Schema.Types.ObjectId, ref: "Users" }],
});

const RoomModel = model("Rooms", RoomSchema);

class Room {
  constructor(name, adminId) {
    this.name = name;
    this.admin = adminId;
    this.error = null;
    this.info = null;
  }

  async create() {
    if (this.name.length < 3 || this.name.length > 25) {
      this.error = "Nome precisa ter de 3 a 25 caracteres";
      return null;
    }

    this.info = await RoomModel.create({
      name: this.name,
      admin: this.admin,
    });
  }

  static async get(roomId) {
    return await RoomModel.findById(roomId);
  }

  static async delete(roomId) {
    return await RoomModel.findOneAndDelete({ _id: roomId });
  }

  static async addMember(roomId, userId) {
    return await RoomModel.findByIdAndUpdate(
      roomId,
      { $addToSet: { members: userId } },
      { new: true }
    );
  }
}

module.exports = Room;
