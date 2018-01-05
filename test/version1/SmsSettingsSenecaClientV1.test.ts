let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';
import { SenecaInstance } from 'pip-services-net-node';

import { SmsNullClientV1 } from 'pip-clients-sms-node';
import { SmsSettingsMemoryPersistence } from 'pip-services-smssettings-node';
import { SmsSettingsController } from 'pip-services-smssettings-node';
import { SmsSettingsSenecaServiceV1 } from 'pip-services-smssettings-node';
import { ISmsSettingsClientV1 } from '../../src/version1/ISmsSettingsClientV1';
import { SmsSettingsSenecaClientV1 } from '../../src/version1/SmsSettingsSenecaClientV1';
import { SmsSettingsClientFixtureV1 } from './SmsSettingsClientFixtureV1';

let senecaConfig = ConfigParams.fromTuples(
    "connection.protocol", "none"
);

suite('SmsSettingsSenecaClient', () => {
    let service: SmsSettingsSenecaServiceV1;
    let client: SmsSettingsSenecaClientV1;
    let fixture: SmsSettingsClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new SmsSettingsMemoryPersistence();
        let controller = new SmsSettingsController();
        controller.configure(new ConfigParams());

        service = new SmsSettingsSenecaServiceV1();
        service.configure(senecaConfig);
        let seneca = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), seneca,
            new Descriptor('pip-services-smssettings', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-smssettings', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-smssettings', 'service', 'seneca', 'default', '1.0'), service,
            new Descriptor('pip-services-sms', 'client', 'null', 'default', '1.0'), new SmsNullClientV1()
        );
        seneca.setReferences(references);
        controller.setReferences(references);
        service.setReferences(references);

        client = new SmsSettingsSenecaClientV1();
        client.configure(senecaConfig);
        client.setReferences(references);

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
