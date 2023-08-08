declare namespace OpApp {

    export enum OpAppState {
        FOREGROUND = "foreground",
        BACKGROUND = "background",
        TRANSIENT = "transient",
        OVERLAID_FOREGROUND = "overlaid-foreground",
        OVERLAID_TRANSIENT = "overlaid-transient",
    }

    export enum OpAppUpdateStatus {
        DISCOVERY_IN_PROGRSS = -3,
        NO_UPDATE_IN_PROGRESS = -2,
        NEW_SOFTWARE_AVAILABLE_FOR_DOWNLOAD = -1,
        SOFTWARE_DOWNLOAD_SUCCESSFULL = 100,

    }

    export enum OpAppUpdateEvent {
        SOFTWARE_DISCOVERING = "SOFTWARE_DISCOVERING",
        SOFTWARE_DISCOVERY_FAILED = "SOFTWARE_DISCOVERY_FAILED",
        SOFTWARE_CURRENT = "SOFTWARE_CURRENT",
        SOFTWARE_DOWNLOADING = "SOFTWARE_DOWNLOADING",
        SOFTWARE_DOWNLOAD_FAILED = "SOFTWARE_DOWNLOAD_FAILED",
        SOFTWARE_DOWNLOADED = "SOFTWARE_DOWNLOADED",
        SOFTWARE_UNPACKING = "SOFTWARE_UNPACKING",
        SOFTWARE_INSTALLATION_FAILED = "SOFTWARE_INSTALLATION_FAILED",
    }

    /**
     * See Table 11 of OpApp Spec
     */
    export enum OpAppStartupLocation {
        OPAPP_EPG = "opapp-epg",
        OPAPP_PVR = "opapp-pvr",
        OPAPP_SETTINGS = "opapp-setings",
        OPAPP_CHANNELLIST = "opapp-channellist",
        OPAPP_INSTALL = "opapp-install",
        OPAPP_UNINSTALL = "opapp-uninstall",
        OPAPP_SELECT_CHANNEL = "opapp-select-channel",
        OPAPP_HOME_MENU = "opapp-homemenu",
        OPAPP_PIN = "opapp-pin",
        OPAPP_RECORDING = "opapp-recording",
        OPAPP_SEARCH = "opapp-search"
    }

    /**
     * See Table 10 of OpApp Spec
     */
    export enum OpAppLaunchLocation {
        INSTALL = "install",
        SETTINGS = "settings",
        SOURCE = "source",
        STANDBY = "standby",
        POWERUP = "powerup",
        RESTART = "restart",
    }

    export class Application extends OIPF.Application {

        /* Properties */

        /**
         * When read by an operator application, this property shall return a String identifying which state the
         * application is in. This shall be encoded as follows -foreground, background, transient, overlaid-foreground
         * or overlaid-transient.
         * If read by a regular HbbTV® application, undefined shall be returned.
         */
        readonly opAppState: OpAppState | undefined;

        readonly privateData: OIPF.ApplicationPrivateData;

        /* Events */

        /**
         * The function that shall be called immediately prior to the terminal moving the operator application to a new
         * state. The specified function is called with the arguments, newState, which identifies the new state and
         * oldState, which identifies the old state. The newState and oldState arguments shall be encoded as defined for
         * the opAppState property.
         * @param oldState - the previous application state
         * @param newState - the new application state
         */
        onOperatorApplicationStateChange(oldState: OpAppState, newState: OpAppState): void;

        /**
         * The function that shall be called after the terminal has finished moving the operator application to a new
         * state. The specified function is called with the arguments, newState, which identifies the new state and
         * oldState, which identifies the old state. The newState and oldState arguments shall be encoded as defined for
         * the opAppState property.
         * @param oldState - the previous application state
         * @param newState - the new application state
         */
        onOperatorApplicationStateChangeCompleted(oldState: OpAppState, newState: OpAppState): void;

        /**
         * The function that is called when the operator application's update state is changed
         * @param updateEvent - the name of the triggered update event
         */
        onOpAppUpdate(updateEvent: OpAppUpdateEvent): void;

        /**
         * The function shall be called due to a request made by the user from the terminal. The specified function is
         * called with the argument startupLocation, which identifies the location for the operator application to
         * display.
         * @param startupLocation - indicates the location the OpApp should switch to at startup
         * @param launchLocation - indicates where the context event was triggered from
         */
        onOperatorApplicationContextChange(startupLocation?: OpAppStartupLocation | string, launchLocation?: OpAppLaunchLocation | string): void;

        /* Methods */

        /**
         * Requests the terminal to move the calling operator application to transient state or requests the terminal to
         * restart the timer started after the previous successful call to this method. The call shall be successful and
         * the request granted if the conditions for a successful call as listed in clause 6.3.3.4 of the present
         * document are met. If the request is granted then:
         * •    if the operator application is already in the transient or overlaid transient state, then:
         *          -  the terminal shall restart the timer with a duration of 1 minute and
         *          -  the method shall return true
         * •    else
         *          - the terminal shall start a timer with a duration of 1 minute and
         *          - the method shall return true.
         *          - the Application shall be notified via an event dispatched to the onOperatorApplicationStateChange
         *            and onOperatorApplicationStateChangeCompleted functions; and
         *
         * After the timer expires, the operator application shall be moved to background state again, with the
         * Application being notified via an event dispatched to the onOperatorApplicationStateChange and
         * onOperatorApplicationStateChangeCompleted functions. If an operator application calls the
         * opAppRequestForeground method while the timer is running and the request is granted, the timer shall be
         * disabled. If an operator application calls the opAppRequestBackground method before the timer expires the
         * timer shall be disabled.
         *
         * If the request is not in accordance with the requirements listed in clause 6.3.3.4 of the present document
         * then the request shall not be granted and the method shall return false.
         *
         * Note that the purpose of the timer is to prevent malfunctioning or misbehaving operator applications from
         * remaining in transient state for prolonged periods of time. Operator applications should not rely on the
         * timer running out as the primary means for moving to background state, but should call the
         * OpAppRequestBackground method instead.
         */
        opAppRequestTransient(): boolean;

        /**
         * Requests the terminal to move the calling application to foreground state. The terminal shall only grant the
         * request if it was received in accordance with the specifications of clause 6.3.3.2 of the present document.
         *
         * When the request is granted, the Application shall be notified via an event dispatched to the
         * onOperatorApplicationStateChange and onOperatorApplicationStateChangeCompleted functions and the method shall
         * return true.
         *
         * If the request is not in accordance with the requirements listed in clause 6.3.3.2 of the present document
         * then the request shall not be granted and the method shall return false.
         */
        opAppRequestForeground(): boolean;

        /**
         * Requests the terminal to move the calling application to background state. When the request is granted, the
         * Application shall be notified via an event dispatched to the onOperatorApplicationStateChange and
         * onOperatorApplicationStateChangeCompleted functions.
         */
        opAppRequestBackground(): void;

        opAppRequestUpdate(immediate: boolean, params?: string[]): void;

        opAppUpdateStatus(): OpAppUpdateStatus | number;

        createApplication(uri: string, createChild: boolean, runAsOpApp?: boolean): OIPF.Application | null;

        opAppUninstall(): boolean;

        getPrivateLocalStorage(): WindowLocalStorage;

        getOpApp2AppBaseURL(): string;

        getApp2OpAppBaseURL(): string;

        onApplicationLoaded(): void;

        onApplicationUnloaded(): void;

        show(): void;

        hide(): void;

        destoryApplication(): void;

    }

}
