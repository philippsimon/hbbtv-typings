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

        /**
         * Sets the DRM system, specified by DRMSystemID, that the terminal shall use with any new requests for playing
         * protected broadband content. Any other DRM systems present in the terminal shall not be used with new
         * requests until this method is called again or the application stops for any reason, even if this means
         * playback of content fails.
         *
         * If the method is called with the DRMSystemID set to null, the algorithm used by the terminal to determine
         * which DRM to use is outside the scope of the present document. The value true shall always be returned in
         * this case. This shall be the default state if no calls to this method have been made.
         *
         * A call to this method with DRMSystemID set to "urn:hbbtv:oipfdrm:inactive" shall disable the use of all DRM
         * systems in response to requests to play protected broadband content with the exception that the operation of
         * the EME API is not affected (see clause B.3). Methods on the oipfDrmAgent object may still be called in this
         * state, though depending on the DRM system, some uses of sendDRMMessage may fail. Protected broadband content
         * may still play if suitable keys or licences are provided using the EME API.
         *
         * If for any reason the terminal is unable to set the specified DRM system as requested, the method shall
         * return false, otherwise it shall return true.
         *
         * @param drmSystemId The DRM system as defined in clause 9.3.10 of the OIPF DAE specification [1] and in Table
         * 9 ("DRMControlInformation Type Semantics") of the OIPF Metadata specification [18].
         */
        setActiveDRM(drmSystemId?: string): boolean;
    }

}
