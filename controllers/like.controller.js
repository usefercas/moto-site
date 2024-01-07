const Like = require('../models/Like.model')


module.exports.doCreate = (req, res, next) => {
    const { riderId } = req.params;
    const userId = req.session.currentUser._id;

    Like.findOne({ user: userId, rider: riderId })
        .then((like) => {
            if (!like) {
               return Like.create({ user: req.session.currentUser._id, rider: riderId })
                        .then((like) => {
                           res.redirect('/riders')
                        })
            } else {
               return Like.findByIdAndDelete(like._id)
                        .then(() => {
                            res.redirect('/riders')
                        })
            }
        })
        .catch(next)
}