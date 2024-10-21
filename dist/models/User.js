import { Schema, model } from 'mongoose';
// Schema to create User model
const userSchema = new Schema({
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thoughts',
        },
    ],
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    }
}, {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
        virtuals: true,
    },
    id: false,
});
// Create a virtual property `fullName` that gets and sets the user's full name
userSchema.virtual('friendCount').get(function () {
    return this.friends?.length;
});
// Initialize our User model
const User = model('user', userSchema);
export default User;
