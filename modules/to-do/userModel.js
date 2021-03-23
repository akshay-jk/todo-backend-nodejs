import mongoose from 'mongoose';
const schema = mongoose.Schema;

const UserModel = new schema({
    username: {
        type: String,
        required: true
    },
    userphone: {
        type: String,
        required: true,
    },
    hash: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: new Date()
    }
}, { versionKey: false });

const User = mongoose.model('user', UserModel);

export default User;