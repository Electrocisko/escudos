import session from "express-session";


const indexController = (req, res) => {
    if(!req.session.player) return res.redirect('/login');
    res.render('pages/index',{player: req.session.player})
}


const registerController = (req,res) => {
        res.render('pages/register')
    }

const loginController = (req,res) => {
    res.render('pages/login')
}


export {
    indexController,
    registerController,
    loginController
}