let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { SmsNullClientV1 } from 'pip-clients-sms-node';
import { SmsSettingsMemoryPersistence } from 'pip-services-smssettings-node';
import { SmsSettingsController } from 'pip-services-smssettings-node';
import { SmsSettingsHttpServiceV1 } from 'pip-services-smssettings-node';
import { ISmsSettingsClientV1 } from '../../src/version1/ISmsSettingsClientV1';
import { SmsSettingsHttpClientV1 } from '../../src/version1/SmsSettingsHttpClientV1';
import { SmsSettingsClientFixtureV1 } from './SmsSettingsClientFixtureV1';

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('SmsSettingsHttpClientV1', ()=> {
    let service: SmsSettingsHttpServiceV1;
    let client: SmsSettingsHttpClientV1;
    let fixture: SmsSettingsClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new SmsSettingsMemoryPersistence();
        let controller = new SmsSettingsController();
        controller.configure(new ConfigParams());

        service = new SmsSettingsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-smssettings', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-smssettings', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-smssettings', 'service', 'http', 'default', '1.0'), service,
            new Descriptor('pip-services-sms', 'client', 'null', 'default', '1.0'), new SmsNullClientV1()
        );
        controller.setReferences(references);
        service.setReferences(references);

        client = new SmsSettingsHttpClientV1();
        client.setReferences(references);
        client.configure(httpConfig);

        fixture = new SmsSettingsClientFixtureV1(client);

        service.open(null, (err) => {
            client.open(null, done);
        });
    });
    
    suiteTeardown((done) => {
        client.close(null);
        service.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});
