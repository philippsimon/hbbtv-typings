declare namespace OIPF {

    export interface RecordingSchedulerObject extends HTMLObjectElement {
        type: 'application/oipfRecordingScheduler';
        state: number;
        scheduled: boolean;
        isManual: boolean;
        repeatDays: number;
        startPadding: number;
        endPadding: number;
        name: string;
        description: string;
        startTime: string;
        duration: number;
        parentalRatings: OIPF.ParentalRating[];
        channel: OIPF.Channel;
        programmeID: string;
        recordings: object[] // todo: create a class for ScheduledRecording
        getRecording(): object;
    }

}
