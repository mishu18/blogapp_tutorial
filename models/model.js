// const mongoose=require('mongoose');

// //defining schema
// const blogSchema=mongoose.Schema({
//     title:{
//         type: String,
//     },
//     author:{
//         type: String,
//     },
//     desc:{
//         type : String,
//     }
// });

// //exporting the schema model 
// module.exports=mongoose.model('Blog',blogSchema);

const mongoose=require('mongoose');

const blogSchema=mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    author:{
        type: String,
        required:true
    },
    desc:{
        type: String,
        required:true
    }
},{
    timestamps:true
});
//to export module
module.exports=mongoose.model('Blog',blogSchema);