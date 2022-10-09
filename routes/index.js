const express = require('express');
const post = require('../Controller/postController');
const auth = require('../Controller/authController');
const permission = require('../Controller/permissionController');
const role = require('../Controller/roleController');
const passport = require('passport');
const Main_Category = require('../Controller/main_categoryController')
const Sub_Category = require('../Controller/sub_categoryController')
const Product = require('../Controller/productController')
const User = require('../Models/user')
const Permission = require('../Models/permission')
const checkPermission = require('../middleware/checkPermission')

const router = express.Router()

router.get('/permission', permission.index);
router.get('/permission/create', permission.create);
router.post('/permission/store', permission.store);
// router.get('/permission/edit/:id', permission.edit);
// router.post('/permission/update/:id', permission.update);
// router.get('/permission/delete/:id', permission.delete);
router.get('/checkPermission/:resource/:permission', checkPermission('create'), permission.updatePermission);


router.get('/role', role.index);
router.get('/role/create', role.create);
router.post('/role/store', role.store);
// router.get('/role/edit/:id', role.edit);
// router.post('/role/update/:id', role.update);
// router.get('/role/delete/:id', role.delete);



router.get('/',(req,res,next) => {
    res.render('dashboard');
});

router.get('/index_chat',(req,res,next) => {
    res.render('index_chat');
});
 
router.get('/chat',(req,res,next) => {
    res.render('chat');
});

router.get('/login',auth.login_page);


router.post('/login', passport.authenticate('local-login', {
	failureRedirect : '/login',
	failureFlash : false // allow flash messages
}), function(req, res, next)  {
	req.session.save(() => {
		res.redirect('/')
	})
});


router.get('/register',auth.register_page);


router.post('/register',passport.authenticate('local-signup', {
	failureRedirect : '/register',
	failureFlash : false // allow flash messages
}), function(req, res, next)  {
	res.redirect('/')
});


router.get('/main_category',Main_Category.index);

router.get('/main_category/create',Main_Category.create);

router.post('/main_category/store',Main_Category.store);

router.get('/main_category/edit/:id',Main_Category.edit);

router.post('/main_category/update/:id',Main_Category.update);

router.get('/main_category/delete/:id',Main_Category.delete);



router.get('/post',post.index);

router.get('/post/create',post.create);

router.post('/post/store',post.store);

// router.get('/post/edit/:id',post.edit);

// router.post('/post/update/:id',post.update);

// router.get('/post/delete/:id',post.delete);



router.get('/sub_category',Sub_Category.index);

router.get('/sub_category/create',Sub_Category.create);

router.post('/sub_category/store',Sub_Category.store);

// router.get('/sub_category/edit/:id',Sub_Category.edit);

// router.post('/sub_category/update/:id',Sub_Category.update);

// router.get('/sub_category/delete/:id',Sub_Category.delete);





router.get('/products',Product.index);

router.get('/product/create',Product.create);

router.post('/product/store',Product.store);

// router.get('/sub_category/edit/:id',Sub_Category.edit);

// router.post('/sub_category/update/:id',Sub_Category.update);

// router.get('/sub_category/delete/:id',Sub_Category.delete);





module.exports = router