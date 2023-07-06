import session from "express-session";


const indexController = (req, res) => {
    res.render('pages/index')
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