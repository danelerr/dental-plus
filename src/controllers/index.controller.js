import { pool } from "../db.js";

export const ping = async (req, res) => {

  const result = await pool.query("select* from consultorio;");
  res.json(result[0]);
};
