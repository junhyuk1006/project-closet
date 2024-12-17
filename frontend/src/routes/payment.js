const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/approve", async (req, res) => {
    const { merchantPayKey } = req.body;

    try {
        // 네이버페이 승인 API 호출
        const response = await axios.post("https://api.naverpay.com/v1/approve", {
            merchantPayKey,
        });

        if (response.data.success) {
            res.json({ success: true, message: "결제가 승인되었습니다." });
        } else {
            res.status(400).json({ success: false, message: "결제 승인 실패" });
        }
    } catch (error) {
        console.error("결제 승인 API 호출 오류:", error);
        res.status(500).json({ success: false, message: "결제 승인 중 오류 발생" });
    }
});

module.exports = router;