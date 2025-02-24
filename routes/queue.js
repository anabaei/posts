// routes/queueRoutes.js
import express from 'express';
import Queue from '../models/Queue.js';
import Appointment from '../models/Appointment.js'; // Assuming Appointment model exists
import Specialist from '../models/Specialist.js';  // Assuming Specialist model exists

const router = express.Router();

// Create a new queue entry
router.post('/', async (req, res) => {
    try {
        const user_id = req.userId;
        const { appointment_id, specialist_id, status, waitingTime, row_number } = req.body;

        // Create the queue entry
        const queue = await Queue.create({
            appointment_id,
            specialist_id,
            status: status || 'waiting',
            waitingTime,
            row_number
        });

        res.status(201).json(queue);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create queue entry' });
    }
});

// Get all queues for a specific specialist, ordered by requested_at (ascending)
router.get('/:specialist_id', async (req, res) => {
    try {
        const { specialist_id } = req.params;

        const queues = await Queue.findAll({
            where: { specialist_id },
            order: [['requested_at', 'ASC']],  // Sort by requested_at in ascending order
            include: [
                { model: Appointment, attributes: ['appointment_date', 'note'] },  // Include Appointment data
                { model: Specialist, attributes: ['name', 'phone'] },  // Include Specialist data
            ]
        });

        res.status(200).json(queues);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve queues' });
    }
});

// Get queue details by queue_id
router.get('/:specialist_id/:queue_id', async (req, res) => {
    try {
        const { specialist_id, queue_id } = req.params;

        const queue = await Queue.findOne({
            where: { specialist_id, queue_id },
            include: [
                { model: Appointment, attributes: ['appointment_date', 'note'] },
                { model: Specialist, attributes: ['name', 'phone'] },
            ]
        });

        if (queue) {
            res.status(200).json(queue);
        } else {
            res.status(404).json({ message: 'Queue entry not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve queue entry' });
    }
});

export default router;
