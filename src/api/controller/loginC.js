// const User = require("../models/userM");
// const Foreigner = require("../models/foreignerM");
// const { login_validation } = require("../validation/loginValidation.js");
// const bcryptjs = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const LocalStorage = require("node-localstorage").LocalStorage;
// localStorage = new LocalStorage("./scratch");
//
// const login = async(req, res, next) => {
//     // validating input fields whether empty
//     const { error } = login_validation(req.body);
//
//     // checking whether the error is available
//     if(error) {
//         res.send({ message: error["details"][0]["message"] });
//     } else {
//         const passengerExist = await User.findOne({
//             type: req.body.type,
//         });
//
//         const inspectorExist = await User.findOne({
//             type: req.body.type,
//         });
//
//         const foriegnerExist = await Foreigner.findOne({
//             nicType: req.body.nicType,
//         });
//
//         // if the user is a local passenger
//         if(passengerExist) {
//             console.log("Passenger Login!");
//
//             // decrypting the password
//         }
//     }
// };