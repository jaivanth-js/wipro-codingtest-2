const express = require('express');
const Joi = require('@hapi/joi');

const Pets = require('../models/pets');
const { validateBody } = require('../middlewares/route');

const router = express.Router();

router.post(
  '/save',
  validateBody(Joi.object().keys({
    name: Joi.string().required().description('Pets name'),
    age: Joi.number().integer().required().description('Pets age'),
    colour: Joi.string().default('Pets colour'),
  }),
  {
    stripUnknown: true,
  }),
  async (req, res, next) => {
    try {
      const pets = new Pets(req.body);
      await pets.save();
      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }
);

router.get('/get', async (req, res) => {
    const pets = await Pets.find({});
    res.status(200).json(pets);
});

router.get('/delete/:id', (req, res) => {
    Pets.deleteOne({_id : req.params.id});
    res.status(200).json({message: 'Delete Success'});
});

module.exports = router;