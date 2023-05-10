declare namespace OpApp {
    export class ChannelConfig extends OIPF.ChannelConfig {
        getBroadcastSupervisor(): OpApp.BroadcastSupervisor | undefined;
        setChannelList(list: OIPF.ChannelList): void;
        createChannelList(channels: OIPF.Channel[]): OIPF.ChannelList;
        createChannelList(bdr: string): OIPF.ChannelList;
    }
}
