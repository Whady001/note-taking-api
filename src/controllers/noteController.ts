import { Request, Response } from "express";
import Note, {INote} from '../models/note.model';
const NoteService = require('../services/note.service');

let notes : INote[] = [];

class NoteController {
    //get all notes
    async getNotes(req: Request, res: Response) {
        try {
            const notes = await Note.find();
            res.status(200).json(notes);
        } catch (error) {
            res.status(500).json({ message: `Could not get notes` });
        }
    }

    //get note by id
    async getNoteById(req: Request, res: Response) {
        const noteId = req.params.id; // Assuming the route is /notes/:id
        try {
            const existingNote = await NoteService.fetchOne({ _id: noteId });
            if (!existingNote) {
                return res.status(404).json({
                    success: false,
                    message: "Note with Id does not exist"
                });
            }
            res.status(200).json({
                success: true,
                message: "Note fetched successfully",
                data: existingNote
            });
        } catch (error) {
            res.status(500).json({ message: "Error fetching note" });
        }
    }
    //create a note
    async createNote(req: Request, res: Response) {
        const reqBody = req.body;
        try {
            const existingNote = await NoteService.fetchOne({
                name: reqBody.name.toLowerCase()
            });
            if (existingNote) {
                return res.status(403).json({
                    success: false,
                    message: "Note already exists"
                });
            }
            const newNote = await NoteService.create(reqBody);
            res.status(201).json({
                success: true,
                message: "Note created successfully",
                data: newNote
            });
        } catch (error) {
            res.status(500).json({ message: "Error creating note" });
        }
    }

    // Update a note
    async updateNote(req: Request, res: Response) {
        const noteId = req.params._id; 
        const updateData = req.body;
        try {
            const existingNote = await NoteService.fetchOne({ _id: noteId });
            if (!existingNote) {
                return res.status(404).json({
                    success: false,
                    message: "Note does not exist"
                });
            }

            // Check for unique name
            if (updateData.name) {
                const existingNoteWithUpdateName = await NoteService.fetchOne({
                    name: updateData.name.toLowerCase()
                });
                if (existingNoteWithUpdateName && existingNoteWithUpdateName._id.toString() !== existingNote._id.toString()) {
                    return res.status(403).json({
                        success: false,
                        message: "Note with updated name already exists"
                    });
                }
            }

            const updatedData = await NoteService.update(noteId, updateData);
            res.status(200).json({
                success: true,
                message: "Note updated successfully",
                data: updatedData
            });
        } catch (error) {
            res.status(500).json({ message: "Error updating note" });
        }
    }

    //delete a note
    async deleteNote(req: Request, res: Response) {
        try {
            const note = await Note.findByIdAndDelete(req.params.id);
            if (!note) {
                return res.status(404).send('Note not found');
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).send('Error deleting note');
        }
    }
};

export default NoteController;