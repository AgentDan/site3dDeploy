const path = require('path')
const dotenv = require('dotenv').config()
const express = require("express")
const cors = require("cors")
const connectDB = require('./config/db')

const app = express()
const PORT = process.env.PORT || 5000

connectDB()

app.use(cors())
app.use(express.json({extended: true}))
app.use('/articles', require('./routes/articles'))
app.use('/admin', require('./routes/admin'))
app.use('/auth', require('./routes/auth.route'))

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) =>
        res.sendFile(
            path.resolve(__dirname, '../', 'client', 'build', 'index.html')
        )
    );
} else {
    app.get('/', (req, res) => res.send('Please set to production'));
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
