import { SmsSettingsV1 } from './SmsSettingsV1';
export interface ISmsSettingsClientV1 {
    getSettingsByIds(correlationId: string, recipientIds: string[], callback: (err: any, settings: SmsSettingsV1[]) => void): void;
    getSettingsById(correlationId: string, recipientId: string, callback: (err: any, settings: SmsSettingsV1) => void): void;
    getSettingsByPhoneSettings(correlationId: string, phone: string, callback: (err: any, settings: SmsSettingsV1) => void): void;
    setSettings(correlationId: string, settings: SmsSettingsV1, callback?: (err: any, settings: SmsSettingsV1) => void): void;
    setVerifiedSettings(correlationId: string, settings: SmsSettingsV1, callback?: (err: any, settings: SmsSettingsV1) => void): void;
    setRecipient(correlationId: string, recipientId: string, name: string, phone: string, language: string, callback?: (err: any, settings: SmsSettingsV1) => void): void;
    setSubscriptions(correlationId: string, recipientId: string, subscriptions: any, callback?: (err: any, settings: SmsSettingsV1) => void): void;
    deleteSettingsById(correlationId: string, recipientId: string, callback?: (err: any) => void): void;
    resendVerification(correlationId: string, recipientId: string, callback?: (err: any) => void): void;
    verifyPhone(correlationId: string, recipientId: string, code: string, callback?: (err: any) => void): void;
}
