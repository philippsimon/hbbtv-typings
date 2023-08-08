declare namespace OpApp {

    export enum REPLACE_UI_ELEMENTS {
        UI_TVMODE = 0,
        UI_VOLUME = 1,
        UI_PARENTALCONTROL = 2,
        UI_TIMESHIFT = 3,
        UI_RECORD = 4,
        UI_MESSAGES_PVR = 32,
        UI_MESSAGES_REMINDER = 33,
        UI_MESSAGES_DRM = 34,
        UI_MESSAGES_SYSTEM = 35,
        UI_EPG = 64,
        UI_PVR = 65,
        UI_HBBTV = 66,
        UI_MENU = 67,
        UI_INSTALLATION = 68,
        UI_ALL = 127,
    }

    export class Configuration extends OIPF.Configuration {
        readonly runningOperatorApplication: number[];

        /* Methods */
        /**
         *
         * @param org_ids
         */
        setQueryOrganisations(org_ids: number[]): void;

        /**
         *
         * @param elements
         */
        replaceUIElements(elements: REPLACE_UI_ELEMENTS[]): REPLACE_UI_ELEMENTS[];

        /**
         * Returns Local System object
         */
        localSystem: OpApp.LocalSystem;

        /**
         * Returns
         */
        preferredUILanguage47: string;
    }
}
