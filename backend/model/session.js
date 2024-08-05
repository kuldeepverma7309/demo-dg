import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 1 * 60 * 1000), // 1 minute from now
        index: true
    }
});

// Ensure the TTL index is created on the `expiresAt` field
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 60 });

export const Session = mongoose.model('Session', sessionSchema);
