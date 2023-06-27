import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import User from "../models/User.js"

/* REGISTER USER */
export const register = async(req, res) => {
    try{
        // user has registered by providing all these properties, and these properties are being saved in API
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body

        // Hashed the password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt)

        // created the user for logging functionality, same details, just some additional difference for logging in and other stuff
        const newUser = new User ({
            firstName,
            lastName,
            email,
            password : passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile : Math.floor(Math.random() * 10000),
            impressions : Math.floor(Math.random() * 10000)
        })

        // saved the user to our database
        const savedUser = await newUser.save();

        // if user is successfully saved -> this would be returned
        res.status(201).json(savedUser);

    }catch(err){ // if any error occurs -> this would be returned
        res.status(500).json( {error : err.message });
    }
}

/* LOGGING IN */
export const login = async (req, res) => {
    try{
        const {email, password } = req.body;

        const user = await User.findOne( { email : email } );
        if(!user) return res.status(400).json({ msg : "User does not exist. "})

        const isMatch = await bcrypt.compare(password, user.password );
        if(!isMatch) return res.status(400).json( {msg: "Invalid credentials." } );
 
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET )
        
        delete user.password;
        
        res.status(200).json( { token, user } );
    
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}













