declare namespace OIPF {
    /**
     * A strict subset of the DOM Window object representing the application. No symbols from the Window
     * object are accessible through this property except `postMessage`: 
     */
    export interface Window {
        postMessage( message: any, targetOrigin: string ): void; 
    }

}