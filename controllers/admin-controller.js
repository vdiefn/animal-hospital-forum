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
      .then(hospital => res.render('admin/hospital', { hospital }))
      .catch(err => next(err))
  },
  editHospitalPage: (req, res, next) => {
    const id = req.params.id
    Hospital.findById(id)
      .lean()
      .then((hospital) => res.render('/admin/edit', { hospital }))
      .catch(err => next(err))
  },
  editHospital: (req, res, next) => {
    const { name, city, address, telephone, description, hasER, openingHours, closingHours, website } = req.body
    const { file } = req
    const id = req.params.id
    Promise.all([
      Hospital.findById(id),
      localFileHandler(file)
    ])
      .then(([hospital, filePath]) => {
        if (!hospital) throw new Error("Hospital didn't exist")
        return hospital.updateOne({
          name,
          city,
          address,
          telephone,
          description,
          hasER,
          openingHours,
          closingHours,
          website,
          image: filePath || hospital.image
        })
      })
      .then(() => {
        req.flash('success_messages', '已成功更新醫院資訊！')
        res.redirect(`/admin/hospitals/${id}`)
      })
      .catch(err => next(err))
  },
  deleteHospital: (req, res, next) => {
    const id = req.params.id
    Hospital.findById(id)
      .then(hospital => {
        if (!hospital) throw new Error("Hospital didn't exist!")
        return hospital.remove()
        })
      .then(() => res.redirect('/admin/hospitals'))
      .catch(err => next(err))
  }
}

module.exports = adminController