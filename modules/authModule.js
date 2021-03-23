import jwt from 'jsonwebtoken';

const AuthUser = (req, res, next) => {
    if (!req.headers?.auth) {
        res.status(200).json({
            err: true,
            message: 'Authentication Failed'
        })
    } else {
        try {
            const result = jwt.verify(req.headers.auth, process.env.JWTKEY);
            req.userDetails = { user: result.user, phone: result.phone }
            next();
        } catch (e) {
            res.status(200).json({
                err: true,
                message: 'Authentication Failed'
            })
        }
    }
}

export default {
    AuthUser
};