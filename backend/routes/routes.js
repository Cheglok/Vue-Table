// import express
import express from "express";
 
// import function from controller
import { showProducts } from "../controllers/product.js";
 
// init express router
const router = express.Router();
 
// Get All Product
router.get('/products', showProducts);

// export default router
export default router;