const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sub_categorySchema = new Schema({
	name:{
		required:true,
		type:"string",
	},
	main_category_id:{
		type: mongoose.Schema.Types.ObjectId,
		 ref: 'main_category',
	}

});

module.exports = mongoose.model('sub_category', sub_categorySchema);
