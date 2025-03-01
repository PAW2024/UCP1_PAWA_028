require('dotenv').config();
const express = require('express');
const app = express();
const todoroutes = require('./routes/todo.js');
const tododbroutes = require('./routes/fasilitasdb.js');
const port = process.env.PORT || 6000;

const db = require('./database/db');
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session');
// Mengimpor middleware
const authRoutes = require('./routes/authRoutes');
const { isAuthenticated } = require('./middlewares/middleware.js');
app.use(expressLayouts);
 
app.use(express.json());

app.use('/fasilitas',fasilitasdbroutes);
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

// Konfigurasi express-session
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key', // Gunakan secret key yang aman
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set ke true jika menggunakan HTTPS
}));

app.use('/', authRoutes);
app.get("/", isAuthenticated, (req, res) => {
  res.render('index',{
    layout: 'layouts/main-layout'
  });
});

app.get("/contact", isAuthenticated, (req, res) => {
  res.render("contact",{
    layout: 'layouts/main-layout'
  });
});

app.get('/kolamrenang-view', isAuthenticated, (req, res) => {
  db.query('SELECT * FROM todo', (err, todo) => {
      if (err) return res.status(500).send('Internal Server Error');
      res.render('todo', {
          layout: 'layouts/main-layout',
          todo: todo
      });
  });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`); 
});

