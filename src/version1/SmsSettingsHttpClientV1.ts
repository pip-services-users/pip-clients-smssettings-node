import { ConfigParams } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { CommandableHttpClient } from 'pip-services-net-node';

import { SmsSettingsV1 } from './SmsSettingsV1';
import { ISmsSettingsClientV1 } from './ISmsSettingsClientV1';

export class SmsSettingsHttpClientV1 extends CommandableHttpClient implements ISmsSettingsClientV1 {
    private _defaultParameters: ConfigParams;

    constructor(config?: any) {
        super('sms_settings');

        let thisConfig = ConfigParams.fromValue(config);
        this._defaultParameters = thisConfig.getSection('parameters');
        if (config != null) this.configure(thisConfig);
    }

    public getSettingsByIds(correlationId: string, recipientIds: string[],
        callback: (err: any, settings: SmsSettingsV1[]) => void): void {
        this.callCommand(
            'get_settings_by_ids',
            correlationId,
            {
                recipient_ids: recipientIds
            },
            callback
        );
    }

    public getSettingsById(correlationId: string, recipientId: string,
        callback: (err: any, settings: SmsSettingsV1) => void): void {
        this.callCommand(
            'get_settings_by_id',
            correlationId,
            {
                recipient_id: recipientId
            },
            callback
        );
    }

    public getSettingsByPhoneSettings(correlationId: string, phone: string,
        callback: (err: any, settings: SmsSettingsV1) => void): void {
        this.callCommand(
            'get_settings_by_phone',
            correlationId,
            {
                phone: phone
            },
            callback
        );
    }

    public setSettings(correlationId: string, settings: SmsSettingsV1,
        callback?: (err: any, settings: SmsSettingsV1) => void): void {
        this.callCommand(
            'set_settings',
            correlationId,
            {
                settings: settings
            },
            callback
        );
    }

    public setRecipient(correlationId: string, recipientId: string,
        name: string, phone: string, language: string,
        callback?: (err: any, settings: SmsSettingsV1) => void): void {
        this.callCommand(
            'set_recipient',
            correlationId,
            {
                recipient_id: recipientId,
                name: name,
                phone: phone,
                language: language
            },
            callback
        );
    }

    public setSubscriptions(correlationId: string, recipientId: string, subscriptions: any,
        callback?: (err: any, settings: SmsSettingsV1) => void): void {
        this.callCommand(
            'set_subscriptions',
            correlationId,
            {
                recipient_id: recipientId,
                subscriptions: subscriptions
            },
            callback
        );
    }

    public deleteSettingsById(correlationId: string, recipientId: string,
        callback?: (err: any) => void): void {
        this.callCommand(
            'delete_settings_by_id',
            correlationId,
            {
                recipient_id: recipientId
            },
            callback
        );
    }

    public resendVerification(correlationId: string, recipientId: string,
        callback?: (err: any) => void): void {
        this.callCommand(
            'resend_verification',
            correlationId,
            {
                recipient_id: recipientId
            },
            callback
        );
    }

    public verifyPhone(correlationId: string, recipientId: string, code: string,
        callback?: (err: any) => void): void {
        this.callCommand(
            'verify_phone',
            correlationId,
            {
                recipient_id: recipientId,
                code: code
            },
            callback
        );
    }
}
