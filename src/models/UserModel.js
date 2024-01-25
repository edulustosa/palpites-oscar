const { Schema, model } = require("mongoose");
const bcryptjs = require("bcryptjs");
const { isEmail } = require("validator");

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  predictions: { type: Object, default: {} },
  rooms: [{ type: Schema.Types.ObjectId, ref: "Rooms" }],
});

const UserModel = model("Users", UserSchema);

class User {
  constructor(body) {
    this.username = body.username;
    this.email = body.email;
    this.password = body.password;
    this.error = null;
    this.data = null;
  }

  async validate() {
    if (this.username.length < 3 || this.username.length > 20) {
      this.error = "Nome de usuário precisa ter de 3 a 20 caracteres";
      return false;
    }

    if (!isEmail(this.email)) {
      this.error = "E-mail inválido";
      return false;
    }

    if (await User.exists(this.email)) {
      this.error = "Usuário já existe";
      return false;
    }

    if (this.password.length < 8 || this.password.length > 20) {
      this.error = "Senha precisa ter de 8 a 20 caracteres";
      return false;
    }

    return true;
  }

  async save() {
    const salt = bcryptjs.genSaltSync();
    this.password = bcryptjs.hashSync(this.password, salt);

    this.data = await UserModel.create({
      username: this.username,
      email: this.email,
      password: this.password,
    });
  }

  async login() {
    if (!isEmail(this.email)) {
      this.error = "E-mail inválido";
      return;
    }

    if (this.password.length < 8 || this.password.length > 20) {
      this.error = "Senha precisa ter de 8 a 20 caracteres";
      return;
    }

    this.data = await UserModel.findOne({ email: this.email });

    if (!this.data) {
      this.error = "Usuário não existe";
      return;
    }

    if (!bcryptjs.compareSync(this.password, this.data.password)) {
      this.error = "Senha incorreta";
      this.data = null;
      return;
    }
  }

  static async exists(email) {
    const user = await UserModel.findOne({ email });
    return !!user;
  }
}

module.exports = User;
