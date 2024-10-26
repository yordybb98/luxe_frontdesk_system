import xmlrpc from "xmlrpc";

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

const getOdooVersion = async (): Promise<any> => {
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

const getAllPartnersOdoo = async (uid: number) => {
    try {
        const partners = await new Promise((resolve, reject) => {
            modelsClient.methodCall("execute_kw", [db, uid, password, "res.partner", "search_read", [], {}], (err: any, partners: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(partners);
                }
            });
        });
        return partners;
    } catch (err) {
        console.error("Error getting Odoo partners:", err);
        return [];
    }
};

const getPartnerByIdOdoo = async (uid: number, partnerId: number) => {
    try {
        const partner = await new Promise((resolve, reject) => {
            modelsClient.methodCall("execute_kw", [db, uid, password, "res.partner", "search_read", [[["id", "=", partnerId]]], {}], (err: any, partner: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(partner);
                }
            });
        });
        return partner;
    } catch (err) {
        console.error("Error getting Odoo partner:", err);
        return [];
    }
};

const createPartnerOdoo = async (uid: number, partner: any) => {
    try {
        const createdPartner = await new Promise((resolve, reject) => {
            modelsClient.methodCall("execute_kw", [db, uid, password, "res.partner", "create", [partner]], (err: any, createdPartner: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(createdPartner);
                }
            });
        });
        return createdPartner;
    } catch (err) {
        console.error("Error creating Odoo partner:", err);
        throw err;
    }
};

const getAllStatesOdoo = async (uid: number) => {
    try {
        const states = await new Promise((resolve, reject) => {
            modelsClient.methodCall("execute_kw", [db, uid, password, "res.country.state", "search_read", [], {}], (err: any, states: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(states);
                }
            });
        });
        return states;
    } catch (err) {
        console.error("Error getting Odoo states:", err);
        return [];
    }
};

const getStatesByCountryOdoo = async (uid: number, countryId: number) => {
    try {
        const states = await new Promise((resolve, reject) => {
            modelsClient.methodCall("execute_kw", [db, uid, password, "res.country.state", "search_read", [[["country_id", "=", countryId]]], { fields: ["id", "name"] }], (err: any, states: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(states);
                }
            });
        });
        return states;
    } catch (err) {
        console.error("Error getting Odoo states:", err);
        return [];
    }
};

const getAllCountriesOdoo = async (uid: number) => {
    try {
        const countries = await new Promise((resolve, reject) => {
            modelsClient.methodCall("execute_kw", [db, uid, password, "res.country", "search_read", [], { fields: ["id", "name", "code"] }], (err: any, countries: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(countries);
                }
            });
        });
        return countries;
    } catch (err) {
        console.error("Error getting Odoo countries:", err);
        return [];
    }
};

const authenticateFromOdoo = async (): Promise<number> => {
    return new Promise((resolve, reject) => {
        commonClient.methodCall("authenticate", [db, username, password, {}], (err: any, uid: any) => {
            if (err) {
                console.error("Error al autenticar:", err);
                reject(err);
            } else {
                resolve(uid);
            }
        });
    });
};

export { getOdooVersion, authenticateFromOdoo, getAllPartnersOdoo, getPartnerByIdOdoo, createPartnerOdoo, getAllStatesOdoo, getAllCountriesOdoo, getStatesByCountryOdoo };
