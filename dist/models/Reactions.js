import { Schema, Types } from 'mongoose';
const reactionsSchema = new Schema({
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
        get: function () {
            return this.createdAt.toLocaleString();
        }
    }
}, {
    toJSON: {
        getters: true, // Habilita getters para devolver el valor formateado
    },
});
export default reactionsSchema;
