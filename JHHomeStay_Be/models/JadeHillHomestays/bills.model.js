const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BillsSchema= new Schema({
    customer: { // thông tin người đặt bill
        name: {
            type: String
        },
        identification: {
            type: String,
        },
        email: {
            type: String
        },
        phoneNumber: {
            type: String
        },
        age: {
            type: Number
        }
    },
    customerTogether: [{ // thông tin người đi kèm
        name: {
            type: String
        },
        age: {
            type: Number
        }
    }],
    homestay: {
        type: Schema.Types.ObjectId,
        ref : 'Homestays',
        required: false,
    },
    checkinDate: { // ngày bắt đầu đặt
        type: Date,
        required: false,
    },
    checkoutDate: { // ngày kết thúc đặt
        type: Date,
        required: false
    },
    price : { // giá của bill - tự tính từ homestays và services đi kèm
        type: Number,
        required: false
    },
    status: { // trạng thái của bills: 1 - đang chờ || 2 - đã duyệt || 3 - đã thanh toán
        type: Number,
        required: false,
        default: 1
    },
    servicesPerBill: [{
        services: {
            type: Schema.Types.ObjectId,
            ref: 'Services'
        },
        count: {
            type: Number,
            required: false
        }
    }]
});

module.exports = (db) => {
    if (!db.models.Bills) {
        return db.model('Bills', BillsSchema);
    }
    return db.models.Bills;
}