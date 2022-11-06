const request = require("supertest");
const baseUrl = "http://localhost:5000";
let inspectData = {};
describe(`Inspection`, () => {
    const newInspection = {
        routeId: "R006",
        time: "11.00 a.m.",
        date: "2022-11-15",
        inspectorName: "Kamal Perera",
        enquiries: "10",
    };

    beforeAll(async() => {
        inspectData = await request(baseUrl)
            .post("/api/inspection/add")
            .send(newInspection);
    });
    afterAll(async() => {
        await request(baseUrl).delete(
            `/api/inspection/delete/${inspectData.body._id}`,
        );
    });

    it("should return 200 if newInspect exists", async() => {
        const res = await request(baseUrl).get("/api/inspection/all");
        expect(res.statusCode).toEqual(200);
        expect(res.body.error).not.toBe(null);
    });

    it("should return data", async() => {
        const res = await request(baseUrl).get(
            `/api/inspection/${inspectData.body._id}`,
        );
        expect(res.body.data).not.toBe(null);
    });
});