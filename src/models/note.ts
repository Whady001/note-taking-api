import mongoose, { Document, Schema } from 'mongoose';

export interface INote extends Document {
  //  _id : number, 
    title : string, 
    content : string, 
    createdAt : Date,
    updatedAt : Date;
}

const NoteSchema: Schema = new Schema({
    //_id: { type: Number, required: true},
    title: { type: String, required: true },
    content: { type: String, required: true },
    timestamps: true,
});

const Note = mongoose.model<INote>('Note', NoteSchema);

export default Note;
