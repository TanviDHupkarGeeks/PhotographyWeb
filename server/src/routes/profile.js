const { Router } = require('express');

const Profile = require('../models/Profile');

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const profile = await Profile.find();
        res.json(profile);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const hasProfile = await Profile.find();

        if (hasProfile.length === 0) {
            const profile = new Profile(req.body);
            const createdProfile = await profile.save();
            res.json(createdProfile);
        } else {
            res.json({ message: "Profile already exists" });
        }
    } catch (error) {
        if (error.name === 'ValidationError') res.status(422);
        next(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const newProfile = await Profile.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );

        res.json(newProfile);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
