import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
        index: { expires: '1d' } // Automatically delete session after 1 day
    }
});

export const Session = mongoose.model("Session", sessionSchema);