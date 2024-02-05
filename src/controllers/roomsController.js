const Oscar = require("../models/OscarModel");
const Room = require("../models/RoomModel");
const User = require("../models/UserModel");

async function render(req, res) {
  const userId = req.session.user._id;
  const rooms = {
    participating: [],
    admin: [],
  };

  try {
    const user = await User.get(userId);
    req.session.user = user;
    req.session.save();

    const roomsIds = req.session.user.rooms;

    if (roomsIds.length > 0) {
      for (let roomId of roomsIds) {
        const room = await Room.get(roomId);
        rooms.participating.push({ id: room._id, name: room.name });

        if (room.admin.equals(userId)) {
          rooms.admin.push({ id: room._id, name: room.name });
        }
      }
    }
  } catch (err) {
    console.error(err);
    req.flash("error", "Não foi possível carregar salas");
    req.session.save(() => res.redirect("back"));
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
      req.session.room = room.info._id;
      req.session.user = await User.addRoom(adminId, room.info._id);

      req.flash("success", "Sala criada");
      return req.session.save(() => res.redirect("back"));
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

async function enter(req, res) {
  const roomId = req.params.id;
  req.session.room = roomId;

  const userId = req.session.user._id;
  const membersPredictions = {};

  try {
    let room = await Room.get(roomId);

    if (room) {
      if (!room.members.includes(userId)) {
        room = await Room.addMember(roomId, userId);
        req.session.user = await User.addRoom(userId, roomId);
      }

      for (let memberId of room.members) {
        const member = await User.get(memberId);
        membersPredictions[member.username] = member.predictions;
      }

      const oscarResult = await Oscar.results();
      return req.session.save(() =>
        res.render("room", { membersPredictions, oscarResult })
      );
    } else {
      req.flash("error", "Sala não existe");
      return req.session.save(() => res.redirect("/salas"));
    }
  } catch (err) {
    console.error(err);
    req.flash("error", "Não foi possível entrar na sala");
    return req.session.save(() => res.redirect("/salas"));
  }
}

async function remove(req, res) {
  const roomId = req.params.id;
  const userId = req.session.user._id;

  try {
    const room = await Room.get(roomId);

    if (!room.admin.equals(userId)) {
      req.flash("error", "Você não é admin dessa sala");
      return req.session.save(() => res.redirect("back"));
    }

    await User.removeRoom(userId, roomId);

    for (let memberId of room.members) {
      await User.removeRoom(memberId, roomId);
    }

    await Room.delete(roomId);

    req.flash("success", "Sala excluída");
    return req.session.save(() => res.redirect("back"));
  } catch (err) {
    console.error(err);
    req.flash("error", "Não foi possível excluir");
    return req.session.save(() => res.redirect("back"));
  }
}

module.exports = { render, create, enter, remove };
