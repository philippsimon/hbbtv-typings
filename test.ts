const appManager = window.oipfObjectFactory.createApplicationManagerObject();

const app = appManager.getOwnerApplication(window.document);

if (app === null) {
    throw new Error('no app');
}

app.show()
