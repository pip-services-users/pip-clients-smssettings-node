let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { SmsNullClientV1 } from 'pip-clients-sms-node';
import { SmsSettingsMemoryPersistence } from 'pip-services-smssettings-node';
import { SmsSettingsController } from 'pip-services-smssettings-node';
import { ISmsSettingsClientV1 } from '../../src/version1/ISmsSettingsClientV1';
import { SmsSettingsDirectClientV1 } from '../../src/version1/SmsSettingsDirectClientV1';
import { SmsSettingsClientFixtureV1 } from './SmsSettingsClientFixtureV1';

suite('SmsSettingsDirectClientV1', ()=> {
    let client: SmsSettingsDirectClientV1;
    let fixture: SmsSettingsClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new SmsSettingsMemoryPersistence();
        let controller = new SmsSettingsController();
        controller.configure(new ConfigParams());

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-smssettings', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-smssettings', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-sms', 'client', 'null', 'default', '1.0'), new SmsNullClientV1()
        );
        controller.setReferences(references);

        client = new SmsSettingsDirectClientV1();
        client.setReferences(references);

        fixture = new SmsSettingsClientFixtureV1(client);

        client.open(null, done);
    });
    
    suiteTeardown((done) => {
        client.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});
