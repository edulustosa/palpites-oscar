const Room = require("../models/RoomModel");
const User = require("../models/UserModel");

function predictions(req, res) {
  const predictions = req.session.user.predictions;
  return res.json(predictions);
}

async function oscarResult(req, res) {
  const roomId = req.session.room;
  const roomData = {
    members: {},
    oscar: {},
  };

  try {
    const room = await Room.get(roomId);

    for (let memberId of room.members) {
      const member = await User.get(memberId);
      roomData.members[member.username] = member.predictions;
    }

    roomData.oscar = {
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
  } catch (err) {
    console.error(err);
    return res.status(404);
  }

  return res.json(roomData);
}

module.exports = { predictions, oscarResult };
