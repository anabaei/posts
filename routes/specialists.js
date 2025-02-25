import express from 'express';
import Specialist from '../models/Specialist.js';  // Assuming Specialist model exists

const specialistRouter = express.Router();

// Route to create a new specialist
specialistRouter.post('/', async (req, res) => {
    try {
        const { name, phone, email, image, clinic_id } = req.body;
        
        // Create a new specialist record
        const specialist = await Specialist.create({
            name,
            phone,
            email,
            image,
            clinic_id
        });
        
        res.status(201).json({
            message: 'Specialist created successfully!',
            specialist
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create specialist', error });
    }
});

// Route to get all specialists
specialistRouter.get('/', async (req, res) => {
    try {
        const specialists = await Specialist.findAll();
        res.status(200).json(specialists);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch specialists', error });
    }
});

// Route to get a specific specialist by ID
specialistRouter.get('/clinic/:clinic_id', async (req, res) => {
    try {
        const { clinic_id } = req.params;
        const specialists = await Specialist.findAll({
            where: { clinic_id }
        });
        
        if (!specialists) {
            return res.status(404).json({ message: 'Specialist not found' });
        }

        res.status(200).json(specialists);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch specialists for this clinic', error });
    }
});

// Route to get a specific specialist by ID
specialistRouter.get('/:specialist_id', async (req, res) => {
    try {
        const { specialist_id } = req.params;
        const specialist = await Specialist.findOne({
            where: { specialist_id }
        });
        
        if (!specialist) {
            return res.status(404).json({ message: 'Specialist not found' });
        }

        res.status(200).json(specialist);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch specialist', error });
    }
});

// Route to update a specialist by ID
specialistRouter.put('/:specialist_id', async (req, res) => {
    try {
        const { specialist_id } = req.params;
        const { name, phone, email, image, clinic_id } = req.body;
        
        const specialist = await Specialist.findOne({
            where: { specialist_id }
        });
        
        if (!specialist) {
            return res.status(404).json({ message: 'Specialist not found' });
        }

        // Update specialist details
        specialist.name = name || specialist.name;
        specialist.phone = phone || specialist.phone;
        specialist.email = email || specialist.email;
        specialist.image = image || specialist.image;
        specialist.clinic_id = clinic_id || specialist.clinic_id;

        await specialist.save();

        res.status(200).json({
            message: 'Specialist updated successfully!',
            specialist
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update specialist', error });
    }
});

// Route to delete a specialist by ID
specialistRouter.delete('/:specialist_id', async (req, res) => {
    try {
        const { specialist_id } = req.params;
        const specialist = await Specialist.findOne({
            where: { specialist_id }
        });
        
        if (!specialist) {
            return res.status(404).json({ message: 'Specialist not found' });
        }

        // Delete specialist
        await specialist.destroy();
        res.status(200).json({ message: 'Specialist deleted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete specialist', error });
    }
});

export default specialistRouter;
