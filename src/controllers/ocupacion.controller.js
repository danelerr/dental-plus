import { pool } from "../db.js";

export const getOcupacion = async (req, res) => {
    try {
        const [rows] = await pool.query("select * from ocupacion");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            mensaje: "algo salio mal",
        });
    }
};

export const getOcupacionByID = async (req, res) => {
    try {
        console.log(req.params);
        const [rows] = await pool.query("SELECT * FROM ocupacion where id = ?", [
            req.params.id,
        ]);
        if (rows.length <= 0) {
            return res.status(404).json({
                mensaje: "ocupacion no encontrada",
            });
        }
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            mensaje: "algo salio mal",
        });
    }
};

export const createOcupacion = async (req, res) => {
    try {
        console.log(req);
        const { id, ocupacion } = req.body;
        const [rows] = await pool.query("insert into ocupacion values (?, ?)", [
            id,
            ocupacion,
        ]);
        res.send({
            id,
            ocupacion,
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "algo salio mal",
        });
    }
};

export const deleteOcupacion = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM ocupacion WHERE id = ?", [
            req.params.id,
        ]);
        if (result.affectedRows <= 0) {
            return res.status(404).json({
                mensaje: "ocupacion no encontrada",
            });
        }
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            mensaje: "algo salio mal",
        });
    }
};

export const updateOcupacion = async (req, res) => {
    const { id } = req.params;
    const { ocupacion } = req.body;

    try {
        const [result] = await pool.query(
            "UPDATE ocupacion SET nombre = IFNULL(?, nombre) where id = ?",
            [ocupacion, id]
        );

        if (result.affectedRows === 0) {
            return res.status(400).json({
                mensaje: "ocupacion no encontrada",
            });
        }

        const [rows] = await pool.query("SELECT * FROM ocupacion WHERE id = ?", [
            id,
        ]);

        res.send(rows);
    } catch (error) {
        return res.status(500).json({
            mensaje: "algo salio mal",
        });
    }
};
