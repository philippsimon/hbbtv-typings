declare namespace OpApp {

    /**
     * 7.2.1 The application/oipfApplicationManager embedded object
     An OITF SHALL support a non-visual embedded object of type “application/oipfApplicationManager”, with
     the following JavaScript API, to enable applications to access the privileged functionality related to application lifecycle
     and management that is provided by the application model defined in this section.
     If one of the methods on the application/oipfApplicationManager is called by a webpage that is not a
     privileged DAE application, the OITF SHALL throw an error as defined in section 10.1.1.
     */
    export interface ApplicationManagerObject extends HTMLObjectElement {
        type: 'application/oipfApplicationManager';

        /**
         * The function that is called when the OITF is running low on available memory for running DAE
         * applications. The exact criteria when to generate such an event is implementation specific.
         */
        onLowMemory(): void;

        /**
         * The function that is called immediately prior to a `load` event being generated in the affected
         * application. The specified function is called with one argument `appl`, which provides a reference to the
         * affected application.
         */
        onApplicationLoaded(appl: OpApp.Application): void;

        /**
         * The function that is called immediately prior to an `unload` event being generated in the affected
         * application. The specified function is called with one argument `appl`, which provides a reference to the
         * affected application.
         */
        onApplicationUnloaded(appl: OpApp.Application): void;

        /**
         * The function that is called when the OITF fails to load the file containing the initial HTML document of
         * an application (e.g. due to an HTTP 404 error, an HTTP timeout, being unable to load the file from a
         * DSM-CC object carousel or due to the file not being either an HTML file). All properties of the
         * `Application` object referred to by appl SHALL have the value `undefined` and calling any methods
         * on that object SHALL fail.
         */
        onApplicationLoadError( appl: OpApp.Application ): void;
    }
}
