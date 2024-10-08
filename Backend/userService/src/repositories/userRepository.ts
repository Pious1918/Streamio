import adminModel, { IadminDocument } from "../models/adminModel";
import userModel, { IuserDocument } from "../models/userModel";
//writes queries based on the database interaction



export class userRepository {


    //create a new user
    async createUser(userData: Partial<IuserDocument>): Promise<IuserDocument> {
        const user = new userModel(userData)
        console.log("@repo", user)
        return user.save()
    }



    ///find a user by email
    async findByEmail(email: string): Promise<IuserDocument | null> {
        return userModel.findOne({ email })
    }



    async getAllUsers(): Promise<any> {
        try {
            // Fetch all users from the database using the userModel
            const users = await userModel.find();
            return users;
        } catch (error) {
            // Log and throw the error to be handled at the service level
            console.error("Error in getAllUsers repository:", error);
            throw new Error('Error fetching users from the database');
        }
    }



    async createAdmin(admindata: Partial<IadminDocument>): Promise<IadminDocument> {
        const admin = new adminModel(admindata)
        console.log("@repo", admin)
        return admin.save()
    }


    async findByEmailAndRole(email: string, role: string): Promise<IadminDocument | null> {

        console.log("herer")
        return adminModel.findOne({ email, role });
    }


    async findByEmailAdmin(email: string): Promise<IadminDocument | null> {
        return adminModel.findOne({ email })
    }
    async updateProfileByUserId(userId: any, updatedFields: any): Promise<any> {
        try {
            console.log("Here@repi");
    
            // Attempt to update the profile using the userId
            const updatedProfile = await userModel.findByIdAndUpdate(
                userId, // Match by userId
                updatedFields, // Update fields
                { new: true } // Return the updated document
            );
    
            console.log("Profile updated successfully rom repoo");
            return updatedProfile;
    
        } catch (error) {
            console.error("Error updating profile:", error);
            throw new Error("Profile update failed"); // Re-throw the error to handle it at the higher level
        }
    }
    
}