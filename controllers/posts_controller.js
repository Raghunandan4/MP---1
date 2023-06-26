const Post = require('../models/post');
const Comment = require('../models/comment');
const { post } = require('../routes');

module.exports.create = async function(req, res) {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if (req.xhr) { // XML HTTP Request - xhr
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post Created!"
            });
        }

        req.flash('success', 'Post Published!');
        return res.redirect('back');
    } catch (err) {
        // console.log('Error', err);
        req.flash('error', err);
        return res.redirect('back');
    }

}

module.exports.destroy = async function(req, res) {
    try {
        let post = await Post.findById(req.params.id);
        if (post.user == req.user.id) {
            post.remove();
            await Comment.deleteMany({ post: req.params.id });
            req.flash('success', 'Post and associated comments Deleted!');
            return res.redirect('back');
        } else {
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }
    } catch (err) {
        // console.log('Error', err);
        req.flash('error', err);
        return res.redirect('back');
    }

}