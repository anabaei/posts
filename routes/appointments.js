// routes/appointments.js
import express from 'express';
import Appointment from '../models/Appointment.js';  // Import the Appointment model
import User from '../models/User.js';  // Import User model (if needed for user info)
import Specialist from '../models/Specialist.js';  // Import Specialist model (if needed for specialist info)

const router = express.Router();

// Create an appointment
router.post('/', async (req, res) => {
    try {
        const user_id = req.userId;
        const {  specialist_id, status, appointment_date, note } = req.body;

        const appointment = await Appointment.create({
            user_id,
            specialist_id,
            status: status || 'pending', // Default status if not provided
            appointment_date,
            note,
        });

        return res.status(201).json(appointment);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Something went wrong while creating the appointment.' });
    }
});

// Get all appointments for a user
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const appointments = await Appointment.findAll({
            where: { user_id: userId },
            include: [
                { model: Specialist, attributes: ['specialist_id', 'name', 'phone', 'email'] }, // Include specialist info
            ],
        });

        return res.status(200).json(appointments);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Something went wrong while retrieving appointments.' });
    }
});

// Get all appointments for a specialist
router.get('/specialist/:specialistId', async (req, res) => {
    try {
        const { specialistId } = req.params;
        const appointments = await Appointment.findAll({
            where: { specialist_id: specialistId },
            include: [
                { model: User, attributes: ['user_id', 'name', 'email'] },  // Include user info
            ],
        });

        return res.status(200).json(appointments);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Something went wrong while retrieving appointments.' });
    }
});

// Update an appointment status (e.g., confirmed, canceled)
router.put('/:appointmentId', async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const { status } = req.body;

        const appointment = await Appointment.findByPk(appointmentId);

        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        appointment.status = status;
        await appointment.save();

        return res.status(200).json(appointment);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Something went wrong while updating the appointment.' });
    }
});

// Delete an appointment
router.delete('/:appointmentId', async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const appointment = await Appointment.findByPk(appointmentId);

        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        await appointment.destroy();

        return res.status(200).json({ message: 'Appointment deleted successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Something went wrong while deleting the appointment.' });
    }
});

export default router;