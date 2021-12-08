import { request as httpsRequest } from 'https';

function install()
{
    try
    {
        const params = {};
        const userAgent = process.env.npm_config_user_agent;

        if(userAgent)
        {
            const agentParts = userAgent.split(/[\s/]+/);

            params['packageName'] = process.env.npm_package_name;
            params['packageVersion'] = process.env.npm_package_version;
            params['nodeVersion'] = agentParts[3];
            params['npmVersion'] = agentParts[1];
            params['osType'] = agentParts[4];
            params['osArch'] = agentParts[5];
        }

        const data = JSON.stringify(params);
        const request = httpsRequest({
            hostname: 'install.nitrots.co',
            port: 443,
            path: '/collect',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        });

        request.write(data);
        request.end();
    }

    catch (e)
    {
        //
    }
}

install();
