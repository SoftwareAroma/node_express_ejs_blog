const trashCan = document.querySelector('.delete');

trashCan.addEventListener('click', () => {
    const endPoint = `/blogs/${trashCan.dataset.doc}`;
    fetch(endPoint, {
        method: 'DELETE',
    }).then((response) => {
        response.json().then((data) => {
            window.location.href = data.redirect;
        });
    }).catch(err => {
        console.log("There was an error fetching the endPoint. ", err);
    });
});