// src/controllers/AuthController

const jwt = require('jsonwebtoken');
class AuthController {

    login = async (req, res, next) =>{
        try {
            const {username, password} = req.body;

            // check username and password
            // if true => create jwt token
            const token = jwt.sign({ username }, 'secret_key');

            res.status(200).json({
                token: token
            })

        } catch (error) {
            next(error)
        }
    }
    
}

module.exports = new AuthController();