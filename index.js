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
        "apiKey": "apikey", "secret": "secret"
    },
    json: true // Automatically stringifies the body to JSON
};

rp(auth_key)
    .then(function (parsedBody) {
        var token = (parsedBody['token']);
        console.log(token);

        var card_tokenize = {
            method: 'POST',
            uri: 'https://moneywave.herokuapp.com/v1/transfer/charge/tokenize/card',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: {
                "card_no": "5289899898983388",
                "cvv": "788",
                "expiry_year":"2022",
                "expiry_month": "09"
            },
            json: true // Automatically stringifies the body to JSON
        };

        rp(card_tokenize)
            .then(function (parsedBody2) {
                var cardToken = (parsedBody2['data']['cardToken']);
                var card_wallet = {
                    method: 'POST',
                    uri: 'https://moneywave.herokuapp.com/v1/transfer',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: {
                        "firstname": "John",
                        "lastname": "Doe",
                        "email":"google@gmail.com",
                        "phonenumber":"+2348020099002",
                        "recipient":"wallet",
                        "card_no": "5061020000000000094",
                        "cvv": "347",
                        "pin":"1111", //optional required when using VERVE card
                        "expiry_year":"2020",
                        "expiry_month": "07",
                        "charge_auth":"PIN", //optional required where card is a local Mastercard
                        "apiKey" :"apikey",
                        "amount" :amount_kobo,
                        "fee":45,
                        "cardToken": cardToken,
                        "medium": "web",
                        "redirecturl": "https://google.com"

                    },
                    json: true // Automatically stringifies the body to JSON
                };

                rp(card_wallet)
                    .then(function (parsedBody3) {
                        console.log(parsedBody3);
                        var cardToken2 = (parsedBody3['data']['transfer']['flutterChargeReference']);
                        console.log("This is the card Token");
                        console.log(cardToken2);
                        var card_valid = {
                            method: 'POST',
                            uri: 'https://moneywave.herokuapp.com/v1/transfer/charge/auth/card',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': token
                            },
                            body: {
                                transactionRef: cardToken2,
                                otp: "123456"
                            },
                            json: true // Automatically stringifies the body to JSON
                        };
                        rp(card_valid)
                            .then(function (parsedBody4) {
                                console.log(parsedBody4);


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
                                    .then(function (parsedBody5) {
                                        console.log(parsedBody5);
                                       var myData = (parsedBody5['data']);
                                      console.log(myData);
                                      for (var i in myData){
                                          console.log(myData[i])
                                      }
                                      var balance = (myData[i]['balance']);
                                        console.log(balance)
                                    })
                                    .catch(function (err) {
                                        console.log(err);
                                    });
                            });
                    });
            });
    });
