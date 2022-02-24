declare namespace OIPF {

    export interface CapabilitiesObject extends HTMLObjectElement {
        type: 'application/oipfCapabilities';

        /**
         * Returns the OITF’s capability description as an XML Document object using the syntax as defined in Annex
         * F without using any namespace definitions.
         */
        readonly xmlCapabilities: Document;

        /**
         * This property holds the number of possible additional decodes for SD video. Depending on the current usage of
         * system resources this value may vary. The value of this property is likely to change if an HD video is
         * started.
         *
         * Adding an A/V Control object or video/broadcast object may still fail, even if extraSDVideoDecodes is larger
         * than 0. For A/V Control objects, in case of failure the play state for the A/V Control object shall be set to
         * 6 (‘error’) with a detailed error code of 3 (‘insufficient resources’). For video/broadcast objects, in case
         * of failure the play state of the video/broadcast object shall be set to 0 (‘unrealized’) with a detailed
         * error code of 11 (‘insufficient resources’).
         */
        readonly extraSDVideoDecodes: number;

        /**
         * This property holds the number of possible additional decodes for HD video. Depending on the current usage of
         * system resources this value may vary. The value of this property is likely to change if an SD video is
         * started.
         *
         * Adding an A/V Control object or video/broadcast object may still fail, even if extraHDVideoDecodes is larger
         * than 0. For A/V Control objects, in case of failure the play state for the A/V Control object shall be set to
         * 6 (‘error’) with a detailed error code of 3 (‘insufficient resources’). For video/broadcast objects, in case
         * of failure the play state of the video/broadcast object shall be set to 0 (‘unrealized’) with a detailed
         * error code of 11 (‘insufficient resources’).
         */
        readonly extraHDVideoDecodes: number;

        /**
         * Check if the OITF supports the passed capability.
         * Returns true if the OITF supports the passed capability, false otherwise.
         *
         * @param profileName An OIPF base UI profile string or a UI Profile name fragment string as defined in section
         * 9.2. Examples of valid profileName: “OITF_HD_UIPROF” or “+PVR”.
         */
        hasCapability(profileName: string): boolean;

        /**
         * Let the application developer print debug information on the debug output (for example, a console, a serial
         * link or a file). The means to access this debug output is outside the scope of this specification and
         * implementation-dependent. A line feed character SHALL NOT be inserted automatically at the end of the string
         * by the implementation.
         *
         * @example debug("[APP] value = " + value + "\n");
         * @param arg String to print on the debug output.
         */
        debug(arg: string): void;
    }

}
