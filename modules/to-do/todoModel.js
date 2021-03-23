import mongoose, { Schema } from 'mongoose';

const TodoModel = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    created_date: {
        type: String,
        required: true
    },
    created_by: {
        UserName: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    }
}, { versionKey: false });

const ToDo = mongoose.model('ToDo', TodoModel);

export default User;