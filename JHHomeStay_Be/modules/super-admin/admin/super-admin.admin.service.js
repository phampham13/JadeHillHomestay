const {Users, Bills, Homestays} = require("../../../models");
const {db} = require("../../../helpers/dbHelper");
const {home} = require("nodemon/lib/utils");
const {authToken} = require("../../../middleware");
const {ObjectId} = require('mongodb');
const bcrypt = require('bcrypt');

//API để super admin chỉnh sửa thông tin Admin
exports.updateAdminById = async (id, name, address, role, email, password, phone, status, gender, identification, avatarUrl, dateAtWork, dateAtBirth, homestays) => {
    let setKey = {};
    if (name) {
        setKey = {...setKey, "name": name}
    }
    if (address) {
        setKey = {...setKey, "address": address}
    }
    if (role) {
        setKey = {...setKey, "role": role}
    }
    if (email) {
        setKey = {...setKey, "email": email}
    }
    if (password) {
        setKey = {...setKey, "password": await bcrypt.hash(password, 10)}
    }
    if (phone) {
        setKey = {...setKey, "phone": phone}
    }
    if (status) {
        setKey = {...setKey, "status": status}
    }
    if (gender) {
        setKey = {...setKey, "gender": gender}
    }
    if (identification) {
        setKey = {...setKey, "identification": identification}
    }
    if (avatarUrl) {
        setKey = {...setKey, "avatarUrl": avatarUrl}
    }
    if (dateAtWork) {
        setKey = {...setKey, "dateAtWork": new Date(dateAtWork)}
    }
    if (dateAtBirth) {
        setKey = {...setKey, "dateAtBirth": new Date(dateAtBirth)}
    }
    if (homestays) {
        setKey = {...setKey, "homestays": homestays}
    }

    await Users(db).update(
        {_id: id},
        {$set: setKey}
    )
    let admin = (await Users(db).findById(id));
    for (let i = 0; i < admin.homestays.length; i ++) {
        await Homestays(db).findOneAndUpdate({_id : admin.homestays[i]},
            {$push: {admin: id}})
    }
    return admin;
}

exports.createAdmin = async (name, address, role, email, password, phone, status, gender, identification, avatarUrl, dateAtWork, dateAtBirth, homestays) => {
    if (!name || !role || !email || !password || !phone || !identification || !dateAtWork || (role !== "admin"))
        return 0;
    let adminWithId = await Users(db).findOne(
        {identification: identification}
    )
    if (adminWithId) return 1;
    let createKey = {};
    if (name) {
        createKey = {...createKey, name: name}
    }
    if (role) {
        createKey = {...createKey, role: role}
    }
    if (address) {
        createKey = {...createKey, address: address}
    }
    if (email) {
        createKey = {...createKey, email: email}
    }
    if (password) {
        createKey = {...createKey, password: await bcrypt.hash(password, 10)}
    }
    if (phone) {
        createKey = {...createKey, phone: phone}
    }
    if (status) {
        createKey = {...createKey, status: status}
    }
    if (gender) {
        createKey = {...createKey, gender: gender}
    }
    if (identification) {
        createKey = {...createKey, identification: identification}
    }
    if (avatarUrl) {
        createKey = {...createKey, avatarUrl: avatarUrl}
    }
    if (dateAtWork) {
        createKey = {...createKey, dateAtWork: new Date(dateAtWork)}
    }
    if (dateAtBirth) {
        createKey = {...createKey, dateAtBirth: new Date(dateAtBirth)}
    }
    if (homestays) {
        createKey = {...createKey, homestays: homestays}
    }
    let admin = await Users(db).create(createKey);
    for (let i = 0; i < admin.homestays.length; i ++ ) {
        await Homestays(db).findOneAndUpdate({_id : admin.homestays[i]},
            {$push: {admin: admin.id}})
    }
    const admin2 = await Users(db).findById(admin.id);
    console.log(admin2);
    return admin2;
}


// Giao homestay cho admin
exports.assignAdminToHomestay = async (adminId, homestayId) => {
    await Users(db).findByIdAndUpdate(adminId, {
        $push: { homestays: homestayId}
    });
    await Homestays(db).findByIdAndUpdate(homestayId,{
        $set: { admin: adminId}
    });
    let modifyAdmin = await Users(db).findById(adminId);
    return modifyAdmin;
}

// Bỏ gán homestay cho admin
exports.unassignAdminToHomestay = async (adminId, homestayId) => {
    await Homestays(db).findByIdAndUpdate(homestayId,
        { $set: { admin: null } });
    await Users(db).updateMany(
        {},
        { $set: { "homestays.$[element]": null } },
        { arrayFilters: [ { "element": ObjectId(homestayId) } ] }
    );
    const homestay = await Homestays(db).findById(homestayId);
    return homestay;
}

// Xóa admin và tham chiếu
exports.deleteAdmin = async (id) => {
    await Users(db).deleteOne({ _id: ObjectId(id) });
    // Xóa tham chiếu
    await Homestays(db).updateMany(
        { admin: ObjectId(id) },
        {
            $pull: { admin: ObjectId(id) }
        }
    );
}

// Xóa homestay và tham chiếu
exports.deleteHomestay = async (id) => {
    const deleteHomestay = await Homestays(db).findById(id);
    await Homestays(db).deleteOne({ _id: ObjectId(id) });
    // Xóa tham chiếu

    /*await Users(db).updateMany(
        {},
        { $set: { "homestays.$[element]": null } },
        { arrayFilters: [ { "element": ObjectId(id) } ] }
    );*/
    let user = await Users(db).findById(deleteHomestay.admin);
    console.log(user);
    let listNewHomestay = [];
    const listOLdHomestay = user.homestays;
    console.log(deleteHomestay._id);
    console.log(typeof (deleteHomestay._id));
    listOLdHomestay.forEach(x => {
        if ( x == deleteHomestay._id ) {}
        else { listNewHomestay = [...listNewHomestay, x];console.log(x);
            console.log(typeof(x))};
    })
    user.homestays = listNewHomestay;
    console.log(user);
    await Users(db).findByIdAndUpdate(user._id,
        { $set: user },
        { new : true });
    await Bills(db).deleteMany(
        { homestay: ObjectId(id) }
    );
}

// Lấy danh sách admin
exports.getAdmins = async () => {
    return await Users(db).find({role: "admin", status: 1});
}

// Lấy admin theo id
exports.getAdminById = async (id) => {
    return await Users(db).findById(ObjectId(id));
}