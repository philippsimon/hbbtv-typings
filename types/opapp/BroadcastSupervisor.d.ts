import VideoBroadcastObject = OIPF.VideoBroadcastObject;

declare namespace OpApp {

    /* enums */
    export enum playState  {
        UNREALIZED = 0,
        CONNECTING = 1,
        PRESENTING = 2,
    }

    export type playStateError = ChannelChangeErrorState;

    export enum ChannelChangeErrorState {
        CHANNEL_NOT_SUPPORTED = 0,
        CANNOT_TUNE = 1,
        TUNER_LOCKED = 2,
        PARENTAL_LOCK_CHANNEL_SIGNAL = 3,
        ENCRYPTED_CHANNEL_KEY_MODULE_MISSING = 4,
        UNKNOWN_CHANNEL = 5,
        CHANNEL_SWITCH_INTERUPTED = 6,
        CHANNEL_CHANGE_FAILED_RECORDED = 7,
        CANNOT_RESOLVE_URI_IP_CHANNEL = 8,
        INSUFFICIENT_BANDWIDTH = 9,
        CHANNEL_CHANGE_FAILED_NO_CHANNEL_LIST_UNREALIZED = 10,
        INSUFFICIENT_RESOURCES = 11,
        CHANNEL_NOT_FOUND = 12,
        PARENTAL_LOCK_CHANNEL_MANUAL = 13,
        UNIDENTIFIED_ERROR = 100,
    }

    export enum AVComponentType {
        COMPONENT_TYPE_VIDEO = 0,
        COMPONENT_TYPE_AUDIO = 1,
        COMPONENT_TYPE_SUBTITLE = 2,
    }

    export enum SEEK_REFERENCE_POINT {
        POSITION_CURRENT = 0,
        POSITION_START = 1,
        POSITION_END = 2
    }

    export enum BroadcastSupervisorEvents {
        ChannelChangeSucceeded = "ChannelChangeSucceeded",
        ChannelChangeError = "ChannelChangeError",
        PlayStateChange = "PlayStateChange",
        PlaySpeedChanged = "PlaySpeedChanged",
        PlayPositionChanged = "PlayPositionChanged",
        ProgrammesChanged = "ProgrammesChanged",
        ParentalRatingChange = "ParentalRatingChange",
        ParentalRatingError = "ParentalRatingError",
        SelectedComponentChanged = "SelectedComponentChanged"
    }

    type ChannelChangeSucceededEventListener = (channel: OIPF.Channel) => void;
    type ChannelChangeErrorEventListener = (channel: OIPF.Channel, error: ChannelChangeErrorState) => void;
    type PlayStateChangeEventListener = (state: playState, error: ChannelChangeErrorState) => void;
    type PlaySpeedChangedEventListener = (speed: number) => void;
    type PlayPositionChangedEventListener = (position: number) => void;
    type ParentalRatingChange = (contentId: string, ratings: OIPF.ParentalRating[], DRMSystemId: string, blocked: boolean) => void;
    type ParentalRatingError = (contentId: string, ratings: OIPF.ParentalRating[], DRMSystemId: string) => void;
    type ProgrammesChangedEventListener = () => void;
    type SelectedComponentChanged = (componentType: number) => void;

    /**
     * BroadcastSupervisor
     *
     * @see A2.5
     */
    export class BroadcastSupervisor {
        /* Properties */
        readonly playState: playState;
        readonly playStateError: playStateError;
        readonly playSpeed: Pick<VideoBroadcastObject, "playSpeed">;
        readonly playPosition: Pick<VideoBroadcastObject, "playPosition">;
        readonly playbackOffset: Pick<VideoBroadcastObject, "playbackOffset">;
        readonly maxOffset: Pick<VideoBroadcastObject, "maxOffset">;
        readonly timeShiftMode: Pick<VideoBroadcastObject, "timeShiftMode">;
        readonly currentTimeShiftMode: Pick<VideoBroadcastObject, "currentTimeShiftMode">;
        readonly programmes: Pick<VideoBroadcastObject, "programmes">;
        readonly currentChannel: Pick<VideoBroadcastObject, "currentChannel">;

