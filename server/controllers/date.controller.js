const Date = require('../models/date.model');

module.exports = {

    showDates: (req, res) => {
        Date.find({})
        .then((date) => res.json(date))
        .catch((err) => res.json(err))
    },
    getOneDate: (req, res) => {
        Date.findOne({_id: req.params._id})
        .then((date) => res.json(date))
        .catch((err) => res.json(err))
    },
    createDate: (req, res) => {
        Date.create(req.body)
        .then((date) => res.json(date))
        .catch((err) => res.status(400).json(err))
    },
    updateDate: (req, res) => {
        Date.findOneAndUpdate({_id: req.params._id}, req.body, {
            new: true,
            runValidators: true,
        })
        .then((updatedDate) => res.json(updatedDate))
        .catch((err) => res.status(400).json(err))
    },
    removeDate: (req, res) => {
        Date.deleteOne({_id: req.params._id})
        .then((confirmDestroy) => res.json(confirmDestroy))
        .catch((err) => res.json(err))
    }
    
}