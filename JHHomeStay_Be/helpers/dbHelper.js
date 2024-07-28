const mongoose = require("mongoose");

let dbConnect = () => {
    let connectOptions = process.env.DB_AUTHENTICATION === 'true' ?
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            user: process.env.DB_USERNAME,
            pass: process.env.DB_PASSWORD,
        } : {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    console.log('DB connected')  ;

    // return mongoose.createConnection('mongodb+srv://jadehillhomestays:1234@cluster0.nwvtu.mongodb.net/jadehillhomestays?retryWrites=true&w=majority',
    //    connectOptions);
    return mongoose.createConnection('mongodb://localhost:27017/JadeHillHomestays',
         connectOptions);

    /* return mongoose.createConnection('mongodb://mongo-jadehills:27017/JadeHillHomestays',
        connectOptions); */

}
exports.db = dbConnect();