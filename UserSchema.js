const mongoose= require('mongoose');

const Users=mongoose.Schema({
    username:{
        type: String,
        lowercase: true,
        required: true
    },
    password: {
        type:String,
        required:true
    }
})


const UserModel= mongoose.model("newModel", Users);


module.exports= UserModel;
