const Room = require("../models/RoomModel");
const User = require("../models/UserModel");

async function render(req, res) {
  const roomsIds = req.session.user.rooms;
  const userId = req.session.user._id;
  const rooms = {
    participating: [],
    admin: [],
  };

  try {
    const user = await User.get(userId);
    req.session.user = user;
    req.session.save();

    for (let roomId of roomsIds) {
      const room = await Room.get(roomId);
      rooms.participating.push({ id: room._id, name: room.name });

      if (room.admin.equals(userId)) {
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
      req.session.room = room.info._id;
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

async function enter(req, res) {
  const roomId = req.params.id;
  req.session.room = roomId;

  const userId = req.session.user._id;
  const membersPredictions = {};
  const oscarResult = {
    "Melhor documentário curta": "Island In Between",
    "Melhor curta animado": "Ninety-Five Senses",
    "Melhor curta": "Red, White and Blue",
    "Melhores efeitos visuais":
      "Missão: Impossível - Acerto de Contas Parte Um",
    "Melhor fotografia": "O Conde",
    "Melhor edição": "Pobres Criaturas",
    "Melhor som": "Resistência",
    "Melhor design de produção": "Assassinos da Lua das Flores",
    "Melhor maquiagem e penteados": "Oppenheimer",
    "Melhor design de figurino": "Assassinos da Lua das Flores",
    "Melhor documentário": "As 4 Filhas de Olfa",
    "Melhor animação": "Elementos",
    "Melhor filme internacional": "Perfect Days",
    "Melhor trilha original": "Assassinos da Lua das Flores",
    "Melhor canção original": "It Never Went Away - American Symphony",
    "Melhor roteiro adaptado": "American Fiction",
    "Melhor roteiro original": "Segredos de um Escândalo",
    "Melhor atriz coadjuvante": "America Ferrera",
    "Melhor ator coadjuvante": "Ryan Gosling",
    "Melhor atriz": "Carey Mulligan",
    "Melhor ator": "Colman Domingo",
    "Melhor diretor": "Yorgos Lanthimos",
    "Melhor filme": "Barbie",
  };

  try {
    let room = await Room.get(roomId);

    if (room) {
      if (!room.members.includes(userId)) {
        req.session.room = await Room.addMember(roomId, userId);
        req.session.user = await User.addRoom(userId, roomId);
        room = await Room.get(roomId);
      }

      for (let memberId of room.members) {
        const member = await User.get(memberId);
        membersPredictions[member.username] = member.predictions;
      }

      req.session.save();
    } else {
      req.flash("error", "Sala não existe");
      return req.session.save(() => res.redirect("/salas"));
    }
  } catch (err) {
    console.error(err);
    req.flash("error", "Não foi possível entrar na sala");
    return req.session.save(() => res.redirect("/salas"));
  }

  res.render("room", { membersPredictions, oscarResult });
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
    return req.session.save(() => res.redirect("back"));
  } catch (err) {
    console.error(err);
    req.flash("error", "Não foi possível excluir");
    return req.session.save(() => res.redirect("back"));
  }
}

module.exports = { render, create, enter, remove };
