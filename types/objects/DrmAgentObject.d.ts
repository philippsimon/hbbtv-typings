declare namespace OIPF {
    export const enum DrmMessageResult {
        Successful = 0,
        UnknownError = 1,
        CannotProcess = 2,
        UnknownMimeType = 3,
        UserConsentNeeded = 4,
        UnknownDrmSystem = 5,
        WrongFormat = 6,
    }
    export const enum DRMSystemStatusValue {
        READY = 0,
        UNKNOWN = 1,
        INITIALISING = 2,
        ERROR = 3,
    }
    export interface DrmAgentObject extends HTMLObjectElement {
        type: 'application/oipfDrmAgent';
        onDRMSystemStatusChange: (DRMSystemID: string) => void;
        onDRMSystemMessage: (msg: string, DRMSystemID: string) => void;
        onDRMMessageResult: (msgID: string, resultMsg: string, result: DrmMessageResult) => void;
        sendDRMMessage(msgType: string, msg: string, drmSystemId: string): string;
        DRMSystemStatus(DRMSystemID: string): DRMSystemStatusValue;
        canPlayContent(DRMPrivateData: string, DRMSystemID: string): boolean;
        canRecordContent(DRMPrivateData: string, DRMSystemID: string): boolean;
    }

}
