let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services-commons-node';
import { SmsSettingsV1 } from '../../src/version1/SmsSettingsV1';
import { ISmsSettingsClientV1 } from '../../src/version1/ISmsSettingsClientV1';

let SETTINGS = <SmsSettingsV1> {
    id: '1',
    name: 'User 1',
    phone: '+12345678902',
    language: 'en',
    verified: false
};

export class SmsSettingsClientFixtureV1 {
    private _client: ISmsSettingsClientV1;
    
    constructor(client: ISmsSettingsClientV1) {
        this._client = client;
    }

    public testCrudOperations(done) {
        var settings1: SmsSettingsV1;

        async.series([
        // Create sms settings
            (callback) => {
                this._client.setSettings(
                    null,
                    SETTINGS,
                    (err, settings) => {
                        assert.isNull(err);
                        
                        assert.isObject(settings);
                        assert.equal(settings.id, SETTINGS.id);
                        assert.equal(settings.phone, SETTINGS.phone);
                        assert.isFalse(settings.verified);

                        settings1 = settings;

                        callback();
                    }
                );
            },
        // Create sms settings
            (callback) => {
                this._client.setVerifiedSettings(
                    null,
                    settings1,
                    (err, settings) => {
                        assert.isNull(err);
                        
                        assert.isObject(settings);
                        assert.equal(settings.id, SETTINGS.id);
                        assert.equal(settings.phone, SETTINGS.phone);
                        assert.isTrue(settings.verified);

                        settings1 = settings;

                        callback();
                    }
                );
            },
    // Update the sms settings
            (callback) => {
                settings1.subscriptions.engagement = true;

                this._client.setSettings(
                    null,
                    settings1,
                    (err, settings) => {
                        assert.isNull(err);
                        
                        assert.isObject(settings);
                        assert.isTrue(settings.subscriptions.engagement);

                        settings1 = settings;

                        callback();
                    }
                );
            },
        // Get settings
            (callback) => {
                this._client.getSettingsByIds(
                    null,
                    [ settings1.id ],
                    (err, settings) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(settings, 1);

                        callback();
                    }
                );
            },
        // Delete settings
            (callback) => {
                this._client.deleteSettingsById(
                    null,
                    settings1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get deleted settings
            (callback) => {
                this._client.getSettingsById(
                    null,
                    settings1.id,
                    (err, settings) => {
                        assert.isNull(err);
                        
                        assert.isNull(settings || null);

                        callback();
                    }
                );
            }
        ], done);
    }
        
}
