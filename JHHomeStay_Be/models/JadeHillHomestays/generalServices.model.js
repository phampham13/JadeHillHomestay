//require thư viện mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//tạo ra quan hệ GeneralServices
const GeneralServicesSchema = new Schema({
    //tạo ra thuộc tính name và homeStayId
    name: {
        type: String,
    },
    homestays: [{
        type: Schema.Types.ObjectId,
        ref: 'Homestays'
    }]
});

module.exports = (db) => {
    if (!db.models.GeneralServices) {
        return db.model('GeneralServices', GeneralServicesSchema);
    }
    return db.models.GeneralServices;
}