// import connection
import db from "../config/database.js";
 
// Get All Products
export const getProducts = (result) => {
    db.query("SELECT * FROM data", (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}