"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_components_node_1 = require("pip-services-components-node");
const SmsSettingsNullClientV1_1 = require("../version1/SmsSettingsNullClientV1");
const SmsSettingsMemoryClientV1_1 = require("../version1/SmsSettingsMemoryClientV1");
const SmsSettingsDirectClientV1_1 = require("../version1/SmsSettingsDirectClientV1");
const SmsSettingsHttpClientV1_1 = require("../version1/SmsSettingsHttpClientV1");
const SmsSettingsSenecaClientV1_1 = require("../version1/SmsSettingsSenecaClientV1");
class SmsSettingsClientFactory extends pip_services_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(SmsSettingsClientFactory.NullClientV1Descriptor, SmsSettingsNullClientV1_1.SmsSettingsNullClientV1);
        this.registerAsType(SmsSettingsClientFactory.MemoryClientV1Descriptor, SmsSettingsMemoryClientV1_1.SmsSettingsMemoryClientV1);
        this.registerAsType(SmsSettingsClientFactory.DirectClientV1Descriptor, SmsSettingsDirectClientV1_1.SmsSettingsDirectClientV1);
        this.registerAsType(SmsSettingsClientFactory.HttpClientV1Descriptor, SmsSettingsHttpClientV1_1.SmsSettingsHttpClientV1);
        this.registerAsType(SmsSettingsClientFactory.SenecaClientV1Descriptor, SmsSettingsSenecaClientV1_1.SmsSettingsSenecaClientV1);
    }
}
SmsSettingsClientFactory.Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-smssettings', 'factory', 'default', 'default', '1.0');
SmsSettingsClientFactory.NullClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-smssettings', 'client', 'null', 'default', '1.0');
SmsSettingsClientFactory.MemoryClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-smssettings', 'client', 'memory', 'default', '1.0');
SmsSettingsClientFactory.DirectClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-smssettings', 'client', 'direct', 'default', '1.0');
SmsSettingsClientFactory.HttpClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-smssettings', 'client', 'http', 'default', '1.0');
SmsSettingsClientFactory.SenecaClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-smssettings', 'client', 'seneca', 'default', '1.0');
exports.SmsSettingsClientFactory = SmsSettingsClientFactory;
//# sourceMappingURL=SmsSettingsClientFactory.js.map