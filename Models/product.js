const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
	name:{
		required:true,
		type:"string"
	},
	sub_category_id:{
		required:true,
		type:mongoose.Schema.Types.ObjectId,
		ref:'sub_category'
	},
	price:{
		required:true,
		type:'number'
	},
	quantitiy:{
		required:true,
		type:'number'
	},
	status:{
		required:true,
		type:'Number',
		default:'0'
	},
	imageUrl:{
		required:true,
		type:'string',
	}
});

module.exports = mongoose.model('product',productSchema);