import { Schema, Document, model} from 'mongoose';
import reactionsSchema from './Reactions';


interface IThoughts extends Document {
  username: string;
  thoughtText: string;
  createdAt: Date | string;
  reactions: typeof reactionsSchema[];
}

const thoughtsSchema = new Schema<IThoughts>(
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
        get: function(this: { createdAt: Date }): string {
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


  thoughtsSchema.virtual('reactionCount').get(function (this: IThoughts) {
    return this.reactions.length;
  });

// Initialize our User model
const Thoughts = model('thoughts', thoughtsSchema);

export default Thoughts;
