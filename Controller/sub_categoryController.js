const Sub_Category = require('../Models/sub_category')
const Main_Category = require('../Models/main_category')


exports.index = (req,res,next) => {

	Sub_Category.find({})
	.populate("main_category_id")
	.then(sub_category => {
		console.log(sub_category);
		res.render('SubCategory/index',{
			Sub_Category:sub_category
			})
		})
	.catch(err =>{
		console.log(err)
	})

}

exports.create = (req,res,next) => {
	Main_Category.find({}) 
	.then(main_cat=> {
	res.render('SubCategory/create',{
		Main_Categories:main_cat
		})

	})
	.catch(err => {
		console.log(err)
	})


}


exports.store = (req,res,next) => {

	const sub_category = new Sub_Category({
		name : req.body.name_category,
		main_category_id : req.body.main_category_id
	})

	sub_category.save()
	.then(result => {

        res.redirect('/sub_category');

	})
	.catch(err => {
		console.log(err);
	})
 }