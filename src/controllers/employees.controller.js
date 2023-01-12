import { pool } from "../db.js";

export const getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employee");
    res.send({ rows });
  } catch (err) {
    console.log({err})
    return res.status(500).json({
      message: "Algo anduvo mal"
    });
  }
};

export const getEmployee = async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      id,
    ]);
    const empleado = rows[0];
    if (empleado) {
      res.json(empleado);
    } else {
      res.status(404).send("No se encontró el empleado");
    }
  } catch (error) {
    return res.status(500).json({
      message: "Algo anduvo mal",
      error,
    });
  }
};

export const createEmployee = async (req, res) => {
  const { name, salary } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO employee (name, salary) VALUES (?, ?)",
      [name, salary]
    );
    res.send({
      id: rows.insertId,
      name,
      salary,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Algo anduvo mal",
      error,
    });
  }
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, salary } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) where id = ?",
      [name, salary, id]
    );

    if (result.affectedRows <= 0) {
      res.status(404).json({
        message: "Empleado no encontrado",
      });
    } else {
      const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
        id,
      ]);
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    return res.status(500).json({
      message: "Algo anduvo mal",
      error,
    });
  }
};

export const deleteEmployee = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query("DELETE FROM employee WHERE id = ?", [
      id,
    ]);
    if (result.affectedRows <= 0) {
      res.status(404).json({
        message: "Employee not found",
      });
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    return res.status(500).json({
      message: "Algo anduvo mal",
      error,
    });
  }
};
