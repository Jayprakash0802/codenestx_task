const {Router} = require('express')
const {create,login,edit,delProduct,getProduct} = require('../controllers/admin_controller/admin')

const router = Router();

router.post("/login",login);
router.get("/product",getProduct);
router.post("/product/create",create);
router.patch('/product/:id/edit',edit);
router.delete('/product/:id/delete',delProduct);


module.exports = router;
