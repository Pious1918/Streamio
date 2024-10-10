
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
    subscribers?: mongoose.Types.ObjectId; // Array of subscribers
    following?: mongoose.Types.ObjectId;  
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
        type:String,
        default:'noImage'
    },
    role:{ 
        type: String, 
        
        default: 'user' 
    }, 
    status:{ 
        type: String, 
       
        default: 'active' 
    }, 
    subscribers:{
        type:mongoose.Types.ObjectId,
        ref:'StreamioUser'
    },
    following:{
        type:mongoose.Types.ObjectId,
        ref:'StreamioUser'
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