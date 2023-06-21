import clubes from "../database/clubes.js";

const randomClubId = () => {
  const max = 10;
  const min = 1;
  const idClub = Math.floor(Math.random() * (max - min + 1) + min);
return idClub
}


// const getAllClubs = async (req, res) => {
//   try {
//     res.status(200).json({
//       status: "succes",
//       clubes,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: error,
//     });
//   }
// };

const getAllClubs =  (req, res) => {
  res.render('pages/index',{clubes: clubes})
};

const getRandomClub = (req,res)=> {
  const idClub = randomClubId()
  const club = clubes.find( (item) => item.id == idClub  )

  try {
    res.render('pages/escudo',{club})
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error,
    });
  }
}

export const clubesControl = {
  getAllClubs,
  getRandomClub
};
