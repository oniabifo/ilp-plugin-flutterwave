/* Written By Abifoluwa Oni */
//To move NGN from a debit card into a moneywave wallet
//Moneywave NGN wallet will contain total money.
'use strict';
var rp = require('request-promise');

var amount_kobo = process.argv[2];

//Using the auth key to get the Authorization key which expires every two hours
var auth_key = {
    method: 'POST',
    uri: 'https://moneywave.herokuapp.com/v1/merchant/verify',
    headers: {
        'Content-Type': 'application/json'
    },
    body: {
        "apiKey": "ts_GCEV2HA2VIAM0V0GN4AZ", "secret": "ts_JDTO74ATU0M5WXU79NBFWFZJOP6EJ9"
    },
    json: true // Automatically stringifies the body to JSON
};


rp(auth_key)
    .then(function (parsedBody) {
        var token = (parsedBody['token']);
        var wallet_balance = {
            method: 'GET',
            uri: 'https://moneywave.herokuapp.com/v1/wallet',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            json: true // Automatically stringifies the body to JSON
        };
        rp(wallet_balance)
            .then(function (parsedBody2) {
                var myData = (parsedBody2['data']);
                for (var i in myData) {
                    var balance = (myData[i]['balance']);
                }
                console.log("Your wallat contains ₦" +balance)
            })
    .catch(function (err) {
        console.log(err);
    });
    });