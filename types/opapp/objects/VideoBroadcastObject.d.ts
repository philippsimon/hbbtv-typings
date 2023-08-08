declare namespace OpApp {
    // @ts-ignore
    export interface VideoBroadcastObject extends OIPF.VideoBroadcastObject {
        onChannelChangeSucceeded: (channel: OIPF.Channel, viewerChannel: OIPF.Channel, quiet: number) => void;
        readonly playState: playState;
    }
}
