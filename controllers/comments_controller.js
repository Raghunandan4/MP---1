const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');

module.exports.create = async function(req, res) {
    try {
        let post = await Post.findById(req.body.post);
        // post found
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();
            comment = await comment.populate('user', 'name email').execPopulate();
            commentsMailer.newComment(comment);

            if (req.xhr) { // XML HTTP Request - xhr
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Comment created!"
                });
            }

            req.flash('success', 'Comment Published!');
            return res.redirect('/');
        }
    } catch (err) {
        req.flash('error', err);
        return res.redirect('back');
    }
};


module.exports.destroy = async function(req, res) {
    try {
        let comment = await Comment.findById(req.params.id);
        if (comment.user == req.user.id) {
            let postId = comment.post;
            comment.remove();
            let post = Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error', err);
        return;
    }
};