const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req, res) {
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    // return res.end('<h1>Express is up for Codeial!</h1>');

    // Post.find({}, function(err, posts) {
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts: posts
    //     });
    // });

    // For Populating the user of each post
    try {
        let posts = await Post.find({})
            .populate('user') // nesting populate
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });

        let users = await User.find({});

        return res.render('home', {
            title: "Codeial | Home",
            posts: posts,
            all_users: users
        });
    } catch (err) {
        console.log('Error', err);
        return;
    }
}

// module.exports.actionName = function(req, res){}

// using then :-
// Post.find({}).populate('comments').then(function(req,res)){}

let posts = Post.find({}).populate('comments').exec();
posts.then()