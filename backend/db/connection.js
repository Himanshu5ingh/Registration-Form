const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/hello')
    .then(() => console.log('mongoDB connected successfully'))
    .catch(() => console.log("not connected to database"))