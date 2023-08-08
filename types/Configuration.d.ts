declare namespace OIPF {
    /**
     * The `Configuration` object allows configuration items within the system to be read and modified. This includes
     * settings such as audio and subtitle languages, display aspect ratios and other similar settings. Unlike the `LocalSystem`
     * object, this is concerned with software- and application-related settings rather than hardware configuration and control.
     *
     * The property `isPINEntryLocked` and the methods `setParentalControlPIN`,
     * `unlockWithParentalControlPIN`, `verifyParentalControlPIN`, `setBlockUnrated` and
     * `getBlockUnrated` formerly found in this class are now found in the
     * `application/oipfParentalControlManager` embedded object - see section 7.9.1.
     *
     * The methods `setParentalControlPINEnable` and `getParentalControlPINEnable` formerly found in this
     * class have been removed.
     */
    export class Configuration {

        /**
         * A comma-separated set of languages to be used for audio playback, in order of preference.
         * Each language SHALL be indicated by its ISO 639.2 language code as defined in [ISO 639.2].
         */
        preferredAudioLanguage: string;

        /**
         * A comma-separated set of languages to be used for subtitle playback, in order of preference.
         * Each language SHALL be indicated by its ISO 639.2 language code as defined in [ISO 639.2].
         */
        preferredSubtitleLanguage: string;

        /**
         * A comma-separated set of languages to be used for the user interface of a service, in order of
         * preference.
         *
         * Each language SHALL be indicated by its ISO 639.2 language code as defined in [ISO 639.2].
         * If present, the HTTP `Accept-language` header shall contain the same languages as the
         * preferredUILanguage property with the same order of preference. NOTE: The order of preference in
         * the `Accept-language` header is indicated using the quality factor.
         */
        preferredUILanguage: string;

        /**
         * An ISO-3166 three character country code identifying the country in which the receiver is deployed.
         */
        countryId: string;

        /**
         * An integer indicating the time zone within a country in which the receiver is deployed. A value of 0
         * SHALL represent the eastern-most time zone in the country, a value of 1 SHALL represent the next
         * time zone to the west, and so on.
         * Valid values are in the range 0 – 60.
         */
        regionId: number;

        /**
         * The policy dictates what mechanism the system should use when storage space is exceeded.
         * Valid values are shown in the table below.
         * Value Description
         * - `0` Indicates a recording management policy where no recordings are to
         *   be deleted.
         * - `1` Indicates a recording management policy where only watched
         *   recordings MAY be deleted.
         * - `2` Indicates a recording management policy where only recordings
         *   older than the specified threshold (given by the `pvrSaveDays` and
         *   `pvrSaveEpisodes` properties) MAY be deleted.
         */
        pvrPolicy: 0 | 1 | 2;

        /**
         * When the `pvrPolicy` property is set to the value 2, this property indicates the minimum number of
         * episodes that SHALL be saved for series-link recordings.
         */
        pvrSaveEpisodes: number;

        /**
         * When the `pvrPolicy` property is set to the value 2, this property indicates the minimum save time (in
         * days) for individual recordings. Only recordings older than the save time MAY be deleted.
         */
        pvrSaveDays: number;

        /**
         * The default padding (measured in seconds) to be added at the start of a recording.
         */
        pvrStartPadding: number;

        /**
         * The default padding (measured in seconds) to be added at the end of a recording.
         */
        pvrEndPadding: number;

        /**
         * Shall be set to false if subtitles are disabled by the terminal. When set to false, subtitle components that
         * are selected using a video/broadcast object, A/V control object or HTML5 media element will not be presented.
         * See also clause 10.2.7 in HBBTV Spec
         */
        readonly subtitlesEnabled: boolean;

        /**
         * Shall be set to false if audio description is disabled by the terminal, otherwise shall be set to true.
         * If set to false, applications should not enable audio description using the component selection API of the
         * supported media objects i.e. A/V Control object, video/broadcast object and HTML5 media elements.
         */
        readonly audioDescriptionEnabled: boolean;

        /**
         * Returns either a string representing a distinctive identifier that is unique for the combination of the
         * terminal and the HTML document origin or a status code. The distinctive identifier shall use a character set
         * that is restricted to alphanumeric characters and the hyphen. The status code shall be a number preceded by
         * the '#' character.
         *
         * Valid values:
         *
         * #1 - The terminal is configured to request explicit user approval for this application. The application may
         * call requestAccessToDistinctiveIdentifier to obtain such approval even if this method has previously been
         * called and the user did not grant access.
         *
         * #2 - following a previous call by the application to requestAccessToDistinctiveIdentifier. Further calls to
         * requestAccessToDistinctiveIdentifier do not result in the user being asked again for approval. This is for
         * use by terminals that restrict the number of times that an application may call this method.
         *
         * #3 - Access to the distinctive identifier is denied in accordance with the user option setting - see clause
         * 12.1.5).
         *
         * #4 - Access to the distinctive identifier is denied by the terminal manufacturer, e.g. because the
         * application provider and the terminal manufacturer have not entered into a suitable agreement covering such
         * access.
         *
         * #5 Access to the distinctive identifier is denied as the application has not yet been activated.
         */
        readonly deviceId: string;

        /**
         * Returns the ordered list of DVB network_ids from the DTT channels, if any, that are included in the
         * terminal's channel list. If the terminal does not have a DTT receiver or no DTT channels are present in the
         * channel list then the property shall be undefined.
         */
        readonly dtt_network_ids: number[];

        /**
         * Get the system text string that has been set for the specified key.
         *
         * @param key A key identifying the system text string to be retrieved.
         */
        getText(key: string): string;

        /**
         * Set the system text string that has been set for the specified key. System text strings
         * are used for automatically-generated messages in certain cases, e.g. parental control
         * messages.
         *
         * @param key The key for the text string to be set. Valid keys are:
         *   - `'no_title'` Text string used as the title for
         *     programmes and channels where no
         *     guide information is available.
         *     Defaults to “No information”
         * - `'no_synopsis'` Text string used as the synopsis for
         *     programmes where no guide information
         *     is available.
         *     Defaults to “No further information available”
         * - `'manual_recording'` Text string used to identify a manual
         *     recording.
         *     Defaults to “Manual Recording”
         * @param value The new value for the system text string.
         */
        setText(key: 'no_title' | 'no_synopsis' | 'manual_recording', value?: string): void;

        /**
         * Calls the callback with true as the first argument if the deviceId property contains a distinctive
         * identifier, otherwise calls the callback with false as the first argument. This callback takes place either
         * immediately or after a user interaction according to the following rules.
         *
         * Calls to this method while a callback is outstanding shall be ignored. If this method is supported, the
         * terminal shall provide some native UI that requests the user to grant access to the distinctive identifier
         * for the calling application. The terminal may persistently store the user response between invocations of the
         * application.
         *
         * If the deviceId property contains the value "#1", the terminal shall display this native UI when this method
         * s called. The callback shall be called only after the UI is removed and the argument shall reflect the
         * updated state of the deviceId property following the interaction with the user. This method call shall not
         * block while the UI is displayed.
         *
         * If the deviceId property contains a different status code, the terminal shall not display the native UI and
         * shall immediately call the callback with false as the first argument.
         *
         * If the deviceId property already contains a distinctive identifier, the terminal shall not display the native
         * UI and shall immediately call the callback with true as the first argument.
         */

        requestAccessToDistinctiveIdentifier(callback: (success: boolean) => void): void;
    }
}
