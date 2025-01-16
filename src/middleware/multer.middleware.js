
import multer from "multer" 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/temp')
    },
    filename: function (req, file, cb) {
      //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const timestamp=Date.now();
      const fileExtension= path.extnmae(file.originalname)
      cb(null, file.fieldname + '-' + timestamp+fileExtension)
    }
  }) 

  const upload=multer({storage:storage})


  export default upload; 