declare namespace OpApp {
    export const enum PowerState {
        OFF = 0,
        ON = 1,
        PASSIVE_STANDBY = 2,
        ACTIVE_STANDBY = 3,
        PASSIVE_STANDBY_HIBERNATE = 4,
        RESTART = 5,
        FACTORY_RESET = 6
    }

    export class LocalSystem {
        volume: number;
        mute: boolean;
        powerState: PowerState;
        timeCurrentPowerState: string;
        onPowerStateChange(powerState: PowerState): void;
    }
}
