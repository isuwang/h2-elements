import {banks, companies} from "./data.js";

MockDataPool.when("GET", "/init.do")
    .responseWith({
        status: 200,
        body: JSON.stringify(banks)
    });


MockDataPool.when("GET", "/query.do")
    .responseWith({
        status: 200, body: JSON.stringify(companies)
    });