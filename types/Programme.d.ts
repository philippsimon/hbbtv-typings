declare namespace OIPF {
    export interface Programme {
        name: string;
        longName?: string;
        description?: string;
        longDescription?: string;
        startTime: number; // seconds since midnight (GMT) on 1/1/1970.
        duration: number; // in seconds.
        channelID: string;
        episode?: number;
        totalEpisodes?: number;
        readonly is3D: boolean;
        programmeID: string;
        programmeIDType: number;
        readonly IMI: string;
        readonly parentalRatings: Collection<ParentalRating>;
        readonly groupCRIDs: Collection<string>;
        getSIDescriptors(): Collection<string>;
    }
}
