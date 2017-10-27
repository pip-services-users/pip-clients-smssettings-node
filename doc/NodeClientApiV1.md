# Client API (version 1) <br/> Sms Settings Microservices Client SDK for Node.js

Node.js client API for Sms settings microservice is a thin layer on the top of
communication protocols. It hides details related to specific protocol implementation
and provides high-level API to access the microservice for simple and productive development.

* [Installation](#install)
* [Getting started](#get_started)
* [SmsSettingsV1 class](#class1)
* [ISmsSettingsClientV1 interface](#interface)
    - [getSettingsById()](#operation1)
    - [getSettingsByPhone()](#operation2)
    - [setSettings()](#operation3)
    - [setRecipient()](#operation4)
    - [setSuscriptions()](#operation5)
    - [deleteSettingsById()](#operation6)
    - [resendVerification()](#operation7)
    - [verifyPhone()](#operation8)
* [SmsSettingsHttpClientV1 class](#client_http)
* [SmsSettingsSenecaClientV1 class](#client_seneca)
* [SmsSettingsDirectClientV1 class](#client_direct)
* [SmsSettingsNullClientV1 class](#client_null)

## <a name="install"></a> Installation

To work with the client SDK add dependency into package.json file:

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

Then download the dependency using **npm**:

```javascript
# Installing dependencies
npm install

# Updating dependencies
npm update
```

## <a name="get_started"></a> Getting started

This is a simple example on how to work with the microservice using REST client:

```javascript
// Get Client SDK for Version 1 
var sdk = new require('pip-clients-smssettings-node');

// Client configuration
var config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8005
    }
};

// Create the client instance
var client = sdk.SmsSettingsHttpClientV1(config);

// Open client connection to the microservice
client.open(null, function(err) {
    if (err) {
        console.error(err);
        return; 
    }
    
    console.log('Opened connection');
        
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
            if (err) console.error(err);
            else console.log('SmsSettings message was successfully sent');
        }
    );
    
});
```

## Data types

### <a name="class1"></a> SmsSettingsV1 class

Represents a user sms settings with his ID, primary phone and key settings.

**Properties:**
- id: string - unique user id
- name: string - user full name
- phone: string - primary user phone
- language: string - user preferred language
- verified: boolean - true if sms was verified
- ver_code: - sms verification code that was sent in sms message to the user
- ver\_expire\_time: Date - expiration time for sms verification code
- subscriptions: Object - subscriptions to enable or disable certain types of sms messages
- custom_hdr: Object - custom data summary that is always returned (in list and details)
- custom_dat: Object - custom data details that is returned only when a single object is returned (details)

## <a name="interface"></a> ISmsSettingsClientV1 interface

If you are using Typescript, you can use ISmsSettingsClientV1 as a common interface across all client implementations. 
If you are using plain Javascript, you shall not worry about ISmsSettingsClient interface. You can just expect that
all methods defined in this interface are implemented by all client classes.

```javascript
interface ISmsSettingsClientV1 {
    getSettingsById(correlationId, recipientId, callback);
    getSettingsByPhone(correlationId, phone, callback);
    setSettings(correlationId, settings, callback);
    setRecipient(correlationId, recipientId, name, phone, language, callback);
    setSubscriptions(correlationId, recipientId, subscriptions, callback);
    deleteSettingsById(correlationId, recipientId, callback);
    resendVerification(correlationId, recipientId, callback);
    verifyPhone(correlationId, recipientId, code, callback);
}
```

### <a name="operation1"></a> getSettingsById(correlationId, recipientId, callback)

Retrieves sms settings by recipient unique id. 

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- recipient_id: string - unique receipient id
- callback: (err, settings) => void - callback function
  - err: Error - occured error or null for success
  - settings: SmsSettings - retrieved SmsSettings object

### <a name="operation2"></a> getSettingsByPhone(correlationId, phone, callback)

Retrieves sms settings by recipient sms. 

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- phone: string - sms address
- callback: (err, settings) => void - callback function
  - err: Error - occured error or null for success
  - settings: SmsSettings - retrieved SmsSettings object

### <a name="operation3"></a> setSettings(correlationId, settings, callback)

Sets recipient sms settings

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- settings: SmsSettingsV1 -  sms settings to be set
- callback: (err, settings) => void - callback function
  - err: Error - occured error or null for success
  - settings: SmsSettings - set SmsSettings object
 
### <a name="operation4"></a> setRecipient(correlationId, recipientId, name, phone, language, callback)

Sets recipient information into sms settings.
If some properties are not set, they keep their old values.

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- recipient_id: string - recipient unique id
- name: string - recipient full name
- phone: string - recipient sms address
- language: string - recipient preferred language
- callback: (err, settings) => void - callback function
  - err: Error - occured error or null for success
  - settings: SmsSettings - set SmsSettings object

### <a name="operation5"></a> setSubscriptions(correlationId, recipientId, subscriptions, callback)

Sets subscriptions to specific sms types

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- recipient_id: string - recipient unique id
- subscriptions: any - subscriptions hashmap where sms types are enabled or disabled
- callback: (err, settings) => void - callback function
  - err: Error - occured error or null for success
  - settings: SmsSettings - set SmsSettings object

### <a name="operation6"></a> deleteSettingsById(correlationId, recipientId, callback)

Deletes sms settings from the system (use it carefully!)

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- recipient_id: string - recipient unique id
- callback: (err, user) => void - callback function
  - err: Error - occured error or null for success
 
### <a name="operation7"></a> resendVerification(correlationId, recipientId, callback)

Generates a new sms verification code and sends it to recipient via sms message.
Initial verification code is send in welcome message during user registration.

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- recipient_id: string - recipient unique id
- callback: (err) => void - callback function
  - err: Error - occured error or null for success

### <a name="operation8"></a> verifyPhone(correlationId, recipientId, code, callback)

Confirms (verifies) primary sms address using verification code.

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- recipient_id: string - recipient unique id
- code: string - password recovery code
- callback: (err) => void - callback function
  - err: Error - occured error or null for success


## <a name="client_http"></a> SmsSettingsHttpClientV1 class

SmsSettingsHttpClientV1 is a client that implements HTTPprotocol

```javascript
class SmsSettingsHttpClientV1 extends CommandableHttpClient implements ISmsSettingsClientV1 {
    constructor(config?: any);
    setReferences(refs);
    open(correlationId, callback);
    close(correlationId, callback);
    getSettingsById(correlationId, recipientId, callback);
    getSettingsByPhone(correlationId, phone, callback);
    setSettings(correlationId, settings, callback);
    setRecipient(correlationId, recipientId, name, phone, language, callback);
    setSubscriptions(correlationId, recipientId, subscriptions, callback);
    deleteSettingsById(correlationId, recipientId, callback);
    resendVerification(correlationId, recipientId, callback);
    verifyPhone(correlationId, recipientId, code, callback);
}
```

**Constructor config properties:** 
- parameters: Object - (optional) default parameters to augment content passed in each request
- connection: object - HTTP transport configuration options
  - protocol: string - HTTP protocol - 'http' or 'https' (default is 'http')
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - HTTP port number

## <a name="client_seneca"></a> SmsSettingsSenecaClientV1 class

SmsSettingsSenecaClientV1 is a client that implements Seneca protocol

```javascript
class SmsSettingsSenecaClientV1 extends CommandableSenecaClient implements ISmsSettingsClientV1 {
    constructor(config?: any);        
    setReferences(refs);
    open(correlationId, callback);
    close(correlationId, callback);
    getSettingsById(correlationId, recipientId, callback);
    getSettingsByPhone(correlationId, phone, callback);
    setSettings(correlationId, settings, callback);
    setRecipient(correlationId, recipientId, name, phone, language, callback);
    setSubscriptions(correlationId, recipientId, subscriptions, callback);
    deleteSettingsById(correlationId, recipientId, callback);
    resendVerification(correlationId, recipientId, callback);
    verifyPhone(correlationId, recipientId, code, callback);
}
```

**Constructor config properties:** 
- parameters: Object - (optional) default parameters to augment content passed in each request
- connection: object - (optional) Seneca transport configuration options. See http://senecajs.org/api/ for details.
  - protocol: string - Seneca transport type 
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - Seneca port number

## <a name="client_direct"></a> SmsSettingsDirectClientV1 class

SmsSettingsDirectClientV1 is a client that calls controller from the same container.
It is intended to be used in monolythic deployments.

```javascript
class SmsSettingsDirectClientV1 extends DirectClient implements ISmsSettingsClientV1 {
    constructor();
    setReferences(refs);
    open(correlationId, callback);
    close(correlationId, callback);
    getSettingsById(correlationId, recipientId, callback);
    getSettingsByPhone(correlationId, phone, callback);
    setSettings(correlationId, settings, callback);
    setRecipient(correlationId, recipientId, name, phone, language, callback);
    setSubscriptions(correlationId, recipientId, subscriptions, callback);
    deleteSettingsById(correlationId, recipientId, callback);
    resendVerification(correlationId, recipientId, callback);
    verifyPhone(correlationId, recipientId, code, callback);
}
```

## <a name="client_null"></a> SmsSettingsNullClientV1 class

SmsSettingsNullClientV1 is a dummy client that mimics the real client but doesn't call a microservice. 
It can be useful in testing scenarios to cut dependencies on external microservices.

```javascript
class SmsSettingsNullClientV1 implements ISmsSettingsClientV1 {
    constructor();
    getSettingsById(correlationId, recipientId, callback);
    getSettingsByPhone(correlationId, phone, callback);
    setSettings(correlationId, settings, callback);
    setRecipient(correlationId, recipientId, name, phone, language, callback);
    setSubscriptions(correlationId, recipientId, subscriptions, callback);
    deleteSettingsById(correlationId, recipientId, callback);
    resendVerification(correlationId, recipientId, callback);
    verifyPhone(correlationId, recipientId, code, callback);
}
```
