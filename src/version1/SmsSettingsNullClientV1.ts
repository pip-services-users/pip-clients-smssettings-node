import { ConfigParams } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams} from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';

import { ISmsSettingsClientV1 } from './ISmsSettingsClientV1';
import { SmsSettingsV1 } from './SmsSettingsV1';

export class SmsSettingsNullClientV1 implements ISmsSettingsClientV1 {

    public getSettingsByIds(correlationId: string, recipientIds: string[],
        callback: (err: any, settings: SmsSettingsV1[]) => void): void {
        callback(null, []);
    }

    public getSettingsById(correlationId: string, recipientId: string,
        callback: (err: any, settings: SmsSettingsV1) => void): void {
        callback(null, null);
    }

    public getSettingsByPhoneSettings(correlationId: string, phone: string,
        callback: (err: any, settings: SmsSettingsV1) => void): void {
        callback(null, null);
    }

    public setSettings(correlationId: string, settings: SmsSettingsV1,
        callback?: (err: any, settings: SmsSettingsV1) => void): void {
        if (callback) callback(null, settings);
    }

    public setVerifiedSettings(correlationId: string, settings: SmsSettingsV1,
        callback?: (err: any, settings: SmsSettingsV1) => void): void {
        if (callback) callback(null, settings);
    }

    public setRecipient(correlationId: string, recipientId: string,
        name: string, phone: string, language: string,
        callback?: (err: any, settings: SmsSettingsV1) => void): void {
        if (callback) {
            callback(null, <SmsSettingsV1> { 
                id: recipientId,
                name: name,
                phone: phone,
                language: language,
                verified: false 
            });
        }
    }

    public setSubscriptions(correlationId: string, recipientId: string, subscriptions: any,
        callback?: (err: any, settings: SmsSettingsV1) => void): void {
        if (callback) {
            callback(null, <SmsSettingsV1> {
                id: recipientId,
                name: null,
                phone: null,
                language: null,
                subscriptions: subscriptions
            });
        }
    }

    public deleteSettingsById(correlationId: string, recipientId: string,
        callback?: (err: any) => void): void {
        if (callback) callback(null);
    }

    public resendVerification(correlationId: string, recipientId: string,
        callback?: (err: any) => void): void {
        if (callback) callback(null);
    }

    public verifyPhone(correlationId: string, recipientId: string, code: string,
        callback?: (err: any) => void): void {
        if (callback) callback(null);
    }

}