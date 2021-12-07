const { conn } = require("../../db");
const send =(req,res)=>{
    console.log("API test")
}

// account insert
const a_insert = (req, res )=>{
    let data = {};
    data.name = req.body.name;
   data.ms_start_date = req.body.ms_start_date;
    data.is_active = req.body.is_active;
    data.owner_user_id = req.body.owner_user_id;
    data.assigned_user_id = req.body.assigned_user_id;
   //console.log(data.description , data.account_id , data.creation_date , data.user_id , data.assigned_user_id)
   var sql = `INSERT INTO accounts (name, ms_start_date, is_active, owner_user_id) VALUES ('${data.name}','${data.ms_start_date}','${data.is_active}','${data.owner_user_id}')`;
   
        conn.query(sql, (err)=>{
         res.send("data insered")
         console.log(err)
        })
  }

  const a_select = (req,res)=>{
      var sql ="select * from accounts";
      conn.query(sql,(err , result)=>{
     res.send(result)
      })
  }
  // account delete data from id
const a_delete = (req,res)=>{
    var id = req.params.acc_id;
      var sql = `delete from accounts where acc_id = '${id}'`;
      conn.query(sql,(err)=>{
        res.send("deleted data")
        
      })
    }
  
module.exports ={send , a_insert ,a_select ,a_delete}