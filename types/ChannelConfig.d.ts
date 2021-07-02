declare namespace OIPF {
    export interface ChannelScanOptions {
        channelType: number;
        replaceExisting: boolean;
    }
    export interface ChannelScanParameters {
        startFrequency: number;
        endFrequency: number;
        modulationModes: number;
    }
    export interface DVBTChannelScanParameters extends OIPF.ChannelScanParameters {
        raster: number;
        ofdm: string;
        bandwidth: string;
    }
    export interface DVBSChannelScanParameters extends OIPF.ChannelScanParameters {
        symbolRate: string;
        polarisation: number;
        codeRate: string;
        orbitalPosition: number;
        networkId: number;
    }
    export class ChannelConfig {
        readonly channelList: OIPF.ChannelList;
        readonly currentChannel: OIPF.Channel;
        readonly currentFavouriteList: OIPF.FavouriteList;
        readonly favouriteLists: OIPF.FavouriteListCollection;
        onChannelScan: (
            scanEvent: number,
            progress: number,
            frequency: number,
            signalStrength: number,
            channelNumber: number,
            channelType: number,
            channelCount: number,
            transponderCount: number,
            newChannel: OIPF.Channel,
        ) => void;
        onChannelListUpdate: () => void;
        createFilteredList(blocked: boolean, favourite: boolean, hidden: boolean, favouriteListID: string): OIPF.ChannelList;
        startScan(options: OIPF.ChannelScanOptions): void;
        stopScan(): void;
        createChannelList(bdr: string): OIPF.ChannelList;
        createChannelObject(idType: number, onid: number, tsid: number, sid: number, sourceID: number, ipBroadcastID: string): OIPF.Channel;
        createChannelScanParametersObject(idType: number): OIPF.Channel;
        createChannelScanOptionsObject(): OIPF.ChannelScanOptions;
    }
}
