import { Schema, model, Types } from 'mongoose';
const reactionSchema = new Schema({
    reactionId: {
        type: Types.ObjectId,
        default: () => new Types.ObjectId(), // Genera un nuevo ObjectId por defecto
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280, // Máximo de 280 caracteres
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, {
    toJSON: {
        getters: true, // Habilita getters para devolver el valor formateado
    },
    id: false,
});
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
    reactions: [reactionSchema],
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
