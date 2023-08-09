declare namespace OIPF {

    import BroadcastSupervisor = OpApp.BroadcastSupervisor;

    export const enum PINControlStatus {
        CORRECT_PIN = 0,
        INCORRECT_PIN = 1,
        LOCKED = 2,
    }

    export const enum VerifyParentalConrolStatus {
        APPROVED = "approved",
        NOT_APPROVED = "notApproved",
    }

    export interface ParentalControlManagerObject extends HTMLObjectElement {
        type: 'application/oipfParentalControlManager';
        parentalPINLength: number;
        isPINEntryLocked(): boolean;
        setParentalControlStatus(pcPIN: string, enable: boolean): PINControlStatus;
        getParentalControlStatus(): PINControlStatus;
        unlockWithParentalControlPIN(pcPIN: string, target: VideoBroadcastObject | BroadcastSupervisor | HTMLMediaElement): PINControlStatus | 3;
        verifyParentalControlPIN(pcPIN: string): PINControlStatus;
        verifyParentalControl(context: object): Promise<VerifyParentalConrolStatus>;
    }

}
