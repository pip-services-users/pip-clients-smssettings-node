"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SmsSettingsNullClientV1 {
    getSettingsByIds(correlationId, recipientIds, callback) {
        callback(null, []);
    }
    getSettingsById(correlationId, recipientId, callback) {
        callback(null, null);
    }
    getSettingsByPhoneSettings(correlationId, phone, callback) {
        callback(null, null);
    }
    setSettings(correlationId, settings, callback) {
        if (callback)
            callback(null, settings);
    }
    setRecipient(correlationId, recipientId, name, phone, language, callback) {
        if (callback) {
            callback(null, {
                id: recipientId,
                name: name,
                phone: phone,
                language: language,
                verified: false
            });
        }
    }
    setSubscriptions(correlationId, recipientId, subscriptions, callback) {
        if (callback) {
            callback(null, {
                id: recipientId,
                name: null,
                phone: null,
                language: null,
                subscriptions: subscriptions
            });
        }
    }
    deleteSettingsById(correlationId, recipientId, callback) {
        if (callback)
            callback(null);
    }
    resendVerification(correlationId, recipientId, callback) {
        if (callback)
            callback(null);
    }
    verifyPhone(correlationId, recipientId, code, callback) {
        if (callback)
            callback(null);
    }
}
exports.SmsSettingsNullClientV1 = SmsSettingsNullClientV1;
//# sourceMappingURL=SmsSettingsNullClientV1.js.map