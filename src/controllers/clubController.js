import clubes from "../database/clubes.js";

const randomClubId = () => {
  const max = 10;
  const min = 1;
  const idClub = Math.floor(Math.random() * (max - min + 1) + min);
return idClub
}

const getRandomClub = (req,res) => {
  const ThreeClubs = [];   
  let club; 
  let idClub;
  for(let i=0;i<3;i++) {
    idClub = randomClubId()
    club = clubes.find( (item) => item.id == idClub);
    ThreeClubs.push(club)
  }
 res.status(200).json({
  clubes: ThreeClubs
 })
}

export const clubesControl = {
  getRandomClub,

};
