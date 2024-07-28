const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExampleSchema = new Schema({
    exampleName: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});

module.exports = (db) => {
    if (!db.models.Example) {
        return db.model('Example', ExampleSchema);
    }
    return db.models.Example;
}