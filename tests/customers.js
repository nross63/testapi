var restify = require('restify');
var server = require('../server');

var client = restify.createJsonClient({
    url: 'http://localhost:3000'
});

// a static customer to CREATE READ UPDATE
var testCustomer = {
	id: '0',
    name: 'Janice',
    zip: '46847',
	accountNumber: '5678',
	status: 'active',
};
// a static template to CREATE READ UPDATE DELETE
var testTemplate = {
		id: '0',
		customerId: '0',
		name: 'MyTemplate',
		scheduled: true,
		templateType: 'bank'
};

client.post('/customers/create', testCustomer, function(err, req, res, customer) {
    if (err) {
        console.log('An error ocurred >>>>>>');
        console.log(err);
    } else {
        console.log('Customer saved >>>>>>>');
        console.log(customer);
    }
});
client.put('/customers/'+ testCustomer.id, testCustomer, function(err, req, res, customer) {
    if (err) {
        console.log('An error ocurred >>>>>>');
        console.log(err);
    } else {
        console.log('Customer saved >>>>>>>');
        console.log(customer);
    }
});

client.patch('/customers/'+ testCustomer.id, testCustomer, function(err, req, res, customer) {
    if (err) {
        console.log('An error ocurred >>>>>>');
        console.log(err);
    } else {
        console.log('Customer saved >>>>>>>');
        console.log(customer);
    }
});

client.get('/customers', function(err, req, res, customers) {
    if (err) {
        console.log('An error ocurred >>>>>>');
        console.log(err);
    } else {
        console.log('Total customers ' + customers.length);
        console.log('All customers >>>>>>>');
        console.log(customers);
    }
});


client.get('/customers', function(err, req, res, customers) {
    if (err) {
        console.log('An error ocurred >>>>>>');
        console.log(err);
    } else {
        console.log('Total customers ' + customers.length);
        console.log('All customers >>>>>>>');
        console.log(customers);
    }
});

client.post('/customers/'+ testTemplate.customerId +'/templates',testTemplate, function(err, req, res, template) {
    if (err) {
        console.log('An error ocurred >>>>>>');
        console.log(err);
    } else {
        console.log('Template saved >>>>>>>');
        console.log(template);
    }
});


client.get('/customers/' + testTemplate.customerId + '/templates', function(err, req, res, templates) {
    if (err) {
        console.log('An error ocurred >>>>>>');
        console.log(err);
    } else {
        console.log('Total customer templates ' + templates.length);
        console.log('All templates >>>>>>>');
        console.log(templates);
    }
});

client.get('/customers/' + testTemplate.customerId + '/templates/' + testTemplate.id, function(err, req, res, template) {
    if (err) {
        console.log('An error ocurred >>>>>>');
        console.log(err);
    } else {
        console.log('Customer template ' + template.length);
        console.log('Template >>>>>>>');
        console.log(template);
    }
});

client.put('/customers/' + testTemplate.customerId + '/templates/' + testTemplate.id, testTemplate, function(err, req, res, status) {
    if (err) {
        console.log("An error ocurred >>>>>>");
        console.log(err);
    } else {
        console.log('Template saved >>>>>>>');
        console.log(status);
    }
});

client.del('/customers/' + testTemplate.customerId + '/templates/' + testTemplate.id, function(err, req, res, status) {
    if (err) {
        console.log("An error ocurred >>>>>>");
        console.log(err);
    } else {
        console.log('Template deleted >>>>>>>');
        console.log(status);
    }
});

