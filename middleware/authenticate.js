const jwt = require("jsonwebtoken")
const { User } = require("../models/User");
const authenticate = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "")
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded._id)
        if (!user) {
            throw new Error();
        }
        req.token = token
        req.user = user
        next()

    } catch (error) {
        return res.send({ message: "please Authenticate" })
        // console.log(error)
    }
}
module.exports = authenticate;