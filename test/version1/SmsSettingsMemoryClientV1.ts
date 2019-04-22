let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { ISmsSettingsClientV1 } from '../../src/version1/ISmsSettingsClientV1';
import { SmsSettingsMemoryClientV1 } from '../../src/version1/SmsSettingsMemoryClientV1';
import { SmsSettingsClientFixtureV1 } from './SmsSettingsClientFixtureV1';

suite('SmsSettingsMemoryClientV1', ()=> {
    let client: SmsSettingsMemoryClientV1;
    let fixture: SmsSettingsClientFixtureV1;

    suiteSetup(() => {
        client = new SmsSettingsMemoryClientV1();

        fixture = new SmsSettingsClientFixtureV1(client);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});
