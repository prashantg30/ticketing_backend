const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const conn = require("../db");
const { validationResult } = require("express-validator");
//login authentecation
const login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const row = await conn.query("SELECT * FROM `user` WHERE `email`=?", [
      req.body.email,
    ]);
    // console.log(row);
    if (row.length === 0) {
      return res.status(422).json({
        message: "Invalid email address"
      });
    }
    
    row.password = bcrypt.hashSync(req.body.password, 12);
    const passMatch = await bcrypt.compare(req.body.password, row.password);
    if (!passMatch) {
      return res.status(422).json({
        message: "Incorrect password"
      });
    }

    const theToken = jwt.sign({ id: row[0]?.user_id }, "the-super-strong-secrect", {
      expiresIn: "1h",
    });

    return res.json({
      token: theToken,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = { login };
