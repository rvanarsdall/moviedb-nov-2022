// take the token that is provided by request object (headers: authorization)
// check to see if the token is expired. if it is expired provide a response back to the user
// if the token is valid we will create a variable to contain the user's information based off of the ID we caputured in the creation of the token.
const jwt= require("jsonwebtoken")
const User = require("../models/user.model")
const validateSession = async (req,res, next)=>{

    try {
        const token = req.headers.authorization
        //  verify the token to see if it is expired and it will extract the payload
        const decodedToken = await jwt.verify(token,process.env.JWT)
        console.log(decodedToken)

        const user = await User.findById(decodedToken.id)

        if(!user){
            throw Error ("User Not Found")
        }

        req.user = user

        req.test = "THIS IS A TEST"
       return next()
    } catch (error) {
        res.json({message: error.message})
    }


}

module.exports = validateSession