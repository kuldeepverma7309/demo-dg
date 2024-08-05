import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    roleId: {
        type: Number,  // Change the type to String
        ref: 'Role',
        required: true,
        // Manually specify the localField and foreignField for roleId
        localField: 'roleId',
        foreignField: '_id'  // Refers to the 'id' field in the 'Roles' model
    }
})

export const Permission = new mongoose.model("Permission", permissionSchema)



// input validation || filtering || whitelisting || regex