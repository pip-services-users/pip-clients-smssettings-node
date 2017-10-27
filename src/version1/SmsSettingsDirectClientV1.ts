import { ConfigParams } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams} from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { DirectClient } from 'pip-services-net-node';

import { ISmsSettingsClientV1 } from './ISmsSettingsClientV1';
import { SmsSettingsV1 } from './SmsSettingsV1';

//import { ISmsSettingsController } from 'pip-services-smssettings-node';

export class SmsSettingsDirectClientV1 extends DirectClient<any> implements ISmsSettingsClientV1 {
    private _defaultParameters: ConfigParams;

    public constructor(config?: any) {
        super();
        this._dependencyResolver.put('controller', new Descriptor("pip-services-smssettings", "controller", "*", "*", "*"));

        let thisConfig = ConfigParams.fromValue(config);
        this._defaultParameters = thisConfig.getSection('parameters');
        if (config != null) this.configure(thisConfig);
    }
    
    public getSettingsByIds(correlationId: string, recipientIds: string[],
        callback: (err: any, settings: SmsSettingsV1[]) => void): void {
        let timing = this.instrument(correlationId, 'sms_settings.get_settings_by_ids');
        this._controller.getSettingsByIds(correlationId, recipientIds, (err, settings) => {
            timing.endTiming();
            callback(err, settings);
        });
    }

    public getSettingsById(correlationId: string, recipientId: string,
        callback: (err: any, settings: SmsSettingsV1) => void): void {
        let timing = this.instrument(correlationId, 'sms_settings.get_settings_by_id');
        this._controller.getSettingsById(correlationId, recipientId, (err, settings) => {
            timing.endTiming();
            callback(err, settings);
        });
    }

    public getSettingsByPhoneSettings(correlationId: string, phone: string,
        callback: (err: any, settings: SmsSettingsV1) => void): void {
        let timing = this.instrument(correlationId, 'sms_settings.get_settings_by_phone');
        this._controller.getSettingsBySmsSettings(correlationId, phone, (err, settings) => {
            timing.endTiming();
            callback(err, settings);
        });
    }

    public setSettings(correlationId: string, settings: SmsSettingsV1,
        callback?: (err: any, settings: SmsSettingsV1) => void): void {
        let timing = this.instrument(correlationId, 'sms_settings.set_settings');
        this._controller.setSettings(correlationId, settings, (err, settings) => {
            timing.endTiming();
            if (callback) callback(err, settings);
        });
    }

    public setRecipient(correlationId: string, recipientId: string,
        name: string, phone: string, language: string,
        callback?: (err: any, settings: SmsSettingsV1) => void): void {
        let timing = this.instrument(correlationId, 'sms_settings.set_recipient');
        this._controller.setRecipient(
            correlationId, recipientId, name, phone, language, 
            (err, settings) => {
                timing.endTiming();
                if (callback) callback(err, settings);
            }
        );
    }

    public setSubscriptions(correlationId: string, recipientId: string, subscriptions: any,
        callback?: (err: any, settings: SmsSettingsV1) => void): void {
        let timing = this.instrument(correlationId, 'sms_settings.set_subscriptions');
        this._controller.setSubscriptions(correlationId, recipientId, subscriptions, (err, settings) => {
            timing.endTiming();
            if (callback) callback(err, settings);
        });
    }

    public deleteSettingsById(correlationId: string, recipientId: string,
        callback?: (err: any) => void): void {
        let timing = this.instrument(correlationId, 'sms_settings.delete_settings_by_id');
        this._controller.deleteSettingsById(correlationId, recipientId, (err) => {
            timing.endTiming();
            if (callback) callback(err);
        });
    }

    public resendVerification(correlationId: string, recipientId: string,
        callback?: (err: any) => void): void {
        let timing = this.instrument(correlationId, 'sms_settings.resend_verification');
        this._controller.resendVerification(correlationId, recipientId, (err) => {
            timing.endTiming();
            if (callback) callback(err);
        });
    }

    public verifyPhone(correlationId: string, recipientId: string, code: string,
        callback?: (err: any) => void): void {
        let timing = this.instrument(correlationId, 'sms_settings.verify_phone');
        this._controller.verifySms(correlationId, recipientId, code, (err) => {
            timing.endTiming();
            if (callback) callback(err);
        });
    }

}