import { Router } from "express";

import {  Middleware } from "../middlewares/authMiddleware";
import { UserController } from "../controllers/userController";


const userController = new UserController()
const middleWare = new Middleware()
const router = Router()


router.post('/register', userController.registerUser)
router.get('/check-email', userController.checkEmail)

router.post('/login', userController.loginuser)
// router.get('/userprofile', getUserProfile)

router.get('/userprofile',middleWare.authorize, userController.getUserProfile)

router.get('/home' , middleWare.authorize, (req,res)=>{
    res.status(200).json({message:'welcome to home page' , user:(req as any).user});
    
})
router.post('/update', userController.updateUserData)






// Admin routes 
router.post('/adminlogin', userController.adminLogin)
router.post('/adminregister', userController.registerAdmin)
router.get('/admindash', userController.loadAdminDashboard)


export default router