import { Schema, Types } from 'mongoose';
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
        get: (createdAt) => createdAt.toLocaleString(),
    }
}, {
    toJSON: {
        getters: true, // Habilita getters para devolver el valor formateado
    },
});
export default reactionSchema;
