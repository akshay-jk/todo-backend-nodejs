import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from './userModel.js'

async function userSignup(req, res) {

    let { phone, username, password } = req.body;
    let salt = parseInt(process.env.BSALT);

    if (phone && username && password) {
        let duplicateCheck = await User.findOne({
            username: username
        });

        if (duplicateCheck !== null) {
            res.status(200).json({
                err: false,
                message: 'User Name already exist'
            })
        } else {
            let hash = bcrypt.hashSync(password, salt);
            let userAddition = new User({
                username: username,
                hash: hash,
                userphone: phone,
                created_date: Date.now()
            });
            await userAddition.save();
            res.status(200).json({
                err: false,
                message: 'Sign Up Success'
            })
        }
    }
}

async function userLogin(req, res) {

    let { username, password } = req.body;

    if (username && password) {
        let userCheck = await User.findOne({
            username: username
        });

        if (userCheck == null) {
            res.status(200).json({
                err: true,
                message: 'No account found'
            })
        } else {
            let passwordCheck = bcrypt.compareSync(password, userCheck.hash);
            if (passwordCheck) {
                let payloadForToken = { user: userCheck.username, phone: userCheck.userphone };
                let token = jwt.sign(payloadForToken, process.env.JWTKEY, { expiresIn: '1h' });
                res.status(200).json({
                    err: false,
                    message: 'Authentication Succesfull',
                    token: token
                })
            } else {
                res.status(200).json({
                    err: false,
                    message: `Password wrong`
                })
            }
        }
    } else {
        res.status(200).json({
            err: true,
            message: 'Credentials missing'
        });
    }

}

async function viewTodoList(req, res) {
    res.status(200).json({
        err: false,
        message: 'Nice'
    })
}

async function addTodoList(req, res) {
    //
}
export default {
    userSignup,
    userLogin,
    viewTodoList,
    addTodoList
}