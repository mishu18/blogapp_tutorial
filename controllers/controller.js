// const Blog=require('../app/models/model');

// exports.findAll=function(req,res){
//     Blog.find(function(err,doc){
//         if(err) return res.status(400).send(err);
//         res.status(200).json(doc);
//     })
// };

// exports.create=function(req,res){
    
//     if(!req.body.title||!req.body.author||!req.body.content) {
//         return res.status(400).send({
//             message: "Every field is required"
//         });
//     }

//     const newblog=Blog({
//         title: req.body.title,
//         author: req.body.author,
//         desc: req.body.desc
//     });
    

//     Blog.findOne({title: newblog.title},function(err,note){
//         if(blog)return res.status(400).json({message: "same title exists"});

//         newblog.save(function(err,doc){
//             if(err) return res.status(400).json(err);
//             res.status(201).json({
//                 post : true,
//                 blog : doc
//             });
//         });
//     });
// };

// exports.update=function(req,res){
    
//     if(!req.body.title||!req.body.author||!req.body.content) {
//          return res.status(400).send({
//              message: "Every field is required"
//          });
//      }
     
//      Blog.findByIdAndUpdate(req.params.blogId,{
//          title : req.body.title,
//          author : req.body.author,
//          desc : req.body.desc
//      },{new: true},function(err,doc){
//          if(err) return res.status(400).send(err);
         
//          if(!doc) return res.status(404).json({message : "No blog with this id has been found"});
 
//          res.status(200).json({
//              update : true,
//              blog : doc
//          });
//      });
//  };

//  exports.delete=function(req,res){
//     Blog.findByIdAndDelete(req.params.blogId,function(err,doc){
//         if(err) return res.status(400).send(err);

//         if(!doc) return res.status(404).json({message : "NOt found"});

//         res.status(200).json({
//             delete : true,
//             blog : doc
//         });
//     })
// };

const Blog = require('../models/model');
// find all blogs
exports.getall = async (req, res) => {

    // Blog.find()
    //     .then((data)=>{
    //         res.status(200).json(data);
    //     })
    //     .catch((err)=>{
    //         if(err) res.status(500).json(err);
    //     });
    let data;
    try {
        data = await Blog.find();
        // console.log(data);

    } catch (err) {
        if (err) return res.status(500).json(err);
    }
    res.status(200).json(data);
}

// find single blog by id
exports.getone = async (req, res) => {
    // console.log(req.params);
    let data;
    try {
        const value = req.params.value;
        const type = req.params.type;
        // console.log(value);
        // console.log(type);
        let query;
        switch(type){
            case "000" :
                query = {"id" : value};
                break;
            case "100" :
                query = {"title" : value};
                break;
            case "010" :
                query = {"author" : value};
                break;
            case "001" : 
                query = {"desc" : value};
                break;
        }

        // console.log(query);
        data = await Blog.find(query);
    }
    catch (err) {
        if (err) return res.status(500).json(err);
    }
    if (!data) return res.status(404).json({ "msg": "Blog not found" });
    res.status(200).json(data);

    // Blog.findById(req.params.blogID)
    //     .then((data)=>{
    //         if(!data) return res.status(404).json({"mag":"Blog not found"});
    //         res.status(200).json(data);
    //     })
    //     .catch((err)=>{
    //         if(err) res.status(500).json(err);
    //     })

}
//author 
//title 
//desc 


// create a blog
exports.create = async (req, res) => {


    let data, newblog;
    try {
        const newreq = await req;
        console.log(newreq);

        newblog = new Blog({
            title: newreq.body.title,
            author: newreq.body.author,
            desc: newreq.body.desc
        });
        
        data = await newblog.save();
    }
    catch (err) {
        if (err) return res.status(500).json(err);
    }
    res.status(201).json({ "msg": "created", "blog": newblog });

    // newblog.save().then((blog)=>{
    //     res.status(201).json({"msg":"created","blog":blog});
    // }).catch((err)=>{
    //     if(err) return res.status(500).json(err);
    // })
}

//to update a blog

exports.updateone = async (req, res) => {

    let data;
    try {
        if (!req.body.title || !req.body.desc || !req.body.author)
            return res.status(500).json({ "msg": "fill all the fields" });

        data = await Blog.findByIdAndUpdate(req.params.blogID, {
            title: req.body.title,
            author: req.body.author,
            desc: req.body.desc
        }, { new: true })
    }
    catch (err) {
        if (err) res.status(500).json(err);
    }

    if (!data) return res.status(404).json({ "msg": "Not found" });
    res.status(202).json({
        "msg": "updated",
        "doc": data
    });

    // if (!req.body.title || !req.body.desc || !req.body.author)
    //     return res.status(500).json({ "msg": "fill all the fields" });

    // Blog.findByIdAndUpdate(req.params.blogID, {
    //     title: req.body.title,
    //     author: req.body.author,
    //     desc: req.body.desc
    // }, { new: true })
    //     .then((data) => {

    //         if (!data) return res.status(404).json({ "msg": "Not found" });
    //         res.status(202).json({
    //             "msg": "updated",
    //             "doc": data
    //         });
    //     })
    //     .catch((err) => {
    //         if (err) res.status(500).json(err);
    //     })
}

// to delete a blog

exports.deleteone = async (req, res) => {

    let data;
    try{
        data = await Blog.findByIdAndDelete(req.params.blogID);
    }
    catch(err){
        if (err) res.status(500).json(err);
    }
    if (!data) return res.status(404).json({ "msg": "Blog not found" });

    res.status(202).json({
        "msg": "deleted",
        "doc": data
    });

    // Blog.findByIdAndDelete(req.params.blogID)
    //     .then((data) => {

    //         if (!data) return res.status(404).json({ "msg": "Blog not found" });

    //         res.status(202).json({
    //             "msg": "deleted",
    //             "doc": data
    //         });

    //     })
    //     .catch((err) => {
    //         if (err) res.status(500).json(err);
    //     });

}



