const Review = require('../models/reviews');
const mongoose = require('mongoose');

const reviewResolvers = {
    reviews: () => {
        return Review.find()
        .populate('user')
        .populate('restaurant')
        .then((result) => {
            return result;
        })
    },
    reviewById: ({ id }) => {
        const mongooseID = mongoose.Types.ObjectId(id);
        return Review.findById(mongooseID)
        .populate('user')
        .populate('restaurant')
        .then((result) => {
            return result;
        })
    },
    createReview: ({ reviewInput }) => {
        const newReview = new Review({
            body: reviewInput.body,
            rating: reviewInput.rating,
            restaurant_name: reviewInput.restaurant_name,
            user_id: reviewInput.user_id
        });
        return newReview.save();
    },
    updateReview: ({ id, reviewInput}) => {
        const mongooseID = mongoose.Types.ObjectId(id);
        return Review.findByIdAndUpdate(mongooseID, reviewInput);
    }
}

module.exports = { reviewResolvers }