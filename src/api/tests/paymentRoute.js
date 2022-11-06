const request = require("supertest");
const baseUrl = "http://localhost:5000";
let paymentData = {};
describe(`Bus`, () => {
    const newPay = {
        email: "pasan@gmail.com",
        amount: "1250",
        method: "Visa",
        cardNumber: "111546478256",
        cvv: "454",
        expDate: "12/15",
    };

    beforeAll(async() => {
        paymentData = await request(baseUrl)
            .post("/api/payment/add")
            .send(newPay);
    });
    afterAll(async() => {
        await request(baseUrl).delete(
            `/api/payment/delete/${paymentData.body._id}`,
        );
    });

    it("should return 200 if newInspect exists", async() => {
        const res = await request(baseUrl).get("/api/payment/all");
        expect(res.statusCode).toEqual(200);
        expect(res.body.error).not.toBe(null);
    });

    it("should return data", async() => {
        const res = await request(baseUrl).get(
            `/api/payment/${paymentData.body._id}`,
        );
        expect(res.body.data).not.toBe(null);
    });
});