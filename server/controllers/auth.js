// path inside the require should not be "User" (1st letter capitalize)
// or we will have the following error:
// MongooseError [OverwriteModelError]: Cannot overwrite `User` model once compiled.
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/settings");

const simplify = (error) => {
	let simple_Error = {};

	// Handling "is already registered" error
	if (error.code === 11000) {
		// console.log(error);
		simple_Error["username"] = `That username is already registered.`;
	}

	// Handling FrontEnd User Error
	for (let key in error.errors) {
		simple_Error[key] = error["errors"][key]["message"];
	}

	// incorrect email
	if (error.message == "Incorrect username") {
		simple_Error.email = "That username is not registered";
	}

	// incorrect email
	if (error.message == "Incorrect password") {
		simple_Error.password = "That password is not correct";
	}

	console.log({ error: simple_Error });
	return { error: simple_Error };
};

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
	return jwt.sign({ id }, secret, {
		expiresIn: maxAge,
	});
};

// prettier-ignore
module.exports = {
    signin: async (req, res, next) => {
        const { username, password } = req.body;

        try {
            const loggedInUser = await User.login(username, password);

            // i did not want to return user, because, I could not show the hashed password to the client
            // that's why I created a new variable called foundUser
            const foundUser = await User
                                        .findByIdAndUpdate(loggedInUser._id, { connected: true }, {new: true})
                                        .select("-password")

            const token = createToken(foundUser._id);
            res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

            res.status(201).json(foundUser);
        } catch (error) {
            console.log(error);
        }
    },
    signup: async (req, res, next) => {
        const {
			username,
			fullname,
			email,
			phone_number,
			category,
			password,
			profile_image_uri,
		} = req.body;
        try {
            const savedUser = await User.create({
				username,
				fullname,
				email,
				phone_number,
				category,
				password,
				profile_image_uri,
			});

            const foundUser = await User
                                .findById(savedUser._id)
                                .select("-password");

            res.status(201).json(foundUser);
        } catch (error) {
            res.status(400).json(simplify(error));
        }
    },
    logout: async (req, res, next) => {
        // logout
    },
};
