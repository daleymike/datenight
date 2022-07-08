const DateController = require('../controllers/date.controller');

module.exports = (app) => {
    // get all dates
    app.get("/api/dates", DateController.showDates);
    // get one date
    app.get("/api/dates/:_id", DateController.getOneDate);
    // create date
    app.post("/api/dates", DateController.createDate);
    // update date
    app.put("/api/dates/:_id", DateController.updateDate);
    // destroy date
    app.delete("/api/dates/:_id", DateController.removeDate);
}