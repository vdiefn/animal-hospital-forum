const Hospital = require('../models/hospital')

const hospitalController = {
  getHospitals: (req, res) => {
    Hospital.find()
      .lean()
      .then((hospitals) => res.render('hospitals', { hospitals }))
      .catch(err => console.log(err))
  }
}

module.exports = hospitalController