const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Bảng nội thất
const AmenitiesSchema = new Schema({
    name: { // Tên nội thất, ví dụ: Bếp ga, Tủ lạnh toshiba,...
        type: String,
    },
    type: { // Loại nội thất, ví dụ: Bếp, Tủ lạnh..
        type: String,
    },
    rooms: [{
        type: String,
        required: false,
    }],
    homestays:[{
        type: Schema.Types.ObjectId,
        ref: "Homestays",
        required: false
    }]
});

module.exports = (db) => {
    if (!db.models.Amenities) {
        return db.model('Amenities', AmenitiesSchema);
    }
    return db.models.Amenities;
}