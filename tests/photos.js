var restify = require('restify');
var server = require('../server');

var client = restify.createJsonClient({
    url: 'http://localhost:3000'
});

// a static photo to CREATE READ UPDATE DELETE
var testPhoto = {
    id: '0',
    data: 'TEST'
};

client.post('/photos', testPhoto, function(err, req, res, photo) {
    if (err) {
        console.log('An error ocurred >>>>>>');
        console.log(err);
    } else {
        console.log('Product saved >>>>>>>');
        console.log(photo);
    }
});


client.get('/photos', function(err, req, res, photos) {
    if (err) {
        console.log('An error ocurred >>>>>>');
        console.log(err);
    } else {
        console.log('Total photos ' + photos.length);
        console.log('All photos >>>>>>>');
        console.log(photos);
    }
});


client.get('/photos', function(err, req, res, photos) {
    if (err) {
        console.log('An error ocurred >>>>>>');
        console.log(err);
    } else {
        console.log('Total photos ' + photos.length);
        console.log('All photos >>>>>>>');
        console.log(photos);
    }
});


client.put('/photos/' + testPhoto.id, testPhoto, function(err, req, res, status) {
    if (err) {
        console.log("An error ocurred >>>>>>");
        console.log(err);
    } else {
        console.log('Product saved >>>>>>>');
        console.log(status);
    }

});


client.del('/photos/' + testPhoto.id, function(err, req, res, status) {
    if (err) {
        console.log("An error ocurred >>>>>>");
        console.log(err);
    } else {
        console.log('Product deleted >>>>>>>');
        console.log(status);
    }
});
