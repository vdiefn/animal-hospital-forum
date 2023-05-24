const Hospital = require('../models/hospital')
const { localFileHandler } = require('../helpers/file-helpers')

const adminController = {
  getHospitals: (req, res) => {
    Hospital.find()
      .lean()
      .then((hospitals) => res.render('admin/hospitals', { hospitals }))
      .catch(err => console.log(err))
    },
    createHospitalPage: (req, res) => {
      return res.render('admin/create-hospital')
    },
    createHospital: (req, res, next) => {
      const { name, city, address, telephone, description, website, openingHours, closingHours, hasER } = req.body
      const { file } = req

      localFileHandler(file)
        .then(filePath => Hospital.create({
          name,
          city,
          address,
          telephone,
          hasER,
          website,
          openingHours,
          closingHours,
          description,
          image: filePath || null
        }))
        .then(() => {
          req.flash('success_messages', '已成功新增醫院資訊！')
          res.redirect('/admin/hospitals')
        })
        .catch(err => next(err))
  },
  getHospital: (req, res, next) => {
    const id = req.params.id
    return Hospital.findById(id)
      .lean()
      .then(hospital => res.render('hospital', { hospital }))
      .catch(err => next(err))
  }
}

module.exports = adminController