"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tap_1 = require("tap");
const server_1 = require("../src/server");
(0, tap_1.test)('/', async (t) => {
    const app = await (0, server_1.build)();
    const response = await app.inject({
        method: 'GET',
        url: '/',
    });
    t.equal(response.statusCode, 200, 'returns status code 200');
    t.equal(response.body, JSON.stringify({
        success: true,
        message: 'Welcome to the API',
    }), 'returns welcome message');
});
(0, tap_1.test)('/workers', async (t) => {
    const app = await (0, server_1.build)();
    let response = await app.inject({
        method: 'GET',
        url: '/workers',
    });
    t.equal(response.statusCode, 200, 'returns status code 200');
    const id = JSON.parse(response.body).data[0].id;
    response = await app.inject({
        method: 'GET',
        url: `/workers/${id}`,
    });
    t.equal(JSON.parse(response.body).data.id, id, 'returns worker by id');
});
// shift test
(0, tap_1.test)('/shifts', async (t) => {
    const app = await (0, server_1.build)();
    let response = await app.inject({
        method: 'GET',
        url: '/workers',
    });
    const worker_id = JSON.parse(response.body).data[0].id;
    response = await app.inject({
        url: '/shifts',
        method: 'POST',
        headers: { ContentType: 'application/json' },
        payload: {
            workerId: worker_id,
            shiftTime: 'First',
            shiftDate: '2024-05-09',
        },
    });
    t.equal(JSON.parse(response.body).success, true, 'Shfit is made successfully!');
    response = await app.inject({
        method: 'GET',
        url: `/shifts/worker/${worker_id}`,
    });
    t.equal(JSON.parse(response.body).success, true, 'returns shift by worker_id');
    console.log(response);
});
