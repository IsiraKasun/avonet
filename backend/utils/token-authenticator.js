const jwt = require('jsonwebtoken');
require('dotenv').config();


const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        res.status(401).json({ error: 'Token is required, Access denied' })
    } else {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET, (err, values) => {
            if (values) {
                req.user = values;
                next();
            } 

            if (err) {
                res.status(403).json({ error: 'Token is invalid, Access denied' })
            }
        });

    }
}

exports.authenticateToken = authenticateToken;
