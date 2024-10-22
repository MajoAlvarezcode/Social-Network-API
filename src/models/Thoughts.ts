import { Schema, Document, ObjectId, model, Types } from 'mongoose';
// import reactionsSchema from '../models/Reactions.js';

interface IReaction extends Document {
  reactionId: ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date | string;
}


interface IThought extends Document {
  username: string;
  thoughtText: string;
  createdAt: Date | string;
  reactions: IReaction[];

}

const reactionSchema = new Schema<IReaction>(
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
        
      }
    }, {
      toJSON: {
        getters: true, // Habilita getters para devolver el valor formateado
      },
      
    });




const thoughtSchema = new Schema<IThought>(
  {
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
