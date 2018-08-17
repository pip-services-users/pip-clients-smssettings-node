import { Descriptor } from 'pip-services-commons-node';
import { Factory } from 'pip-services-components-node';

import { SmsSettingsNullClientV1 } from '../version1/SmsSettingsNullClientV1';
import { SmsSettingsMemoryClientV1 } from '../version1/SmsSettingsMemoryClientV1';
import { SmsSettingsDirectClientV1 } from '../version1/SmsSettingsDirectClientV1';
import { SmsSettingsHttpClientV1 } from '../version1/SmsSettingsHttpClientV1';
import { SmsSettingsSenecaClientV1 } from '../version1/SmsSettingsSenecaClientV1';

export class SmsSettingsClientFactory extends Factory {
	public static Descriptor: Descriptor = new Descriptor('pip-services-smssettings', 'factory', 'default', 'default', '1.0');
	public static NullClientV1Descriptor = new Descriptor('pip-services-smssettings', 'client', 'null', 'default', '1.0');
	public static MemoryClientV1Descriptor = new Descriptor('pip-services-smssettings', 'client', 'memory', 'default', '1.0');
	public static DirectClientV1Descriptor = new Descriptor('pip-services-smssettings', 'client', 'direct', 'default', '1.0');
	public static HttpClientV1Descriptor = new Descriptor('pip-services-smssettings', 'client', 'http', 'default', '1.0');
	public static SenecaClientV1Descriptor = new Descriptor('pip-services-smssettings', 'client', 'seneca', 'default', '1.0');
	
	constructor() {
		super();

		this.registerAsType(SmsSettingsClientFactory.NullClientV1Descriptor, SmsSettingsNullClientV1);
		this.registerAsType(SmsSettingsClientFactory.MemoryClientV1Descriptor, SmsSettingsMemoryClientV1);
		this.registerAsType(SmsSettingsClientFactory.DirectClientV1Descriptor, SmsSettingsDirectClientV1);
		this.registerAsType(SmsSettingsClientFactory.HttpClientV1Descriptor, SmsSettingsHttpClientV1);
		this.registerAsType(SmsSettingsClientFactory.SenecaClientV1Descriptor, SmsSettingsSenecaClientV1);
	}
	
}
