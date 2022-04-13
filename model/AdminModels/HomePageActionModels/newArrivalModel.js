const db = require("../../dbConnection");


const newArrivalSchema = new db.Schema({
    bookId: {
        type: db.Schema.Types.ObjectId,
        required: true,
        ref: 'Book'
    }
});


const NewArrival = new db.model("NewArrival", newArrivalSchema);


module.exports = { NewArrival };