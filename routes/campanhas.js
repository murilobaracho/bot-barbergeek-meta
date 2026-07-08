const express = require('express');
const router = express.Router();

const { dispararCampanha } = require('../controllers/campanhasController');

function checarSegredo(req, res, next) {

    const segredo = req.headers['x-campanha-secret'];

    if (!process.env.CAMPANHA_SECRET || segredo !== process.env.CAMPANHA_SECRET) {

        return res.sendStatus(401);

    }

    next();

}

router.post('/:nome', checarSegredo, dispararCampanha);

module.exports = router;
