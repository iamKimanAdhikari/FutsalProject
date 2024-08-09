import { Router } from "express";

import {
    getAllTurfs,
    getTurfById,
    deleteTurfbyId
} from '../controllers/turf.controller.js';

const router = Router();

// Route to get all turfs
router.route('/get-all-turfs').get(getAllTurfs);

// Route to get a specific turf by ID   
router.route('/get-turf/:id').get(getTurfById);

// Route to delete a turf by ID
router.route('/delete-turf/:id').delete(deleteTurfbyId);

export default router;