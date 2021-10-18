const home_page = (request, response) => {
    response.redirect('/blogs');
}

const about_page = (request, response) => {
    response.render('about', {
        title: "About"
    });
}

module.exports = {
    home_page,
    about_page
}