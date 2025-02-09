import crypto from "crypto";
import https from "https";

export default function handler(req, res) {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const { cartTotalPrice } = req.body;

        const accessKey = process.env.NEXT_MOMO_ACCESS_KEY;
        const secretKey = process.env.NEXT_MOMO_SECRET_KEY;
        const partnerCode = process.env.NEXT_MOMO_PARTNER_CODE;

        const orderId = partnerCode + new Date().getTime();
        const requestId = orderId;
        const amount = cartTotalPrice;
        const orderInfo = "Thanh toán qua ATM";
        const redirectUrl = `${req.headers.origin}`;
        const ipnUrl = `${req.headers.origin}/api/momo-ipn`;
        // const requestType = "captureWallet";
        const requestType = "payWithATM";
        const extraData = "";

        const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
        const signature = crypto.createHmac("sha256", secretKey).update(rawSignature).digest("hex");

        const requestBody = JSON.stringify({
            partnerCode,
            partnerName: "Test",
            storeId: "MomoTestStore",
            requestId,
            amount,
            orderId,
            orderInfo,
            redirectUrl,
            ipnUrl,
            lang: "vi",
            requestType,
            extraData,
            signature,
        });

        const options = {
            hostname: "test-payment.momo.vn",
            port: 443,
            path: "/v2/gateway/api/create",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(requestBody),
            },
        };

        const momoReq = https.request(options, (momoRes) => {
            let data = "";
            momoRes.on("data", (chunk) => { data += chunk; });
            momoRes.on("end", () => { res.status(200).json(JSON.parse(data)); });
        });

        momoReq.on("error", (e) => { res.status(500).json({ message: e.message }); });

        momoReq.write(requestBody);
        momoReq.end();

    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
}


export const config = {
    api: {
        externalResolver: true,
    },
};




/////Pay with methods: tổng hợp nhiều method nhưng chỉ sử dụng được với keys momo cung cấp.


// import crypto from "crypto";
// import https from "https";

// export default function handler(req, res) {
//     if (req.method !== "POST") {
//         res.setHeader("Allow", "POST");
//         return res.status(405).json({ message: "Method Not Allowed" });
//     }

//     try {
//         const { cartTotalPrice } = req.body;

//         var accessKey = 'F8BBA842ECF85';
//         var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';

//         var partnerCode = 'MOMO';

//         if (!accessKey || !secretKey || !partnerCode) {
//             return res.status(500).json({ message: "Missing Momo API keys" });
//         }

//         const orderId = partnerCode + new Date().getTime();
//         const requestId = orderId;
//         const amount = cartTotalPrice;

//         const orderInfo = "Thanh toán đơn hàng Momo";
//         const redirectUrl = ${req.headers.origin};
//         const ipnUrl = ${req.headers.origin}/api/momo-ipn;
//         const requestType = "payWithMethod";
//         const extraData = "";

//         const paymentCode = "";
//         const orderGroupId = "";
//         const autoCapture = true;
//         const lang = "vi";

//         // Raw Signature and hash
//         const rawSignature = accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType};
//         const signature = crypto.createHmac("sha256", secretKey).update(rawSignature).digest("hex");

//         console.log("Signature key:", signature);

//         // Request body gửi đến MoMo
//         const requestBody = JSON.stringify({
//             partnerCode,
//             partnerName: "Test",
//             storeId: "MomoTestStore",
//             requestId,
//             amount,
//             orderId,
//             orderInfo,
//             redirectUrl,
//             ipnUrl,
//             lang,
//             requestType,
//             autoCapture,
//             extraData,
//             orderGroupId,
//             signature,
//             paymentCode,
//         });

//         // Create Https request
//         const options = {
//             hostname: "test-payment.momo.vn",
//             port: 443,
//             path: "/v2/gateway/api/create",
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Content-Length": Buffer.byteLength(requestBody),
//             },
//         };

//         const momoReq = https.request(options, (momoRes) => {
//             let data = "";

//             momoRes.on("data", (chunk) => {
//                 data += chunk;
//             });

//             momoRes.on("end", () => {
//                 try {
//                     const responseData = JSON.parse(data);
//                     res.status(200).json(responseData);
//                 } catch (error) {
//                     res.status(500).json({ message: "Lỗi parse JSON từ Momo" });
//                 }
//             });
//         });

//         momoReq.on("error", (e) => {
//             res.status(500).json({ message: e.message });
//         });

//         momoReq.write(requestBody);
//         momoReq.end();

//     } catch (error) {
//         res.status(error.statusCode || 500).json(error.message);
//     }
// }

// export const config = {
//     api: {
//         externalResolver: true,
//     },
// }; 
