"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class SmsSettingsHttpClientV1 extends pip_services_net_node_1.CommandableHttpClient {
    constructor(config) {
        super('sms_settings');
        let thisConfig = pip_services_commons_node_1.ConfigParams.fromValue(config);
        this._defaultParameters = thisConfig.getSection('parameters');
        if (config != null)
            this.configure(thisConfig);
    }
    getSettingsByIds(correlationId, recipientIds, callback) {
        this.callCommand('get_settings_by_ids', correlationId, {
            recipient_ids: recipientIds
        }, callback);
    }
    getSettingsById(correlationId, recipientId, callback) {
        this.callCommand('get_settings_by_id', correlationId, {
            recipient_id: recipientId
        }, callback);
    }
    getSettingsByPhoneSettings(correlationId, phone, callback) {
        this.callCommand('get_settings_by_phone', correlationId, {
            phone: phone
        }, callback);
    }
    setSettings(correlationId, settings, callback) {
        this.callCommand('set_settings', correlationId, {
            settings: settings
        }, callback);
    }
    setVerifiedSettings(correlationId, settings, callback) {
        this.callCommand('set_verified_settings', correlationId, {
            settings: settings
        }, callback);
    }
    setRecipient(correlationId, recipientId, name, phone, language, callback) {
        this.callCommand('set_recipient', correlationId, {
            recipient_id: recipientId,
            name: name,
            phone: phone,
            language: language
        }, callback);
    }
    setSubscriptions(correlationId, recipientId, subscriptions, callback) {
        this.callCommand('set_subscriptions', correlationId, {
            recipient_id: recipientId,
            subscriptions: subscriptions
        }, callback);
    }
    deleteSettingsById(correlationId, recipientId, callback) {
        this.callCommand('delete_settings_by_id', correlationId, {
            recipient_id: recipientId
        }, callback);
    }
    resendVerification(correlationId, recipientId, callback) {
        this.callCommand('resend_verification', correlationId, {
            recipient_id: recipientId
        }, callback);
    }
    verifyPhone(correlationId, recipientId, code, callback) {
        this.callCommand('verify_phone', correlationId, {
            recipient_id: recipientId,
            code: code
        }, callback);
    }
}
exports.SmsSettingsHttpClientV1 = SmsSettingsHttpClientV1;
//# sourceMappingURL=SmsSettingsHttpClientV1.js.map