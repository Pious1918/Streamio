
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import { IuserDocument } from '../models/userModel'

dotenv.config()


export const generateToken = (user:IuserDocument):string =>{
    const payload= {
        userId:user._id,
        name:user.name,
        email:user.email,
        role:user.role
    }

    //generating the token
    return jwt.sign(payload , process.env.JWT_SECRET as string , {

        expiresIn : process.env.JWT_EXPIRY || '1h'
    })
}

// export const generateAdminToken = (admin:IuserDocument):string =>{
//     const payload= {
//         userId:user._id,
//         email:user.email,
//         role:user.role
//     }

//     //generating the token
//     return jwt.sign(payload , process.env.JWT_SECRET as string , {

//         expiresIn : process.env.JWT_EXPIRY || '1h'
//     })
// }