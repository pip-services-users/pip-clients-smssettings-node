"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
class SmsSettingsMemoryClientV1 {
    constructor() {
        this._settings = [];
    }
    getSettingsByIds(correlationId, recipientIds, callback) {
        let settings = _.filter(this._settings, s => _.indexOf(recipientIds, s.id) >= 0);
        callback(null, settings);
    }
    getSettingsById(correlationId, recipientId, callback) {
        let settings = _.find(this._settings, s => s.id == recipientId);
        callback(null, settings);
    }
    getSettingsByPhoneSettings(correlationId, phone, callback) {
        let settings = _.find(this._settings, s => s.phone == phone);
        callback(null, settings);
    }
    setSettings(correlationId, settings, callback) {
        settings.verified = false;
        settings.subscriptions = settings.subscriptions || {};
        this._settings = _.filter(this._settings, s => s.id != settings.id);
        this._settings.push(settings);
        if (callback)
            callback(null, settings);
    }
    setVerifiedSettings(correlationId, settings, callback) {
        settings.verified = true;
        settings.subscriptions = settings.subscriptions || {};
        this._settings = _.filter(this._settings, s => s.id != settings.id);
        this._settings.push(settings);
        if (callback)
            callback(null, settings);
    }
    setRecipient(correlationId, recipientId, name, phone, language, callback) {
        let settings = _.find(this._settings, s => s.id == recipientId);
        if (settings) {
            settings.name = name;
            settings.phone = phone;
            settings.language = language;
        }
        else {
            settings = {
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
    setSubscriptions(correlationId, recipientId, subscriptions, callback) {
        let settings = _.find(this._settings, s => s.id == recipientId);
        if (settings) {
            settings.subscriptions = subscriptions;
        }
        else {
            settings = {
                id: recipientId,
                name: null,
                phone: null,
                language: null,
                subscriptions: subscriptions
            };
            this._settings.push(settings);
        }
        if (callback)
            callback(null, settings);
    }
    deleteSettingsById(correlationId, recipientId, callback) {
        this._settings = _.filter(this._settings, s => s.id != recipientId);
        if (callback)
            callback(null);
    }
    resendVerification(correlationId, recipientId, callback) {
        if (callback)
            callback(null);
    }
    verifyPhone(correlationId, recipientId, code, callback) {
        let settings = _.find(this._settings, s => s.id == recipientId);
        if (settings && settings.ver_code == code) {
            settings.verified = true;
            settings.ver_code = null;
        }
        if (callback)
            callback(null);
    }
}
exports.SmsSettingsMemoryClientV1 = SmsSettingsMemoryClientV1;
//# sourceMappingURL=SmsSettingsMemoryClientV1.js.map