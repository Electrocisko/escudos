import clubes from "../database/clubes.js";

const randomClubId = () => {
  const max = 10;
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
    clubes: ThreeClubs,
  });
};

export const clubesControl = {
  getRandomClub,
};
