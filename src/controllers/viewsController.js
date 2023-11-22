import { Record } from "../models/recordModel.js";


const indexController = async (req, res) => {
    let record = await Record.findOne();
   if(!record) record = {recordPoints: 0, recordTime:0}
    res.render('pages/index',{record})
}



export {
    indexController,
}