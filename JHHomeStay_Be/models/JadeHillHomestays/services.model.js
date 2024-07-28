const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServicesSchema= new Schema({
    name: {
        type: String,
    },
    pricePerUnit: {
        type: Number,
    },
    personServe: {
        type: Number,
    },
    bills: [{ // kh
        type: Schema.Types.ObjectId,
        ref: 'Bills'
    }],
    homestays: [{
        type: Schema.Types.ObjectId,
        ref: 'Homestays'
    }]
});

module.exports = (db) => {
    if (!db.models.Services) {
        return db.model('Services', ServicesSchema);
    }
    return db.models.Services;
}