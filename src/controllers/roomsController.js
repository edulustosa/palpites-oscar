const Room = require("../models/RoomModel");
const User = require("../models/UserModel");

async function render(req, res) {
  const roomsIds = req.session.user.rooms;
  const rooms = {
    participating: [],
    admin: [],
  };

  try {
    const user = await User.exists(req.session.user.email);
    req.session.user = user;
    req.session.save();

    for (let roomId of roomsIds) {
      const room = await Room.get(roomId);
      rooms.participating.push({ id: room._id, name: room.name });

      if (room.admin.equals(req.session.user._id)) {
        rooms.admin.push({ id: room._id, name: room.name });
      }
    }
  } catch (err) {
    req.flash("error", "Não foi possível carregar salas");
  }

  res.render("rooms", { rooms });
}

async function create(req, res) {
  const roomName = req.body["room-name"];
  const adminId = req.session.user._id;

  const room = new Room(roomName, adminId);

  try {
    await room.create();

    if (room.info) {
      req.session.room = room.info;
      req.session.user = await User.addRoom(adminId, room.info._id);

      req.flash("success", "Sala criada");
      return req.session.save(() =>
        res.redirect(`/salas/entrar/${room.info._id}`)
      );
    } else {
      req.flash("error", room.error);
      return req.session.save(() => res.redirect("back"));
    }
  } catch (err) {
    console.error(err);
    req.flash("error", "Não foi possível criar sala");
    return req.session.save(() => res.redirect("back"));
  }
}

function enter(req, res) {
  res.render("room");
}

async function remove(req, res) {
  const roomId = req.params.id;

  try {
    const room = await Room.get(roomId);
    if (!room.admin.equals(req.session.user._id)) {
      req.flash("error", "Você não é admin dessa sala");
      return req.session.save(() => res.redirect("back"));
    }

    await User.removeRoom(req.session.user._id, roomId);

    for (let memberId of room.members) {
      await User.removeRoom(memberId, roomId);
    }

    await Room.exclude(roomId);
    return req.session.save(() => res.redirect("/salas"));
  } catch (err) {
    console.error(err);
    req.flash("error", "Não foi possível excluir");
    return req.session.save(() => res.redirect("back"));
  }
}

module.exports = { render, create, enter, remove };
