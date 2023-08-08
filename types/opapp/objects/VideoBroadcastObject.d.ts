declare namespace OpApp {
    // @ts-ignore
    export interface VideoBroadcastObject extends OIPF.VideoBroadcastObject {
        onChannelChangeSucceeded: ( channel: OIPF.Channel, viewerChannel: OIPF.Channel, quiet: number ) => void;
        readonly playState: playState;
        readonly playStateError: playStateError;
        readonly playSpeed: Pick<VideoBroadcastObject, "playSpeed">;
        readonly playPosition: Pick<VideoBroadcastObject, "playPosition">;
        readonly playbackOffset: Pick<VideoBroadcastObject, "playbackOffset">;
        readonly maxOffset: Pick<VideoBroadcastObject, "maxOffset">;
        readonly timeShiftMode: Pick<VideoBroadcastObject, "timeShiftMode">;
        readonly currentTimeShiftMode: Pick<VideoBroadcastObject, "currentTimeShiftMode">;
    }
}
