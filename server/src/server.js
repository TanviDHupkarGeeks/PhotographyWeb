const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();
const {
     CORS_ORIGIN,
     MONGO_URI,
     PORT
} = process.env;

const app = express();
const middlewares = require('./middlewares');
const photographs = require('./routes/photographs');
const profile = require('./routes/profile');

app.use(express.json());
app.use(cors({
    origin: CORS_ORIGIN
}));

app.get('/', (req, res) => 
    res.json([{ endpoint: '/api/photographs' }, { endpoint: '/api/profile' }]));

app.use('/api/photographs', photographs);
app.use('/api/profile', profile);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

mongoose
.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(result => {
    console.log('Database connected');
}).catch(error => {
    console.log(error);
});

app.listen(PORT, () => console.log(`Server connected at ${PORT}`));
