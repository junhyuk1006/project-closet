export const fetchTests = async () => {
    try {
        const response = fetch("http://localhost:80/api/test"); // API 호출
        const data = await response.json(); // JSON 파싱
        return data; // 데이터를 반환
    } catch (error) {
        console.error("Error fetching data:", error);
        return []; // 에러 발생 시 빈 배열 반환
    }
};

export default fetchTests();