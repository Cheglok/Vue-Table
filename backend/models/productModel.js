// import connection
import db from "../config/database.js";
 
// Get All Products
export const getProducts = (result) => {
    db.query("SELECT DATE_FORMAT(date,'%d/%m/%Y') AS date, name, amount, distance FROM data", (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}