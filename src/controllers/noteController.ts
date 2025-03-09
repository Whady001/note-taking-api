import { Request, Response } from "express";
import Note, {INote} from '../models/note';

let notes : INote[] = [];
//let currentId = 1;

//get all notes
export const getNotes = async (req: Request, res: Response) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//get note by id
export const getNoteById = async (req: Request, res: Response) => {
    try {
        const note = await Note.findById(req.params.id);
        if (note) {
            res.json(note);
        } else {
            res.status(404).send('Note not found');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//create a note
export const createNote =  async (req: Request, res: Response) => {
    const newNote = new Note {
        //_id: currentId++,
        title: req.body.title,
        content: req.body.content,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt,
    };
    try {
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Update a note
export const updateNote = async (req: Request, res: Response) => {
    try {
        const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (note) {
            res.json(note);
        } else {
            res.status(404).send('Note not found');
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//delete a note
export const deleteNote = async (req: Request, res: Response) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        if (note) {
            res.status(204).send();
        } else {
            res.status(404).send('Note not found');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
