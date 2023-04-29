const adminController = {
  getHospitals: (req, res) => {
    return res.render('admin/hospitals')
  }
}

module.exports = adminController