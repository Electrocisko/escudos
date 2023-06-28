import { clubes1, clubes2, clubes3 } from "../database/clubes.js";

const randomClubId = () => {
  const max = clubes.length;
  const min = 1;
  const idClub = Math.floor(Math.random() * (max - min + 1) + min);
  return idClub;
};

let clubes;

const getRandomClub = (req, res) => {
  const level = req.params.level;
  const ThreeClubs = [];
  let club;
  let idClub;
  let duplicate;

  if (level == 1) {
    clubes = clubes1;
  }
  if (level == 2) {
    clubes = clubes1.concat(clubes2);
  }
  if (level == 3) {
    clubes = clubes1.concat(clubes2).concat(clubes3);
  }

  do {
    idClub = randomClubId();
     duplicate = ThreeClubs.findIndex((item) => item.id == idClub);
    if (duplicate == -1) {
      club = clubes.find((item) => item.id == idClub);
      ThreeClubs.push(club);
    } 
  } while (ThreeClubs.length < 3);

  res.status(200).json({
    ThreeClubs,
  });
};

export const clubesControl = {
  getRandomClub,
};
