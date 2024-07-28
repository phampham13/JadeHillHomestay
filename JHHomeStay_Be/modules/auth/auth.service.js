const { Users, Homestays } = require('../../models');
const { db } = require("../../helpers/dbHelper");
const path = require("path");

// Chuyển file .env sang dạng sử dụng được để lấy thông tin
require('dotenv').config();

// Lấy thông tin người dùng có email và role giống như trong req
exports.getByEmailAndRole = async (data) => {
    const test = await Users(db).aggregate([
            {
                $match: {
                    email: data.email
                }
            },
            {
                $lookup: {
                    from: "homestays",
                    localField: "homestays",
                    foreignField: "_id",
                    as: "homestays"
                }
            },
            {
                $project:{
                    "_id":1,"name":1, "role":1, "email":1, "status":1, "token":1,"password":1,
                    "homestays._id":1,"homestays.name":1
                }
            }
    ],
        {
            allowDiskUse: true
        }
    );
    return test;
}
// Lấy thông tin người dùng có _id giống như trong req
exports.getById = async (data) => {
    return Users(db).findOne({
        _id: data._id
    });
}

// Thêm trường thông tin token cho user
exports.editUser = async (data) => {
    return Users(db).updateOne(
        {
            email: data.email
        }, {token: data.token});
}

// Xóa trường thông tin token khi người dùng log out
exports.deleteToken = async (data) => {
    return Users(db).updateOne(
        {
            _id: data._id
        }, {token: null});
}