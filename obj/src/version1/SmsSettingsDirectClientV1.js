"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_rpc_node_1 = require("pip-services-rpc-node");
//import { ISmsSettingsController } from 'pip-services-smssettings-node';
class SmsSettingsDirectClientV1 extends pip_services_rpc_node_1.DirectClient {
    constructor(config) {
        super();
        this._dependencyResolver.put('controller', new pip_services_commons_node_2.Descriptor("pip-services-smssettings", "controller", "*", "*", "*"));
        let thisConfig = pip_services_commons_node_1.ConfigParams.fromValue(config);
        this._defaultParameters = thisConfig.getSection('parameters');
        if (config != null)
            this.configure(thisConfig);
    }
    getSettingsByIds(correlationId, recipientIds, callback) {
        let timing = this.instrument(correlationId, 'sms_settings.get_settings_by_ids');
        this._controller.getSettingsByIds(correlationId, recipientIds, (err, settings) => {
            timing.endTiming();
            callback(err, settings);
        });
    }
    getSettingsById(correlationId, recipientId, callback) {
        let timing = this.instrument(correlationId, 'sms_settings.get_settings_by_id');
        this._controller.getSettingsById(correlationId, recipientId, (err, settings) => {
            timing.endTiming();
            callback(err, settings);
        });
    }
    getSettingsByPhoneSettings(correlationId, phone, callback) {
        let timing = this.instrument(correlationId, 'sms_settings.get_settings_by_phone');
        this._controller.getSettingsBySmsSettings(correlationId, phone, (err, settings) => {
            timing.endTiming();
            callback(err, settings);
        });
    }
    setSettings(correlationId, settings, callback) {
        let timing = this.instrument(correlationId, 'sms_settings.set_settings');
        this._controller.setSettings(correlationId, settings, (err, settings) => {
            timing.endTiming();
            if (callback)
                callback(err, settings);
        });
    }
    setVerifiedSettings(correlationId, settings, callback) {
        let timing = this.instrument(correlationId, 'sms_settings.set_verified_settings');
        this._controller.setVerifiedSettings(correlationId, settings, (err, settings) => {
            timing.endTiming();
            if (callback)
                callback(err, settings);
        });
    }
    setRecipient(correlationId, recipientId, name, phone, language, callback) {
        let timing = this.instrument(correlationId, 'sms_settings.set_recipient');
        this._controller.setRecipient(correlationId, recipientId, name, phone, language, (err, settings) => {
            timing.endTiming();
            if (callback)
                callback(err, settings);
        });
    }
    setSubscriptions(correlationId, recipientId, subscriptions, callback) {
        let timing = this.instrument(correlationId, 'sms_settings.set_subscriptions');
        this._controller.setSubscriptions(correlationId, recipientId, subscriptions, (err, settings) => {
            timing.endTiming();
            if (callback)
                callback(err, settings);
        });
    }
    deleteSettingsById(correlationId, recipientId, callback) {
        let timing = this.instrument(correlationId, 'sms_settings.delete_settings_by_id');
        this._controller.deleteSettingsById(correlationId, recipientId, (err) => {
            timing.endTiming();
            if (callback)
                callback(err);
        });
    }
    resendVerification(correlationId, recipientId, callback) {
        let timing = this.instrument(correlationId, 'sms_settings.resend_verification');
        this._controller.resendVerification(correlationId, recipientId, (err) => {
            timing.endTiming();
            if (callback)
                callback(err);
        });
    }
    verifyPhone(correlationId, recipientId, code, callback) {
        let timing = this.instrument(correlationId, 'sms_settings.verify_phone');
        this._controller.verifyPhone(correlationId, recipientId, code, (err) => {
            timing.endTiming();
            if (callback)
                callback(err);
        });
    }
}
exports.SmsSettingsDirectClientV1 = SmsSettingsDirectClientV1;
//# sourceMappingURL=SmsSettingsDirectClientV1.js.map