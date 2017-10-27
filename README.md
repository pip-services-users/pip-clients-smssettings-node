# Sms Settings Microservice Client SDK for Node.js

This is a Node.js client SDK for [pip-services-smssettings](https://github.com/pip-services-users/pip-services-smssettings-node) microservice.
It provides an easy to use abstraction over communication protocols:

* HTTP client
* Seneca client (see http://www.senecajs.org)
* Direct client for monolythic deployments
* Null client to be used in testing

<a name="links"></a> Quick Links:

* [Development Guide](doc/Development.md)
* [API Version 1](doc/NodeClientApiV1.md)

## Install

Add dependency to the client SDK into **package.json** file of your project
```javascript
{
    ...
    "dependencies": {
        ....
        "pip-clients-smssettings-node": "^1.0.*",
        ...
    }
}
```

Then install the dependency using **npm** tool
```bash
# Install new dependencies
npm install

# Update already installed dependencies
npm update
```

## Use

Inside your code get the reference to the client SDK
```javascript
var sdk = new require('pip-clients-smssettings-node');
```

Define client configuration parameters.

```javascript
// Client configuration
var config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};
```

Instantiate the client and open connection to the microservice
```javascript
// Create the client instance
var client = sdk.SmsSettingsHttpClient(config);

// Connect to the microservice
client.open(null, function(err) {
    if (err) {
        console.error('Connection to the microservice failed');
        console.error(err);
        return;
    }
    
    // Work with the microservice
    ...
});
```

Now the client is ready to perform operations
```javascript
// Send sms message to address
client.sendMessage(
    null,
    { 
        to: 'somebody@somewhere.com',
        subject: 'Test',
        text: 'This is a test message. Please, ignore it'
    },
    null,
    function (err) {
        ...
    }
);
```

```javascript
// Send sms message to users
client.sendMessageToRecipients(
    null,
    [
        { id: '123' },
        { id: '321' }
    ],
    'test',
    { 
        subject: 'Test',
        text: 'This is a test message. Please, ignore it'
    },
    null,
    function (err) {
        ...
    }
);
```

## Acknowledgements

This client SDK was created and currently maintained by *Sergey Seroukhov*.

