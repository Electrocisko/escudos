import {clubes1, clubes2} from "../database/clubes.js";


const clubes = clubes1.concat(clubes2);


const randomClubId = () => {
  const max = clubes.length;
  const min = 1;
  const idClub = Math.floor(Math.random() * (max - min + 1) + min);
  return idClub;
};

const getRandomClub = (req, res) => {
  const ThreeClubs = [];
  let club;
  let idClub;
  let duplicate;
  do {
    idClub = randomClubId();
    duplicate = ThreeClubs.findIndex((item) => item.id == idClub);
    if (duplicate == -1) {
      club = clubes.find((item) => item.id == idClub);
      ThreeClubs.push(club);
    }
  } while (ThreeClubs.length < 3);

  res.status(200).json({
    ThreeClubs
  });
};

export const clubesControl = {
  getRandomClub,
};
