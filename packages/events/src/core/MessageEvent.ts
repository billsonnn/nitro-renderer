import { IConnection, IMessageEvent, IMessageParser } from '@nitrots/api';

export class MessageEvent implements IMessageEvent
{
    private _callBack: Function;
    private _parserClass: Function;
    private _parser: IMessageParser;
    private _connection: IConnection;

    constructor(callBack: Function, parser: { new(): IMessageParser })
    {
        this._callBack = callBack;
        this._parserClass = parser;
        this._parser = null;
        this._connection = null;
    }

    public dispose(): void
    {
        this._callBack = null;
        this._parserClass = null;
        this._parser = null;
        this._connection = null;
    }

    public get callBack(): Function
    {
        return this._callBack;
    }

    public get parserClass(): Function
    {
        return this._parserClass;
    }

    public get parser(): IMessageParser
    {
        return this._parser;
    }

    public set parser(parser: IMessageParser)
    {
        this._parser = parser;
    }

    public get connection(): IConnection
    {
        return this._connection;
    }

    public set connection(connection: IConnection)
    {
        this._connection = connection;
    }
}
