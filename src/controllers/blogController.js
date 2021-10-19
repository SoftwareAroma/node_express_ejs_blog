const Blog = require('../models/blog');

const blog_index = (request, response) => {
    Blog.find().sort({
        createdAt: -1,
    }).then((results) => {
        response.render('blogs/index', {
            title: 'All Blog',
            blogs: results,
        });
    }).catch((error) => {
        console.log(error);
    });
}

const blog_details = (request, response) => {
    const id = request.params.id;
    Blog.findById(id).then((blog) => {
        response.render('blogs/blog', {
            title: "Blog Details",
            blog: blog,
        });
    }).catch(() => {
        response.status(404).render('404', {
            title: "Blog not found"
        });
    });
}

const blog_create_get = (request, response) => {
    response.render('blogs/create', {
        title: "Create",
    });
}

const blog_create_post = (request, response) => {
    const blog = new Blog(request.body);
    blog.save().then(() => {
        response.redirect('/blogs');
    }).catch((error) => {
        console.log(error);
    });
}


const blog_delete = (request, response) => {
    const id = request.params.id;
    Blog.findByIdAndDelete(id).then((result) => {
        console.log("Done deleting blog.", result);
        response.json({
            redirect: '/blogs'
        });
    }).catch((error) => {
        console.log("There was an error deleting blog", error);
    });
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}