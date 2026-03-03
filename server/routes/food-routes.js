const express = require('express')
const router = express.Router()
const {createFood, getFoodItems} = require("../controllers/food-controller")
const {authFoodPartnerMiddleware,authUserMiddleware} = require("../middleware/auth-middleware")
const multer = require('multer')

// multer logic

const upload = multer({
    storage: multer.memoryStorage(),
})

// food api's
router.post('/',authFoodPartnerMiddleware,upload.single("video"),createFood)

router.get('/',authUserMiddleware,getFoodItems)

module.exports = router