const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiscountSchema = new Schema({
    name: {
        type: String
    },
    value: {
        type: Number
    }
    
});

module.exports = (db) => {
    if (!db.models.Discounts) {
        return db.model('Discounts', DiscountSchema);
    }
    return db.models.Discounts;
}