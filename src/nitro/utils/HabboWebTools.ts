import { NitroLogger } from '../../api';
import { LegacyExternalInterface } from '../externalInterface/LegacyExternalInterface';

export class HabboWebTools
{
    public static ADVERTISEMENT: string = 'advertisement';
    public static OPENLINK: string = 'openlink';
    public static OPENROOM: string = 'openroom';

    public static logEventLog(data: string): void
    {
        try
        {
            if(LegacyExternalInterface.available)
            {
                LegacyExternalInterface.call('logEventLog', data);
            }
        }

        catch (e)
        {
            NitroLogger.log('External interface not working, failed to log event log.');
        }
    }

    public static openPage(pageUrl: string): void
    {
        try
        {
            if(LegacyExternalInterface.available)
            {
                LegacyExternalInterface.call('openPage', pageUrl);
            }
            else
            {
                NitroLogger.log('External interface not available, openPage failed.');
            }
        }

        catch (e)
        {
            NitroLogger.log('Failed to open web page', pageUrl);
        }
    }

    public static openWebPage(pageUrl: string): void
    {
        window.open(pageUrl);
    }

    public static sendHeartBeat(): void
    {
        try
        {
            if(LegacyExternalInterface.available)
            {
                LegacyExternalInterface.call('heartBeat');
            }
        }

        catch (e)
        {
            NitroLogger.log('Failed to send heartbeat');
        }
    }

    public static openWebPageAndMinimizeClient(pageUrl: string): void
    {
        try
        {
            if(LegacyExternalInterface.available)
            {
                HabboWebTools.openPage(pageUrl);
            }
        }

        catch (e)
        {
            NitroLogger.log('Failed to open web page', pageUrl);
        }
    }

    public static closeWebPageAndRestoreClient(): void
    {
        try
        {
            if(LegacyExternalInterface.available)
            {
                LegacyExternalInterface.call('closeWebPageAndRestoreClient');
            }
        }

        catch (e)
        {
            NitroLogger.log('Failed to close web page and restore client!');
        }
    }

    public static openHabblet(name: string, param: string = null): void
    {
        try
        {
            if(LegacyExternalInterface.available)
            {
                LegacyExternalInterface.call('openHabblet', name, param);
            }
        }

        catch (e)
        {
            NitroLogger.log('Failed to open Habblet', name);
        }
    }

    public static closeHabblet(name: string, param: string = null): void
    {
        try
        {
            if(LegacyExternalInterface.available)
            {
                LegacyExternalInterface.call('closeHabblet', name, param);
            }
        }

        catch (e)
        {
            NitroLogger.log('Failed to close Habblet', name);
        }
    }

    public static send(reasonCode: number, reasonString: string): void
    {
        try
        {
            if(LegacyExternalInterface.available)
            {
                LegacyExternalInterface.call('disconnect', reasonCode, reasonString);
            }
        }

        catch (e)
        {
            NitroLogger.log('Failed to close send ');
        }
    }

    public static showGame(gameUrl: string): void
    {
        try
        {
            if(LegacyExternalInterface.available)
            {
                LegacyExternalInterface.callGame('showGame', gameUrl);
            }
        }

        catch (e)
        {
            NitroLogger.log('Failed to open game', e);
        }
    }

    public static hideGame(): void
    {
        try
        {
            if(LegacyExternalInterface.available)
            {
                LegacyExternalInterface.callGame('hideGame');
            }
        }

        catch (e)
        {
            NitroLogger.log('Failed to hide game');
        }
    }

    public static open(url: string): void
    {
        try
        {
            if(LegacyExternalInterface.available)
            {
                LegacyExternalInterface.call('openExternalLink', escape(url));
            }
            else
            {
                NitroLogger.log(('External interface not available. Could not request to open: ' + url));
            }
        }

        catch (e)
        {
            NitroLogger.log(('External interface not working. Could not request to open: ' + url));
        }
    }

    public static roomVisited(roomId: number): void
    {
        try
        {
            if(LegacyExternalInterface.available)
            {
                LegacyExternalInterface.call('roomVisited', roomId);
            }
            else
            {
                NitroLogger.log('External interface not available. Could not store last room visit.');
            }
        }

        catch (e)
        {
            NitroLogger.log('External interface not working. Could not store last room visit.');
        }
    }

    public static openMinimail(target: string): void
    {
        try
        {
            if(LegacyExternalInterface.available)
            {
                LegacyExternalInterface.call('openMinimail', target);
            }
            else
            {
                NitroLogger.log('External interface not available. Could not open minimail.');
            }
        }

        catch (e)
        {
            NitroLogger.log('External interface not working. Could not open minimail.');
        }
    }

    public static openNews(): void
    {
        try
        {
            if(LegacyExternalInterface.available)
            {
                LegacyExternalInterface.call('openNews');
            }
            else
            {
                NitroLogger.log('External interface not available. Could not open news.');
            }
        }

        catch (e)
        {
            NitroLogger.log('External interface not working. Could not open news.');
        }
    }

    public static closeNews(): void
    {
        try
        {
            if(LegacyExternalInterface.available)
            {
                LegacyExternalInterface.call('closeNews');
            }
            else
            {
                NitroLogger.log('External interface not available. Could not close news.');
            }
        }

        catch (e)
        {
            NitroLogger.log('External interface not working. Could not close news.');
        }
    }

    public static openAvatars(): void
    {
        try
        {
            if(LegacyExternalInterface.available)
            {
                LegacyExternalInterface.call('openAvatars');
            }
            else
            {
                NitroLogger.log('External interface not available. Could not open avatars.');
            }
        }

        catch (e)
        {
            NitroLogger.log('External interface not working. Could not open avatars.');
        }
    }

    public static openRoomEnterAd(): void
    {
        try
        {
            if(LegacyExternalInterface.available)
            {
                LegacyExternalInterface.call('openRoomEnterAd');
            }
            else
            {
                NitroLogger.log('External interface not available. Could not open roomenterad.');
            }
        }

        catch (e)
        {
            NitroLogger.log('External interface not working. Could not open roomenterad.');
        }
    }

    public static updateFigure(figure: string): void
    {
        try
        {
            if(LegacyExternalInterface.available)
            {
                LegacyExternalInterface.call('updateFigure', figure);
            }
            else
            {
                NitroLogger.log('External interface not available. Could not update figure.');
            }
        }

        catch (e)
        {
            NitroLogger.log('External interface not working. Could not update figure.');
        }
    }
}
