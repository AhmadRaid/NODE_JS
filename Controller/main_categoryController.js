const Category = require('../Models/main_category')

exports.index = (req, res, next) => {
    Category.find({})
    .then(category => {
       // return category;
        res.render('main_category/index',{
            categories: category
        })
    })
    .catch(err => {
        console.log(err)
    })
   
}

exports.create = (req, res, next) => {
    res.render('main_category/create');
}

exports.store = (req, res, next) => {

    const category = new Category({
        name: req.body.name_category
    });

    category.save()
    .then(result => {
        res.redirect('/main_category');
        //res.status(200).json(category);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });

};

exports.edit = (req, res, next) => {
    Category.findById(req.params.id)
    .then(category_item => {
        res.render('main_category/edit',{
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