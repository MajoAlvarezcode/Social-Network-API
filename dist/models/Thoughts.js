import { Schema, model } from 'mongoose';
import reactionsSchema from './Reactions';
const thoughtsSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280, // Limita entre 1 y 280 caracteres
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: function () {
            return this.createdAt.toLocaleString();
        }
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionsSchema], // Documento anidado con el esquema de reacciones
}, {
    toJSON: {
        virtuals: true,
        getters: true, // Habilita getters para devolver el valor formateado
    },
});
thoughtsSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
// Initialize our User model
const Thoughts = model('thoughts', thoughtsSchema);
export default Thoughts;
