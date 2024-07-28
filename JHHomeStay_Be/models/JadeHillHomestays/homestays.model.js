const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Bảng danh sách và các thông tin tổng quan của homestays
//Lưu ý bảng này có options timestamp nên khi truy vấn chú ý
const HomestaysSchema = new Schema(
    {
        name: { // Tên homestay
            type: String,
            required: true
        },
        price: { // Giá homestay
            type: Number,
        },
        type: { // Loại homestay -> đổi thành 1 collection
            type: String,
        },
        address: { // địa chỉ cụ thể của homestay
            type: String,
        },
        province: { // Địa chỉ tỉnh
            type: String,
        },
        district: { // Địa chỉ huyện
            type: String,
        },
        latitude: { // Tọa độ: Vĩ độ
            type: String
        },
        longitude: { //Tọa độ: Kinh độ
            type: String
        },
        area: { // Khu vực
            type: String
        },
        description: { // Mô tả về homestay
            type: String
        },
        rates: [
            {
                cleanRate: { // Đánh giá mức độ sạch sẽ
                    type: Number
                },
                serviceRate: { //Đánh giá dịch vụ
                    type: Number
                },
                valueRate: { // Đánh giá giá trị
                    type: Number
                },
                accuracyRate: { // Đánh giá sự chính xác, làm việc chuẩn của homestay
                    type: Number
                },
                description: { // Mô tả chi tiết
                    type: String
                },
                userName: { // Tên của người đánh giá
                    type: String
                },
                createdAt: { // Ngày tạo đánh giá
                    type: Date
                },
            },
        ],
        available: { // Trạng thái của homestays 1 - đã có người đặt nhưng chưa đc sử dụng || 2 - đang có người sử dụng || 3 - đã sử dụng xong, chưa có người đặt
            type: Number
        },
        amenities:[{
            type:Schema.Types.ObjectId,
            ref:'Amenities'
        }],
        services: [{
            type: Schema.Types.ObjectId,
            ref: 'Services'
        }],
        generalServices: [{
            type: Schema.Types.ObjectId,
            ref: 'GeneralServices'
        }],
        admin: {
            type: Schema.Types.ObjectId,
            ref: 'Users'
        },
        superAdmin: {
            type: Schema.Types.ObjectId,
            ref: 'Users'
        },
        photos: [{
            type: Schema.Types.ObjectId,
            ref: 'Photos'
        }],
        bills: [{
            type: Schema.Types.ObjectId,
            ref: 'Bills'
        }]
    },
    {toJSON: { virtuals: true },
        toObject: { virtuals: true }});

HomestaysSchema.virtual('averageRates').get(function () {
    let total = 0, count = 0;
    this.rates.forEach((rate) => {
        total += rate.cleanRate + rate.serviceRate + rate.valueRate +  rate.accuracyRate;
        count++;
    });
    return total / (count * 4);
});

module.exports = (db) => {
    if (!db.models.Homestays) {
        return db.model('Homestays', HomestaysSchema);
    }
    return db.models.Homestays;
}
