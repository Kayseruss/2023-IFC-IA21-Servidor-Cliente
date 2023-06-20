const express = require("express")
const fs = require("fs")
const { getDatabaseInstance } = require("./database")

const app = express()

app.use(express.static(__dirname + '/../public'))
app.use(express.json())

app.post("/movies", async (req, res) => {
  const { title, source, description, thumb } = req.body
  const db = await getDatabaseInstance()
  const result = await db.run(`INSERT INTO movies(title, source, description, thumb) VALUES(?, ?, ?, ?)`, [title, source, description, thumb])
  res.json(result)
})

app.get("/movies", async (req, res) => {
  const { id } = req.query
  const db = await getDatabaseInstance()
  if (id) {
    const result = await db.get(`SELECT * FROM movies WHERE id=?`, id)
    res.json(result)
    return
  }
  const result = await db.all(`SELECT * FROM movies`)
  res.json(result)
})

app.put("/movies", async (req, res) => {
  const { id } = req.query
  const { title, source, description, thumb } = req.body
  const db = await getDatabaseInstance()
  const result = await db.run(
    `UPDATE movies SET title=?, source=?, description=?, thumb=? WHERE id=?`,
    title, source, description, thumb, id
  )
  res.json(result)
})

// ??????? PATCH

app.delete("/movies", async (req, res) => {
  const { id } = req.query
  const db = await getDatabaseInstance()
  const result = await db.run(`DELETE FROM movies WHERE id=?`, id)
  res.json(result)
})

app.listen(3000, () => console.log("Servidor rodando!"))