        /* Events */
        onChannelChangeError(channel: OIPF.Channel, errorState: ChannelChangeErrorState): void;
        onPlayStateChange(state: playState, error: ChannelChangeErrorState): void;
        onChannelChangeSucceeded: (channel: OIPF.Channel) => void;
        onPlaySpeedChanged(speed: number): void;
        onPlayPositionChanged(position: number): void;
        onProgrammesChanged(): void;
        onParentalRatingChange(contentId: string, ratings: OIPF.ParentalRating[], DRMSystemId: string, blocked: boolean): void;
        onParentalRatingError(contentId: string, ratings: OIPF.ParentalRating[], DRMSystemId: string): void;
        onSelectedComponentChanged(componentType: number): void;

        /* Methods */
        addEventListener(eventName: BroadcastSupervisorEvents,
                         listener: ChannelChangeSucceededEventListener
                                    | ChannelChangeErrorEventListener
                                    | PlayStateChangeEventListener
                                    | PlaySpeedChangedEventListener
                                    | PlayPositionChangedEventListener
                                    | ParentalRatingChange
                                    | ParentalRatingError
                                    | ProgrammesChangedEventListener
                                    | SelectedComponentChanged
                        ): void;

        removeEventListener(eventName: BroadcastSupervisorEvents,
                            listener: ChannelChangeSucceededEventListener
                                | ChannelChangeErrorEventListener
                                | PlayStateChangeEventListener
                                | PlaySpeedChangedEventListener
                                | PlayPositionChangedEventListener
                                | ParentalRatingChange
                                | ParentalRatingError
                                | ProgrammesChangedEventListener
                                | SelectedComponentChanged): void;

        getChannelConfig(): Pick<VideoBroadcastObject, "getChannelConfig">;

        createChannelObject(
            idType: number,
            dsd: string,
            sid: number,
        ): Pick<VideoBroadcastObject, "createChannelObject">;

        createChannelObject(
            idType: number,
            onid?: number,
            tsid?: number,
            sid?: number,
            sourceId?: number,
            ipBroadcastID?: string
        ): Pick<VideoBroadcastObject, "createChannelObject">;

        setChannel(
            channel: OIPF.Channel,
            trickplay?: boolean,
            // tslint:disable-next-line:unified-signatures
            contentAccessDescriptorURL?: string,
        ): Pick<VideoBroadcastObject, "setChannel">;

        setChannel(
            channel: OIPF.Channel,
            trickplay?: boolean,
            contentAccessDescriptorURL?: string,
            quiet?: number,
            // tslint:disable-next-line:unified-signatures
            blockAV?: boolean,
        ): Pick<VideoBroadcastObject, "setChannel">;

        setChannel(
            channel?: OIPF.Channel,
        ): Pick<VideoBroadcastObject, "setChannel">;

        prevChannel(blockAV?: boolean): Pick<VideoBroadcastObject, "prevChannel">;

        nextChannel(blockAV?: boolean): Pick<VideoBroadcastObject, "nextChannel">;

        recordNow(duration: number): string | null | undefined;
        stopRecording(): void;
        pause(): void;
        resume(): void;
        setSpeed(speed: number): boolean;
        seek(offset: number, reference: number): boolean;

        blockAV(): void;
        unblockAV(): void;

        getCurrentActiveComponents(componentType?: AVComponentType): OIPF.AVComponentCollection;
        getComponents(componentType?: AVComponentType): OIPF.AVComponentCollection;

        stopTimeshift(): boolean;
        selectComponent(componentType: AVComponentType | OIPF.AVComponent): void;
        unselectComponent(componentType: AVComponentType | OIPF.AVComponent): void;
    }
}
