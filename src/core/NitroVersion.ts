export class NitroVersion
{
    public static RENDERER_VERSION: string = '1.6.6';
    public static UI_VERSION: string = '';

    public static sayHello(): void
    {
        if(navigator.userAgent.toLowerCase().indexOf('chrome') > -1)
        {
            const args = [
                `\n %c %c %c Nitro ${NitroVersion.UI_VERSION} - Renderer ${NitroVersion.RENDERER_VERSION} %c %c %c https://discord.nitrodev.co %c %c \n\n`,
                'background: #ffffff; padding:5px 0;',
                'background: #ffffff; padding:5px 0;',
                'color: #ffffff; background: #000000; padding:5px 0;',
                'background: #ffffff; padding:5px 0;',
                'background: #ffffff; padding:5px 0;',
                'background: #000000; padding:5px 0;',
                'background: #ffffff; padding:5px 0;',
                'background: #ffffff; padding:5px 0;'
            ];

            self.console.log(...args);
        }

        else if(self.console)
        {
            self.console.log(`Nitro ${NitroVersion.UI_VERSION} - Renderer ${NitroVersion.RENDERER_VERSION} `);
        }
    }
}
