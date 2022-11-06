const request = require("supertest");
const baseUrl = "http://localhost:5000";
let busData = {};
describe(`Bus`, () => {
    const newRoute = {
        timetableID: "T001",
        vehicleNo: "HD-2475",
        routeId: "177",
        time: "11.33 a.m.",
        date: "2022-11-04",
        startLocation: "Kaduwela",
        EndLocation: "Kollupitiya",
    };

    beforeAll(async() => {
        busData = await request(baseUrl)
            .post("/api/busroutes/add")
            .send(newRoute);
    });
    afterAll(async() => {
        await request(baseUrl).delete(
            `api/busroutes/delete/${busData.body._id}`,
        );
    });

    it("should return 200 if newInspect exists", async() => {
        const res = await request(baseUrl).get("/api/busroutes/all");
        expect(res.statusCode).toEqual(200);
        expect(res.body.error).not.toBe(null);
    });

    it("should return data", async() => {
        const res = await request(baseUrl).get(
            `/api/busroutes/${busData.body._id}`,
        );
        expect(res.body.data).not.toBe(null);
    });
});