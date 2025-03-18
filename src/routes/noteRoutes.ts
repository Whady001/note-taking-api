const express = require('express');
import Category from '../models/category'
import { Router } from 'express';
import NoteController from '../controllers/noteController';
import { validateNote } from "../middlewares/validator";
import { INote } from '../models/note.model'
import {Request, Response, NextFunction} from 'express';

const router = express.Router();
const noteController = new NoteController();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await noteController.getNotes(req, res, next);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await noteController.getNoteById(req, res, next);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/categories/:categoryId", async (req: Request<{categoryId: string}>, res: Response, next: NextFunction) => {
    try {
        await noteController.getByCategoryId(req, res, next);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post("/", validateNote, async (req: Request, res: Response, next: NextFunction) => {
    try {
        await noteController.createNote(req, res, next);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.put("/:id", validateNote, async (req: Request, res: Response, next: NextFunction) => {
    try {
        await noteController.updateNote(req, res, next);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await noteController.deleteNote(req, res, next);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});


export default router;