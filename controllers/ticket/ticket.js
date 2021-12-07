const { conn } = require("../../db");

// tickets insert 
const t_insert = (req, res )=>{
  let data = {};
  data.description = req.body.description;
 data.account_id = req.body.account_id;
  data.creation_date = req.body.creation_date;
  data.user_id = req.body.user_id;
  data.assigned_user_id = req.body.assigned_user_id;
 //console.log(data.description , data.account_id , data.creation_date , data.user_id , data.assigned_user_id)
 var sql = `insert into tickets (description, account_id, creation_date, user_id, assigned_user_id) 
 values('${data.description}','${data.account_id}','${data.creation_date}','${data.user_id}','${data.assigned_user_id}')`;
      conn.query(sql, (err)=>{
        if(!err){
           res.send("data insered")
        }
      })
}
 // select all data
 const t_show = (req,res)=>{
  var sql = 'select * from tickets';
  conn.query(sql, (err,results)=>{
    if(results.length>0){
       res.send(results)
    }
  });
}
// delete data from id
const t_delete = (req,res)=>{
var id = req.params.ticket_id;
  var sql = `delete from tickets where ticket_id = '${id}'`;
  conn.query(sql,(err)=>{
    if(!err){
       res.send("deleted data")
    }
  })
}
const t_update = async (req, res) => {
  const valid = await tvalidateDto(tschema, req.body);
  if (valid) {
    const user = {
      id: req.params.id,
      status: req.body.status,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      cname: req.body.cname,
      designation: req.body.designation
    };
    var sql = `UPDATE ticket SET status= '${user.status}' , '${user.firstname}' , '${user.lastname}' , '${user.cname}' , '${user.designation}' WHERE ticket_id = '${user.id}'`;
    conn.query(sql, (err) => {
      if (err) throw err;
      else res.send("Data Updated");
      console.log("Your data updated successfully");
    });
  } else {
    res.send("Body not valid");
  }
};
module.exports = { t_insert, t_show, t_delete ,t_update}