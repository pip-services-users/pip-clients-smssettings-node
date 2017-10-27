let _ = require('lodash');

import { ConfigParams } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams} from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';

import { ISmsSettingsClientV1 } from './ISmsSettingsClientV1';
import { SmsSettingsV1 } from './SmsSettingsV1';

export class SmsSettingsMemoryClientV1 implements ISmsSettingsClientV1 {
    private _settings: SmsSettingsV1[] = [];

    public getSettingsByIds(correlationId: string, recipientIds: string[],
        callback: (err: any, settings: SmsSettingsV1[]) => void): void {
        let settings = _.filter(this._settings, s => _.indexOf(recipientIds, s.id) >= 0);
        callback(null, settings);
    }

    public getSettingsById(correlationId: string, recipientId: string,
        callback: (err: any, settings: SmsSettingsV1) => void): void {
        let settings = _.find(this._settings, s => s.id == recipientId);
        callback(null, settings);
    }

    public getSettingsByPhoneSettings(correlationId: string, phone: string,
        callback: (err: any, settings: SmsSettingsV1) => void): void {
        let settings = _.find(this._settings, s => s.phone == phone);
        callback(null, settings);
    }

    public setSettings(correlationId: string, settings: SmsSettingsV1,
        callback?: (err: any, settings: SmsSettingsV1) => void): void {

        settings.verified = false;
        settings.subscriptions = settings.subscriptions || {};

        this._settings = _.filter(this._settings, s => s.id != settings.id);
        this._settings.push(settings);
        if (callback) callback(null, settings);
    }

    public setRecipient(correlationId: string, recipientId: string,
        name: string, phone: string, language: string,
        callback?: (err: any, settings: SmsSettingsV1) => void): void {

        let settings = _.find(this._settings, s => s.id == recipientId);

        if (settings) {
            settings.name = name;
            settings.phone = phone;
            settings.language = language;
        } else {
            settings = <SmsSettingsV1> { 
                id: recipientId,
                name: name,
                phone: phone,
                language: language,
                verified: false,
                subscriptions: {}
            };
            this._settings.push(settings);
        }

        callback(null, settings);
    }

    public setSubscriptions(correlationId: string, recipientId: string, subscriptions: any,
        callback?: (err: any, settings: SmsSettingsV1) => void): void {

        let settings = _.find(this._settings, s => s.id == recipientId);
        
        if (settings) {
            settings.subscriptions = subscriptions;
        } else {
            settings = <SmsSettingsV1> { 
                id: recipientId,
                name: null,
                phone: null,
                language: null,
                subscriptions: subscriptions
            };
            this._settings.push(settings);
        }

        if (callback) callback(null, settings);
    }

    public deleteSettingsById(correlationId: string, recipientId: string,
        callback?: (err: any) => void): void {
        this._settings = _.filter(this._settings, s => s.id != recipientId);
        if (callback) callback(null);
    }

    public resendVerification(correlationId: string, recipientId: string,
        callback?: (err: any) => void): void {
        if (callback) callback(null);
    }

    public verifyPhone(correlationId: string, recipientId: string, code: string,
        callback?: (err: any) => void): void {

        let settings = _.find(this._settings, s => s.id == recipientId);

        if (settings && settings.ver_code == code) {
            settings.verified = true;
            settings.ver_code = null;
        }
            
        if (callback) callback(null);
    }

}