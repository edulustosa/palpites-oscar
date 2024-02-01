import axios from "axios";
import { getOscarImg } from "../modules/oscarimg";

(async () => {
  try {
    const roomData = (await axios.get("/api/oscar-result")).data;

    if (roomData.oscar) {
      const result = getResult(roomData.members, roomData.oscar);
      setRanking(result);

      // await setMovieImgs(roomData.oscar);
    }
  } catch (err) {
    console.error(err);
  }
})();

function getResult(members, oscar) {
  const result = {};

  for (let category in oscar) {
    for (let member in members) {
      if (oscar[category] === members[member][category]) {
        result[member] = (result[member] || 0) + 1;
      }
    }
  }

  return result;
}

function setRanking(result) {
  const positions = document.querySelectorAll(".position");
  const ranking = Object.keys(result).sort((a, b) => result[b] - result[a]);

  positions.forEach((position, place) => {
    position.querySelector(".player").innerHTML = ranking[place];
    position.querySelector(".points").innerHTML = result[ranking[place]];
  });
}

async function setMovieImgs(oscar) {
  const imgs = document.querySelectorAll("img");
  const nominees = Object.values(oscar);

  for (let i = 0; i < imgs.length; i++) {
    imgs[i].alt = nominees[i];
    imgs[i].src = await getOscarImg(nominees[i]);
  }
}
