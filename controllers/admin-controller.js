const Hospital = require('../models/hospital')

const adminController = {
  getHospitals: (req, res) => {
    Hospital.find()
      .lean()
      .then((hospitals) => res.render('admin/hospitals', { hospitals }))
      .catch(err => console.log(err))
    }
}

module.exports = adminController