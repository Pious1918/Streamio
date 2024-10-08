
import mongoose , {Document , Schema} from "mongoose";

export interface IuserDocument extends Document{
    name : string;
    email : string;
    password : string;
    phonenumber : string;
    country : string;
    profilepicture:string;
    role: string; // User role field
    createdAt : Date;
    updatedAt : Date;

}



const userSchema : Schema = new Schema({

    name:{
        type:String,
        required:true,
        unique : true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phonenumber:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    profilepicture:{
        type:String
    },
    role:{ 
        type: String, 
        enum: ['user', 'admin'], 
        default: 'user' 
    }, // Default role is user
    status:{ 
        type: String, 
       
        default: 'active' 
    }, 
    
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
})

const userModel = mongoose.model<IuserDocument>('StreamioUser' , userSchema)

export default userModel;