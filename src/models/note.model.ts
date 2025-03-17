import mongoose, { Document, Schema } from 'mongoose';

export interface INote extends Document {
    title : string, 
    content : string, 
}

const NoteSchema: Schema = new Schema<INote>({
  title: { 
      type: String,
      required: true 
  },
  content: { 
      type: String,
      required: true 
  }
}, { timestamps: true });

const Note = mongoose.model<INote>('Note', NoteSchema);

export default Note;
