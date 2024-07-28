// Tạo dữ liệu mẫu cho việc test đăng nhập, token
const bcrypt = require('bcrypt');
const {Users} = require("../models");
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

        /** CSDL atlas*/
    // let db =  mongoose.createConnection('mongodb+srv://jadehillhomestays:1234@cluster0.nwvtu.mongodb.net/jadehillhomestays?retryWrites=true&w=majority',
    //     connectOptions);

    /** CSDL local */
     let db =  mongoose.createConnection('mongodb://localhost:27017/JadeHillHomestays', connectOptions);

    /** CSDL cho docker */
    /* let db =  mongoose.createConnection('mongodb://mongo-jadehills:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
        connectOptions); */

    return db;
}
const db = dbConnect();
UserSeed = async function () {
    Users(db).deleteMany().then(function () {
        console.log("user data is cleared");
    }).catch(function (error) {
        console.log(error);
    });
    await Users(db).create([
        {
                   status: 1,
                   email: 'phucbua27082002@gmail.com',
                   name: 'Ngô Bảo Phúc',
                   password: await bcrypt.hash('1234567890', 10),
                   role: 'admin',
               },
               {
                   status: 1,
                   email: 'superadmin@gmail.com',
                   name: 'Ngô Bảo Phúc',
                   password: await bcrypt.hash('1234567890', 10),
                   role: 'super_admin',
               },
               {
                   status: 1,
                   email: 'phuongVT@gmail.com',
                   name: 'Vũ Thế Phương',
                   password: await bcrypt.hash('1234567890', 10),
                   role: 'admin',
               },
               {
                   status: 1,
                   email: 'nganpham@gmail.com',
                   name: 'Phạm Thị Kim Ngân',
                   password: await bcrypt.hash('1234567890', 10),
                   role: 'admin',
               }
    ]);
    console.log('seeded user OK!');
    await db.close();
}
UserSeed().then(() => {
    console.log("user seed ok")
}).catch( err => {
    console.log(err);
})
