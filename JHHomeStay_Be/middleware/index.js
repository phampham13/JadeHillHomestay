/**
 * ****************************************
 * Middleware xác thực truy cập người dùng
 * 1.Kiểm tra người dùng đã xác thực
 * 2.Kiểm tra xem JWT của người dùng có hợp lệ hay không?
 * 3.Kiểm tra xem người dùng có role hợp lệ hay không?
 * ****************************************
 */
const jwt = require('jsonwebtoken');
const { Users } = require('../models/index');
const path = require('path');
const {db} = require("../helpers/dbHelper");
const fs = require("fs");
const multer = require("multer");

// Chuyển file .env sang dạng có thể sử dụng được
require('dotenv').config({path: path.resolve(__dirname, '../.env')});

//Kiểm tra token của request
exports.authToken = async function ( req, res, next ) {
    const access_token = req.get('Authorization') ? req.get('Authorization').split(' ')[1] : '';

    //Nếu token ko tồn tại -> lỗi
    if (!access_token) {
        return res.status(401).json({
            success: false,
            message: "invalid access token"
        });
    }

    //Giải mã token, sử dụng jwt
    let decodedToken;
    try {
        decodedToken = jwt.verify(access_token, process.env.TOKEN_SECRET);
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "invalid access token",
            content: err
        });
    }

    //Nếu token sau giải mã underfined -> Trả lại res lỗi
    if ( decodedToken === undefined) {
        return res.status(401).json({
            success: false,
            message: "invalid access token"
        });
    } else {
        try {
            //Kiểm tra người sử dụng -> Kết nối kiểm tra ở database
            req.user = await Users(db).findOne({
                email: decodedToken.email,
                role: decodedToken.role,
            });
            req.currentRole = decodedToken.role;
            req.currentEmail = decodedToken.email;
            next();
        } catch (err) {
            next(err);
        }
    }
}
// Xác thực có phải là admin hoặc super admin ko
// Dựa vào email người dùng gửi -> Tìm trong database đối tượng user chứa email đó-> Xác định role của user đó đúng ko
exports.authRole = async function ( req, res, next) {
    if (!req.user) {
        try{
            //Truy vấn database để kiểm tra
            let user = await Users(db).findOne({
                email: req.body.email,
            });

            //Nếu ko tồn tại, ko phải super admin hoặc admin
            if ( !user || user.status !== 1 ) {
                if ( user.role === 'admin' || user.role === 'super_admin' ) {}
                else {
                    return res.status(401).json({
                        success: false,
                        message: "invalid credential ",
                    });
                }
            } else{
                next();
            }
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: " invalid credential "
            });
        }
    } else {
        if ( req.user.status !== 1 ) {
            if ( req.user.role === 'admin' || req.user.role === 'super_admin') {}
            else {
                return res.status(401).json({
                    success: false,
                    message: " invalid credential "
                });
            }
        } else next();
    }
}

exports.uploadBackupFiles = () => {
    // 2. copy file được gửi lên vào backup/all/'version'/data
    const getFile = multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                let newPath = `${path.resolve(__dirname, "..", "upload")}/homestays-photos`;
                if (!fs.existsSync(newPath)) {
                    fs.mkdirSync(newPath, {
                        recursive: true
                    });
                }
                console.log(`create folder : ${newPath} : in multer`)
                cb(null, newPath)
            },
            filename: function (req, file, cb) {
                console.log(`create name file : ${file.originalname} : in multer`);
                cb(null, file.originalname);
            },
        }),
        limits: { fieldSize: 25 * 1024 * 1024 }
    });

    return getFile.array('files',10);
}