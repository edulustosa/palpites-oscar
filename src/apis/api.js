const OscarWinner = require("../models/OscarModel");
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

    roomData.oscar = await OscarWinner.results();
  } catch (err) {
    console.error(err);
    return res.status(404);
  }

  return res.json(roomData);
}

module.exports = { predictions, oscarResult };
