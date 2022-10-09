const Product = require('../Models/product')
const Sub_Category = require('../Models/sub_category')

const ITEMS_PER_PAGE = 6;

exports.index = async (req, res, next) => {
    const page = +req.query.page;
    let totalItems;

   await Product.find({})
    .count()
    .then(numProducts => {
        totalItems = numProducts;

        return Product.find()
        .populate("sub_category_id")
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then(products => {
        res.render('product/index',{
            products: products,
            pageTitle: 'Product List',
            totalProducts: totalItems,
            currentPage: page,
            hasNextPage: ITEMS_PER_PAGE * page < totalItems,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
        })
    })
    .catch(err => {
        console.log(err)
    })
   
}

exports.create = async (req, res, next) => {
   await Sub_Category.find({})
    .then(category => {
        res.render('product/create',{
           sub_categories : category
        })
    })
    .catch(err => {
        console.log(err);
    })

}

exports.store = async(req, res, next) => {

    console.log(req.body);
    console.log(req.file);

    const image = req.file;

    // if (!image) {
    //     return res.status(422).render('admin/edit-product', {
    //       pageTitle: 'Add Product',
    //       path: '/admin/add-product',
    //       editing: false,
    //       hasError: true,
    //       product: {
    //         title: title,
    //         price: price,
    //         description: description
    //       },
    //       errorMessage: 'Attached file is not an image.',
    //       validationErrors: []
    //     });
    //   }
    //   const errors = validationResult(req);   

    //   if (!errors.isEmpty()) {
    //     console.log(errors.array());
    //     return res.status(422).render('admin/edit-product', {
    //       pageTitle: 'Add Product',
    //       path: '/admin/add-product',
    //       editing: false,
    //       hasError: true,
    //       product: {
    //         title: title,
    //         imageUrl: imageUrl,
    //         price: price,
    //         description: description
    //       },
    //       errorMessage: errors.array()[0].msg,
    //       validationErrors: errors.array()
    //     });
    //   }

      const imageUrl = image.path;

    const product = new Product({
        name: req.body.name_category,
        sub_category_id: req.body.category_id,
        price: req.body.product_price,
        quantitiy: req.body.product_quantity,
        status: req.body.status,
        imageUrl: imageUrl,
    });

    await product.save()
    .then(result => {
        res.redirect('/products');
        //res.status(200).json(category);
    })
    .catch(err => {

        console.log(err);
       
    });

};

exports.edit = async(req, res, next) => {
   await Product.findById(req.params.id)
    .then(product_item => {
        res.render('product/edit',{
            product:product_item
        });

    })
    .catch(err =>{
        console.log(err);
    })
}

exports.update = async(req, res, next) => {
      
await Product.findById(req.params.id)
    .then(product=>{
        category.name = req.body.name;
        return category.save()
        .then(updated_product=>{
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

exports.delete = async(req, res, next) => {
    await Product.deleteOne({ _id: req.params.id})
    .then(() => {
        res.redirect('/product')
    })
    .catch(err => console.log(err));

        }


exports.uploadFile = (req,res,next) => {
    images = req.images;
    
}