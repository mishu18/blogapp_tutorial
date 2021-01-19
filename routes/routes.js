// module.exports=(app)=>{
//     //importing controller.js functions to routes.js
//     const blogs=require('../controllers/controller');

//     //create a new note
//     app.post('/api/create',blogs.create);
    
//     //retrive all notes
//     app.get('/api/notes',blogs.findAll);

//     //retrive a single note by id
//     app.get('/api/find/:noteId',blogs.findone);

//     //update a note with noteId
//     app.put('/api/update/:noteId',blogs.update);

//     //delete a Note with noteId
//     app.delete('/api/delete/:noteId',blogs.delete);
// }
module.exports=(app)=>{
    const blog=require('../controllers/controller');

    app.get('/api/blogs',blog.getall);
    app.get('/api/blog/:blogID',blog.getone);
    app.post('/api/create',blog.create);
    app.put('/api/update/:blogID',blog.updateone);
    app.delete('/api/delete/:blogID',blog.deleteone);
    
}