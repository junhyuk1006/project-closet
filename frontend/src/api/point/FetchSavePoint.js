export const savePoint = async (PointData) => {
    try {
        const response = await fetch(`http://localhost:80/api/point/saveReviewPoint`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(PointData),
        });

        if (!response.ok) {
            throw new Error("Failed to save point");
        }

        const result = await response.text();
        console.log("Save point result", result);
    } catch (error) {
        console.error("Error saving point:", error);
    }
};