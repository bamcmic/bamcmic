const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const db = new sqlite3.Database('./database.sqlite');

app.use(express.static('public'));
app.use(bodyParser.json());

// 初始化数据库
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT NOT NULL
    )
  `);
});

// 获取用户列表
app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

// 添加用户
app.post('/users', (req, res) => {
  const { username, email } = req.body;
  db.run('INSERT INTO users (username, email) VALUES (?, ?)', [username, email], function (err) {
    if (err) return res.status(500).send(err.message);
    res.status(201).send({ id: this.lastID });
  });
});

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});