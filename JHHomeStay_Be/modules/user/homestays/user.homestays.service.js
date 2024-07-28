const {Homestays, Amenities, GeneralServices, Bills, Photos, Services, Users} = require("../../../models");
const {db} = require("../../../helpers/dbHelper");
const {ObjectId} = require('mongodb');
const path = require("path");
const child_process = require("child_process");
const {set} = require("mongoose");
const qty = 20;                             // Số lượng homestays mỗi slice

exports.getRankingHomestays = async (quantity) => {
    const homestays = await Homestays(db).aggregate([
        {
            $unwind: {
                path: "$rates",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: "$_id",
                homestays: { $first: "$$ROOT" },
                rates: { $push:
                        {
                            "_id": "$rates._id",
                            "cleanRate": "$rates.cleanRate",
                            "serviceRate": "$rates.serviceRate",
                            "valueRate": "$rates.valueRate",
                            "accuracyRate": "$rates.accuracyRate",
                            "description": "$rates.description",
                            "userName": "$rates.userName",
                            "createdAt": "$rates.createdAt",
                        }},
                countRates: {$sum: 1},
                totalRates: {
                    $sum: {
                        $sum: ["$rates.cleanRate", "$rates.serviceRate", "$rates.valueRate", "$rates.accuracyRate"]
                    }
                }
            }
        },
        {
            $replaceRoot: { "newRoot": { "$mergeObjects": ["$homestays", { totalRates: "$totalRates" }, { countRates: "$countRates"}, {rates: "$rates"}]} }
        },
        {
            $set: {
                averageRates: {$divide: ["$totalRates", {$multiply: ["$countRates", 4]}]}
            }
        },
        {
            $sort: {"averageRates" : -1}
        },
        {
            $limit: Number(quantity)
        },
        {
            $lookup: {
                from: "photos",
                localField: "photos",
                foreignField: "_id",
                as: "photos"
            }
        }
    ]);
    return homestays;
}

exports.createRating = async (id, rate) => {
    const homestay = await Homestays(db).findByIdAndUpdate(id, {
        $push: {rates: rate}
    }, {new: true})
    return homestay;
}

exports.getHomestayById = async (id) => {
    const homestay = await Homestays(db).findById(id)
        .populate('amenities',"name")
        .populate('generalServices', "name")
        .populate('photos', "url")
        .populate('services',"name pricePerUnit personServe");
    return homestay;
}

exports.getHomestayByFilter = async(province, type, averageRates, minPrice, maxPrice, generalServices, amenities, slice) =>  {

    //Chuẩn bị Filter để lọc dữ liệu
    let keyFilter = {};
    if (province) {
        keyFilter = { ...keyFilter, province: {$regex: province},}
    }
    if (type) {
        keyFilter = { ...keyFilter, type: {$regex: type},}
    }
    if (generalServices) {
        let data = [];
        if (typeof (generalServices) === 'string') {
            data.push(...(await GeneralServices(db).find({name: generalServices})));
        } else {
            for (let i = 0; i < generalServices.length; i++) {
                data.push((await GeneralServices(db).findOne({name: generalServices[i]})));
            }
        }
        data = data.map(a => a._id);
        keyFilter = { ...keyFilter, generalServices:  {$all: data}}
    }
    if (amenities) {
        keyFilter = { ...keyFilter, amenities: {$all: amenities}}
    }
    if (minPrice) {
        if (maxPrice){
            keyFilter = {...keyFilter, price: {$gte: minPrice, $lte: maxPrice}}
        }
        else {
            keyFilter = { ...keyFilter, price: {$gte:minPrice}}
        }
    }
    else {
        if (maxPrice) {
            keyFilter = {...keyFilter, price: {$lte: maxPrice}}
        }
    }
    //Lọc theo filter và trả về số lượng homestays là 16, theo đúng số homestays mỗi trang cho FE
    let homestaysDocs =  (await Homestays(db).find(keyFilter).sort({'price': 'desc'})
        .populate('amenities',"name")
        .populate('generalServices', "name")
        .populate('photos', "url")
        .populate('services',"name"));

    console.log(slice);
    console.log(slice*qty, slice*qty+ qty);
    let homestaysArray =  homestaysDocs.filter(homestay => ((!homestay.averageRates) || (homestay.averageRates> averageRates)));
    let sliceTotal = Math.floor(homestaysArray.length / qty) + 1;

    return {homestays: homestaysArray.slice(slice*qty, slice*qty+ qty), sliceTotal : sliceTotal};
}

// Trả về khoảng thời gian homestay đã được đặt dựa vào homestay 's id , nếu chưa được đặt trả về null
exports.getCheckInAndOutDateByIdHomestay = async (id) => {
    let bill = await Bills(db).aggregate([
        {
            $match: {
                homestay: ObjectId(id),
                status: parseInt("2")
            }
        },
        {
            $project: {
                "checkinDate":1, "checkoutDate":1
            }
        }
    ]);
    return bill;
}

