const Post = require('../Models/post')

exports.index= (req,res) =>{
    Post.find({})
    .then(post => {

        res.render('posts/index', {
            posts: post
        })

    })

    .catch(err => {

        console.error(err)

    })
    
}

exports.create= (req,res) =>{
    res.render('posts/create',{user:req.user})
}


exports.store= (res,req) =>{

}