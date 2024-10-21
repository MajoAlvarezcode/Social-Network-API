import { Schema, model } from 'mongoose';
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280, // Limita entre 1 y 280 caracteres
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        required: true,
    },
}, {
    toJSON: {
        virtuals: true,
        getters: true, // Habilita getters para devolver el valor formateado
    },
    id: false,
    versionKey: false,
});
// Initialize our Thought model
const Thought = model('thought', thoughtSchema);
export default Thought;
