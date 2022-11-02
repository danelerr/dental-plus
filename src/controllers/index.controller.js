import { pool } from "../db.js";

export const slash = (req, res) => {
  res.render('index.ejs', {titulo: 'quiero enviar un json'});
};

export const ping = async (req, res) => {
  try {
    const [rows] = await pool.query("show tables");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
        mensaje: "algo salio mal",
    });
  }
};
