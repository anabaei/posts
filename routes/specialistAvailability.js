// routes/specialistAvailabilityRoutes.js
import express from 'express';
import SpecialistAvailability from '../models/SpecialistAvailability.js';

const router = express.Router();

// POST request to create a new specialist's availability
router.post('/', async (req, res) => {
    const { specialist_id, days_of_week, start_time, end_time } = req.body;
    
    try {
        const availability = await SpecialistAvailability.create({
            specialist_id,
            days_of_week,
            start_time,
            end_time
        });
        res.status(201).json(availability);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating specialist availability' });
    }
});

// GET request to get all availabilities of a specific specialist
router.get('/:specialist_id', async (req, res) => {
    const { specialist_id } = req.params;

    try {
        const availabilities = await SpecialistAvailability.findAll({
            where: { specialist_id }
        });
        if (availabilities.length === 0) {
            return res.status(404).json({ message: 'No availability found for this specialist' });
        }
        res.json(availabilities);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching specialist availability' });
    }
});

// PUT request to update a specialist's availability
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { days_of_week, start_time, end_time } = req.body;

    try {
        const availability = await SpecialistAvailability.update(
            { days_of_week, start_time, end_time },
            { where: { id } }
        );
        if (availability[0] === 0) {
            return res.status(404).json({ message: 'Availability not found' });
        }
        res.json({ message: 'Availability updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating specialist availability' });
    }
});

// DELETE request to delete a specialist's availability
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const availability = await SpecialistAvailability.destroy({ where: { id } });
        if (!availability) {
            return res.status(404).json({ message: 'Availability not found' });
        }
        res.json({ message: 'Availability deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting specialist availability' });
    }
});

export default router;
