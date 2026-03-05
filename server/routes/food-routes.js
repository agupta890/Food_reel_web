const express = require('express')
const router = express.Router()
const {createFood, getFoodItems,likeFood,
    saveFood,
    getSaveFood} = require("../controllers/food-controller")
const {authFoodPartnerMiddleware,authUserMiddleware} = require("../middleware/auth-middleware")
const multer = require('multer')

// multer logic

const upload = multer({
    storage: multer.memoryStorage(),
})

// food api's
router.post('/',authFoodPartnerMiddleware,upload.single("video"),createFood)

router.get('/',authUserMiddleware,getFoodItems)

router.post('/like',
    authUserMiddleware,
    likeFood)


router.post('/save',
    authUserMiddleware
    ,saveFood
)


router.get('/save',
   authUserMiddleware,
    getSaveFood
)

module.exports = router