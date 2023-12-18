const express = require('express')
const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })
const {User} = require('../../db/models')

const uploadRouter = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      return cb(null, "./public/data/uploads")
    },
    filename: function (req, file, cb) {
      return cb(null, `${file.originalname}`)
    }
  })

  const upload = multer({storage})

  uploadRouter.get("/", async(req,res) => {
    const userLogin = req.session.login
    const photoUser = await User.findOne({where: {login:userLogin}})
    res.json(photoUser)
  })

uploadRouter.patch('/lkPhoto', upload.single('file'), async (req, res) => {
    if(req.file === "undefined"){
    const imgName = `/${req.file.filename}`
    const id = req.body.id
    console.log(id)
    const userLogin = await User.findOne({where: {id}})
    const updateCompUsimg = await User.update({ photo: imgName}, { where: { id: userLogin.id } });
    res.json(updateCompUsimg);}
  
  });

module.exports = uploadRouter;