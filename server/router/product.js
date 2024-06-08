// const express = require('express');
// const router = express.Router();
// const productController = require('../controller/product'); // ודא שהנתיב נכון

// router.get('/', productController.getAllProducts);
// router.get('/:id', productController.getProductById);
// router.post('/', productController.createProduct);
// router.put('/:id', productController.updateProduct);
// router.delete('/:id', productController.deleteProduct);

// module.exports = router;

const express = require('express');
const router = express.Router();
const productController = require('../controller/product');
const multer = require('multer');

// הגדרות לאחסון הקבצים
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // תיקיית העלאה
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', upload.single('file'), productController.createProduct); // הוספת upload.single('file')
router.put('/:id', upload.single('file'), productController.updateProduct); // הוספת upload.single('file')
router.delete('/:id', productController.deleteProduct);

module.exports = router;
