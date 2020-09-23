const { Router } = require('express');

const Photograph = require('../models/Photograph');

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const photographs = await Photograph.find();
        res.json(photographs);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const photograph = new Photograph(req.body);
        const createdPhotograph = await photograph.save();
        res.json(createdPhotograph);
    } catch (error) {
        if (error.name === 'ValidationError') res.status(422);
        next(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const newPhotograph = await Photograph.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );

        res.json(newPhotograph);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const del = await Photograph.findOneAndDelete({ _id: req.params.id });
        res.json(del);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
