const xmlrpc = require("xmlrpc");

// Setting up Odoo credentials
const url = "https://luxe-graphics.odoo.com";
const db = process.env.ODOO_DB;
const username = process.env.ODOO_USERNAME;
const password = process.env.ODOO_PASSWORD;

// Create a client for the 'common' service
const commonClient = xmlrpc.createClient({
    url: `${url}/xmlrpc/2/common`,
});

// Create a client for the 'object' service
const modelsClient = xmlrpc.createClient({
    url: `${url}/xmlrpc/2/object`,
});

export const getOdooVersion = async (): Promise<any> => {
    try {
        const res: Response = await new Promise((resolve, reject) => {
            commonClient.methodCall("version", [], (err: any, version: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(version);
                }
            });
        });

        return res;
    } catch (error: any) {
        console.error({ error });
    }
};
