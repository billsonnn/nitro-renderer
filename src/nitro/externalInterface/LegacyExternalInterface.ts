declare global
{
	interface Window
	{
		FlashExternalInterface?:
		{
			legacyTrack?: (
				category: string,
				action: string,
				data: unknown[]
			) => void;
			logDebug?: (...params: string[]) => void;
			disconnect?: (reasonCode: number, reasonString: string) => void;
			logout?: () => void;
			openWebPageAndMinimizeClient?: (pageUrl: string) => void;
			heartBeat?: () => void;
			logEventLog?: (log: string) => void;
			openPage?: (pageUrl: string) => void;
			closeWebPageAndRestoreClient?: () => void;
			openHabblet?: (name: string, param: string) => void;
			closeHabblet?: (name: string, param: string) => void;
			openExternalLink?: (link: string) => void;
			roomVisited?: (roomId: number) => void;
			openMinimail?: (target: string) => void;
			openNews?: () => void;
			closeNews?: () => void;
			openAvatars?: () => void;
			openRoomEnterAd?: () => void;
			updateFigure?: (figure: string) => void;
		};

		FlashExternalGameInterface?:
		{
			showGame?: (url: string) => void;
			hideGame?: () => void;
		};
	}
}

export class LegacyExternalInterface
{
    public static get available(): boolean
    {
        return true;
    }

    public static call<K extends keyof typeof window.FlashExternalInterface>(
        method: K,
        ...params: Parameters<typeof window.FlashExternalInterface[K]>
    ): ReturnType<typeof window.FlashExternalInterface[K]> | undefined
    {
        if(window.top !== window)
        {
            window.top.postMessage('Nitro_LegacyExternalInterface' + JSON.stringify({
                method,
                params
            }), '*');
        }

        if(!('FlashExternalInterface' in window)) return undefined;

        const fn = window.FlashExternalInterface[method] as Function;

        return typeof fn !== 'undefined' ? fn(...params) : undefined;
    }

    public static callGame<K extends keyof typeof window.FlashExternalGameInterface>(
        method: K,
        ...params: Parameters<typeof window.FlashExternalGameInterface[K]>
    ): ReturnType<typeof window.FlashExternalGameInterface[K]> | undefined
    {
        if(window.top !== window)
        {
            window.top.postMessage('Nitro_LegacyExternalGameInterface' + JSON.stringify({
                method,
                params
            }), '*');
        }

        if(!('FlashExternalGameInterface' in window)) return undefined;

        const fn = window.FlashExternalGameInterface[method] as Function;

        return typeof fn !== 'undefined' ? fn(...params) : undefined;
    }

    public static addCallback(name: string, func: Function)
    {
        (window as any)[name] = func;
    }
}
