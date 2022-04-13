const { Review } = require("../model/ProductModels/reviewModel");


const addReview = (req, res) => {
    const newReview = new Review({
        bookId: req.body.bookId,
        userId: req.body.userId,
        review: req.body.review,
        rating: req.body.rating,
        createdOn: new Date(req.body.createdOn)
    });
    newReview.save().then((review) => {
        res.json({ review });
    }).catch((err) => {
        res.status(409).json(err);
    });
};

const deleteReview = (req, res) => {
    Review.findByIdAndDelete(req.body.id, (err, doc) => {
        if (err)
            res.status(500).json(err);
        else
            res.status(200).json(doc);
    });
};

module.exports = {
    addReview,
    deleteReview
}