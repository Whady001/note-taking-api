const express = require('express');
import { Router } from 'express';
import NoteController from '../controllers/noteController';

const router = Router();
const noteController = new NoteController();

router.get('/', async (req, res) => {
    try {
        await noteController.getNotes(req, res);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        await noteController.getNoteById(req, res);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post('/', async (req, res) => {
    try {
        await noteController.createNote(req, res);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.delete('/:_id', async (req, res) => {
    try {
        await noteController.deleteNote(req, res);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.patch('/:_id', async (req, res) => {
    try {
        await noteController.updateNote(req, res); 
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;