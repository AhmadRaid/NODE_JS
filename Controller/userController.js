const User = require('../Models/user')

exports.register_page = (req, res, next) => {
    res.render('auth/register');
}



exports.register_post = (req, res, next) => {
// Getting Email and PAssword Entered by user
var email = req.body.username;
var password = req.body.password;
  
/* Registering the user with email and
password in our database  
and the model used is "User" */
User.register({ username : email }, 
req.body.password, function (err, user) {      
  if (err) {
    
    // if some error is occurring, log that error
    console.log(err);
  }
  else {
    passport.authenticate("local")
    (req, res, function() {
      res.send("successfully saved!"); 
    })
   }
 })
}

exports.index = (req, res, next) => {
    User.find({})
    .then(category => {
        res.render('categories/index',{
            categories: category
        })
    })
    .catch(err => {
        console.error(err)
    })
            
   
}

exports.create = (req, res, next) => {
    res.render('categories/create');
}

exports.store = (req, res, next) => {

    const user = new User({
        name: 'req.body.name'
    });

    category.save()
    .then(result => {
        res.redirect('/category')
    })
    .catch(err => {
        console.log(err);
    })

}

exports.edit = (req, res, next) => {
    Category.findById(req.params.id)
    .then(category_item => {
        res.render('categories/edit',{
            category:category_item
        });

    })
    .catch(err =>{
        console.log(err);
    })
}

exports.update = (req, res, next) => {
      
Category.findById(req.params.id)
    .then(category=>{
        category.name = req.body.name;
        return category.save()
        .then(updated_category=>{
            console.log(updated_category);
            res.redirect('/category')

        })
        .catch(err =>{
            console.log(err);
        })
    })
    .catch(err =>{
        console.log(err);
    })


    }

exports.delete = (req, res, next) => {
    Category.deleteOne({ _id: req.params.id})
    .then(() => {
        res.redirect('/category')
    })
    .catch(err => console.log(err));

        }