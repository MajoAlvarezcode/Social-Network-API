import { Schema, Document, ObjectId, Types } from 'mongoose';

interface IReactions extends Document {
  reactionId: ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date | string;
}

const reactionsSchema = new Schema<IReactions>(
  {
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
        get: function(this: { createdAt: Date }): string {
          return this.createdAt.toLocaleString(); 
      }}
    }, {
      toJSON: {
        getters: true, // Habilita getters para devolver el valor formateado
      },
      
    });

export default reactionsSchema;
