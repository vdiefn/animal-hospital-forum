const Hospital = require('../models/hospital')
const { localFileHandler } = require('../helpers/file-helpers')

const hospitalController = {
  getHospitals: (req, res) => {
    Hospital.find()
      .lean()
      .then((hospitals) => res.render('hospitals', { hospitals }))
      .catch(err => console.log(err))
  },
  createHospitalPage: (req, res) => {
    return res.render('new')
  },
  createHospital: (req, res) => {
    const { name, city, address, telephone, description } = req.body
    if (!name ) throw new Error('必填資料！')
    const { file } = req
    localFileHandler(file)
      .then(filePath => Hospital.create({
        name,
        city,
        address,
        telephone, 
        description,
        image: filePath || null
      }))
      .then(() => {
        req.flash('success_messages', '已成功新增醫院資訊！')
        res.redirect('/hospitals')
      })
      .catch(err => console.log(err))
  },
  editHospital: (req, res) => {

  }
}

module.exports = hospitalController