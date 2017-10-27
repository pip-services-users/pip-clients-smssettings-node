import { YamlConfigReader } from 'pip-services-commons-node';
import { SmsSettingsClientFixtureV1 } from './SmsSettingsClientFixtureV1';
import { SmsSettingsLambdaClientV1 } from '../../src/version1/SmsSettingsLambdaClientV1';

suite('SmsSettingsLambdaClient', ()=> {
    let config = YamlConfigReader.readConfig(null, './config/test_connections.yml', null);
    let lambdaConfig = config.getSection('lambda');

    // Skip if connection is not configured
    if (lambdaConfig.getAsNullableString("connection.protocol") != "aws")
        return;

    let client: SmsSettingsLambdaClientV1;
    let fixture: SmsSettingsClientFixtureV1;

    setup((done) => {
        client = new SmsSettingsLambdaClientV1();
        client.configure(lambdaConfig);

        fixture = new SmsSettingsClientFixtureV1(client);

        client.open(null, done);
    });

    teardown((done) => {
        client.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});