
const indexController = (req, res) => {
    res.render('pages/index')
}


const loginController = (req,res) => {
    res.render('pages/login')
}

export {
    indexController,
    loginController
}