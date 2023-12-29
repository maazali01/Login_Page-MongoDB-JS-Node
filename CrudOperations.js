const model= require('./UserSchema');

const addUser= async(username, password)=>{
    let one= new model();
    one.username= username;
    one.password= password;
    await one.save();
    return one;
}
const getUserByUsernameAndPassword = async (username, password) => {
    // Find a user with the given username and password in the database
    const user = await model.findOne({ username, password });
    return user;
}

module.exports.addUser= addUser;
module.exports.getUserByUsernameAndPassword=getUserByUsernameAndPassword;

