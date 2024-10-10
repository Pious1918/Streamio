import { Router } from "express";

import {  Middleware } from "../middlewares/authMiddleware";
import { UserController } from "../controllers/userController";
import userModel from "../models/userModel";
import FollowingModel from "../models/followingModel";
import SubscriberModel from "../models/subscribersModel";


const userController = new UserController()
const middleWare = new Middleware()
const router = Router()


router.post('/register', userController.registerUser)
router.get('/check-email', userController.checkEmail)

router.post('/login', userController.loginuser)
// router.get('/userprofile', getUserProfile)

router.get('/userprofile',middleWare.authorize, userController.getUserProfile)
router.get('/getbycode', middleWare.authorize, userController.getUserProfile)

router.get('/home' , middleWare.authorize, (req,res)=>{
    res.status(200).json({message:'welcome to home page' , user:(req as any).user});
    
})
router.get('/users', middleWare.authorize, async (req: any, res) => {
    try {
        const nameQuery = req.query.name;
        const loggedInUserName = req.user?.name; 
        console.log("Searching for users with query:", nameQuery);

        // MongoDB query to exclude the logged-in user by name
        const users = await userModel.find({
            $and: [
                { name: { $regex: nameQuery, $options: 'i' } },
                { name: { $ne: loggedInUserName } } 
            ]
        });

        console.log("Users found:", users);
        res.json(users);
    } catch (error) {
        console.log("Error occurred:", error);
        res.status(500).send('Server error');
    }
});
router.post('/subscribe', middleWare.authorize, async (req: any, res) => {
    try {
        const userId = req.user.userId; // Get the logged-in user's ID from the token
        const { channelId } = req.body; // E
        console.log("userId",userId)
        console.log("chaneel id",channelId)
        const newfollowing = new FollowingModel({
            userId:userId,
            followingUserId:channelId
        })

        const newSubscriber = new SubscriberModel({
            userId:channelId,
            subscribedUserId:userId

        })
        await newfollowing.save();
        await newSubscriber.save();
        
    } catch (error) {
        console.log("Error occurred:", error);
        res.status(500).send('Server error');
    }
});


router.post('/update',middleWare.authorize, userController.updateUserData)






// Admin routes 
router.post('/adminlogin', userController.adminLogin)
router.post('/adminregister', userController.registerAdmin)
router.get('/admindash', userController.loadAdminDashboard)


export default router