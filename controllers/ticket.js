// const conn = require("../db");
// const tvalidateDto = require("../middleware/tvalidate-dto");
// const tschema = require("../Schema/ticketSchema");

// const t_insert = async (req, res) => {
//   const valid = await tvalidateDto(tschema, req.body);
//   if (valid) {
//     const user = {
//       status: req.body.status,
//       firstname: req.body.firstname,
//       lastname: req.body.lastname,
//       cname: req.body.cname,
//       designation: req.body.designation
//     };

//     var sql = `INSERT INTO ticket (status, firstname, lastname, cname, designation) 
//                     VALUES('${user.status}', '${user.firstname}' , '${user.lastname}' , '${user.cname}' , '${user.designation}')`;
//     conn.query(sql, (err) => {
//       if (err) throw err;
//       else res.json(user);
//       console.log("Data Inserted");
//     });
//   } else {
//     res.send("Body not valid");
//   }
// };

// const t_show = (req, res) => {
//   var sql = `SELECT * FROM ticket`;
//   conn.query(sql, (err, result) => {
//     if (err) throw err;
//     else res.json(result);
//     console.log("This is your data");
//   });
// };

// const t_update = async (req, res) => {
//   const valid = await tvalidateDto(tschema, req.body);
//   if (valid) {
//     const user = {
//       id: req.params.id,
//       status: req.body.status,
//       firstname: req.body.firstname,
//       lastname: req.body.lastname,
//       cname: req.body.cname,
//       designation: req.body.designation
//     };
//     var sql = `UPDATE ticket SET status= '${user.status}' , '${user.firstname}' , '${user.lastname}' , '${user.cname}' , '${user.designation}' WHERE ticket_id = '${user.id}'`;
//     conn.query(sql, (err) => {
//       if (err) throw err;
//       else res.send("Data Updated");
//       console.log("Your data updated successfully");
//     });
//   } else {
//     res.send("Body not valid");
//   }
// };

// const t_remove = (req, res) => {
//   var id = req.params.id;
//   var sql = `DELETE FROM ticket WHERE ticket_id='${id}'`;
//   conn.query(sql, (err) => {
//     if (err) throw err;
//     else res.send("Data Deleted");
//     console.log("Your Data Deleted Successfully");
//   });
// };

// module.exports = { t_insert, t_remove, t_show, t_update };
