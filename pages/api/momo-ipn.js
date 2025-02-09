import crypto from "crypto";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const secretKey = process.env.NEXT_MOMO_SECRET_KEY; // Secret key của bạn
        const {
            partnerCode,
            orderId,
            requestId,
            amount,
            orderInfo,
            orderType,
            transId,
            resultCode,
            message,
            payType,
            responseTime,
            extraData,
            signature,
        } = req.body;

        console.log("IPN Received:", req.body);

        const rawSignature = `accessKey=Ekj9og2VnRfOuIys&amount=${amount}&extraData=${extraData}&orderId=${orderId}&orderInfo=${orderInfo}&orderType=${orderType}&partnerCode=${partnerCode}&requestId=${requestId}&responseTime=${responseTime}&resultCode=${resultCode}&transId=${transId}`;
        const expectedSignature = crypto.createHmac("sha256", secretKey).update(rawSignature).digest("hex");

        if (signature !== expectedSignature) {
            return res.status(400).json({ message: "Invalid signature!" });
        }

        // **2. Xử lý kết quả giao dịch**
        if (resultCode === 0) {
            console.log(`💰 Thanh toán thành công! OrderId: ${orderId}, Amount: ${amount}`);
            return res.status(200).json({ message: "Transaction successful" });
            
            // ✅ TODO: Cập nhật database, đánh dấu đơn hàng đã thanh toán
        } else {
            console.log(`❌ Thanh toán thất bại! OrderId: ${orderId}, Lỗi: ${message}`);
            return res.status(400).json({ message: "Transaction failed" });
            // ✅ TODO: Xử lý khi thanh toán thất bại (có thể lưu trạng thái vào DB)
        }

    } catch (error) {
        console.error("Lỗi xử lý IPN:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
