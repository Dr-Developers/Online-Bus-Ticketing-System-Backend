const request = require("supertest");
const baseUrl = "http://localhost:5000";
let userData = {};
describe(`Register`, () => {
    const newUser = {
        name: "Malsha Jayakody",
        email: "mal2022@gmail.com",
        nicType: "Passport",
        number: "200012563458",
        phoneNumber: "0715963150",
        username: "Mal",
        password: "mal123",
        type: "Passenger",
    };

    beforeAll(async() => {
        userData = await request(baseUrl)
            .post("/api/user/add")
            .send(newUser);
    });
    afterAll(async() => {
        await request(baseUrl).delete(
            `api/user/delete/${userData.body._id}`,
        );
    });

    it("should return 200 if newInspect exists", async() => {
        const res = await request(baseUrl).get("/api/user");
        expect(res.statusCode).toEqual(200);
        expect(res.body.error).not.toBe(null);
    });

    it("should return data", async() => {
        const res = await request(baseUrl).get(
            `/api/user/${userData.body._id}`,
        );
        expect(res.body.data).not.toBe(null);
    });
});