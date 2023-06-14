import clubes from "../database/clubes.js";

const getAllClubs = async (req, res) => {
  try {
    let clubs = clubes;
    res.status(200).json({
      status: "succes",
      clubs,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error,
    });
  }
};

export const clubesControl = {
  getAllClubs,
};
