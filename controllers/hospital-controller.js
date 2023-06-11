const Hospital = require('../models/hospital')
const { localFileHandler } = require('../helpers/file-helpers')

const hospitalController = {
  getHospitals: (req, res) => {
    return Hospital.find()
    .lean()
    .then(hospitals => res.render('hospitals', { hospitals }))
    .catch(err => console.log(err))
  },
  createHospitalPage: (req, res) => {
    return res.render('create')
  },
  createHospital: (req, res) => {
    const { name, city, address, telephone, description, website, openingHours, closingHours, hasER } = req.body
    if (!name) throw new Error('必填資料！')
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
        res.redirect('/hospitals')
      })
      .catch(err => console.log(err))
  },
  getHospital: (req, res) => {
    const id = req.params.id
    return Hospital.findById(id)
      .lean()
      .then(hospital => res.render('hospital', { hospital}))
      .catch(err => console.log(err))
  },
  editHospitalPage: (req, res) => {
    const id = req.params.id
    return Hospital.findById(id)
      .lean()
      .then((hospital) => res.render('edit', { hospital }))
      .catch(err => console.log(err))
  },
  editHospital: (req, res) => {
    const { name, city, address, telephone, description, hasER, openingHours, closingHours, website } = req.body
    const id = req.params.id
    const { file } = req
    Promise.all([
      Hospital.findById(id),
      localFileHandler(file)
    ])
    .then(([hospital, filePath])=>{
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
        res.redirect(`/hospitals/${id}`)
      })
  .catch(err => console.log(err))
  },
  searchHospital: (req, res, next) => {
    const keyword = req.query.keyword.trim().toLowerCase()

    Hospital.find()
      .lean()
      .then(hospitals => {
        const result = hospitals.filter(hospital => {
          return hospital.name.toLowerCase().includes(keyword.toLowerCase()) ||
            hospital.city.toLowerCase().includes(keyword.toLowerCase()) ||
            hospital.address.toLowerCase().includes(keyword.toLowerCase())
        })
        res.render('hospitals', { hospitals : result, keyword })
    })
      .catch(err => next(err))
  }
}

module.exports = hospitalController