//Update Homestays Service
exports. updateHomestay = async (homestayId, homestayName, homestayPrice, homestayType, homestayAddress,homestayProvince, homestayDistrict, homestayLatitude, homestayLongitude, homestayArea, homestayDescription, homestayAvailable, homestayAmenities, homestayServices, homestayGeneralServices, homestayPhotos, adminId, newHomestayPhotos) =>{
    // Tạo object rỗng để chứa các thông tin cần cập nhật
    let setHomestay = {};

    // Kiểm tra và cập nhật
    if (adminId) {
        setHomestay = {...setHomestay, "admin": adminId};
        await Users(db).findByIdAndUpdate(adminId, {
            $push: {homestays: homestayId}
        });
    }

    if( homestayName ){
        setHomestay = {...setHomestay, "name": homestayName};
    }

    if( homestayPrice ){
        setHomestay = {...setHomestay, "price": homestayPrice};
    }

    if( homestayType ){
        setHomestay = {...setHomestay, "type": homestayType};
    }

    if( homestayAddress ){
        setHomestay = {...setHomestay, "address": homestayAddress};
    }

    if( homestayProvince ){
        setHomestay = {...setHomestay, "province": homestayProvince};
    }

    if( homestayDistrict ){
        setHomestay = {...setHomestay, "district": homestayDistrict};
    }

    if( homestayLatitude ){
        setHomestay = {...setHomestay, "latitude": homestayLatitude};
    }

    if( homestayLongitude ){
        setHomestay = {...setHomestay, "longitude": homestayLongitude};
    }

    if( homestayArea ){
        setHomestay = {...setHomestay, "area": homestayArea};
    }

    if( homestayDescription ){
        setHomestay = {...setHomestay, "description": homestayDescription};
    }

    if( homestayAvailable ){
        setHomestay = {...setHomestay, "available": homestayAvailable};
    }

    if( homestayPhotos ) {
        setHomestay = {...setHomestay, "photos": homestayPhotos.map(photo => photo._id)};
        // xóa các photos không được chọn để update
        let oldPhotos = (await Homestays(db).findById(homestayId)
            .populate('photos', "url")).photos;
        let delPhotos = oldPhotos.filter((o) => {
            return !homestayPhotos.includes(o._id.toString());
        });
        let newPath = path.resolve(__dirname, '../../..');
        for(let i = 0; i < delPhotos.length; i++) {
            child_process.exec(`del /f ${newPath}${delPhotos[i].url.replace(/\//g, '\\').replace(/ /g, '*')}`, (error, stdout, stderr) => {
                if (error) {
                    console.log(error);
                }
                console.log('del file success')
                console.log(`stdout: ${stdout}`);
                console.error(`stderr: ${stderr}`);
            });
        }
    }

    // Cập nhật vào database
    await Homestays(db).updateOne(
        {_id: homestayId},
        {$set: setHomestay}
    );

    if (homestayServices) {
        await Homestays(db).findByIdAndUpdate(homestayId, {
            $set: {services: []}
        });
        for (let i = 0; i < homestayServices.length; i++) {
            if (homestayServices[i]?._id) {
                await Services(db).findOneAndRemove({
                    _id: new ObjectId(homestayServices[i]._id)
                })
            }
            const service = await Services(db).create(homestayServices[i]);
            await Homestays(db).findByIdAndUpdate(homestayId, {
                $push: {services: service._id}
            })
        }
    }

    if (newHomestayPhotos) {
        for (let i = 0; i < newHomestayPhotos.length; i++) {
            const photo =  await Photos(db).create({
                url: newHomestayPhotos[i]
            });
            await Homestays(db).findByIdAndUpdate(homestayId, {
                $push: {photos: photo._id}
            })
        }
    }

    if (homestayAmenities) {
        await Homestays(db).findByIdAndUpdate(homestayId, {
            $set: {amenities: []}
        })
        for (let i = 0; i < homestayAmenities.length; i++) {
            if (homestayAmenities[i]?._id) {
                await Amenities(db).findOneAndRemove({
                    _id: new ObjectId(homestayAmenities[i]._id)
                })
            }
            const amenity =  await Amenities(db).create(homestayAmenities[i]);
            await Homestays(db).findByIdAndUpdate(homestayId, {
                $push: {amenities: amenity._id}
            })
        }
    }

    if (homestayGeneralServices) {
        await Homestays(db).findByIdAndUpdate(homestayId, {
            $set: {generalServices: []}
        })
        for (let i = 0; i < homestayGeneralServices.length; i++) {
            if (homestayGeneralServices[i]?._id) {
                await GeneralServices(db).findOneAndRemove({
                    _id: new ObjectId(homestayGeneralServices[i]._id)
                })
            }
            const generalService =  await GeneralServices(db).create(homestayGeneralServices[i]);
            await Homestays(db).findByIdAndUpdate(homestayId, {
                $push: {generalServices: generalService._id}
            })
        }
    }
    return (await Homestays(db).findById(homestayId)
        .populate('amenities',"name")
        .populate('generalServices', "name")
        .populate('photos', "url")
        .populate('services',"name pricePerUnit personServe"));
}

