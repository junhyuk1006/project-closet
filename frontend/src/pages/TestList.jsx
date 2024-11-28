import React, { useEffect, useState } from "react";

const TestList = () => {
    const [tests, setTests] = useState([]); // 데이터 상태 저장
    const [loading, setLoading] = useState(true); // 로딩 상태 저장

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const response = await fetch("http://localhost:80/api/test"); // API 호출
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json(); // JSON 파싱
                setTests(data); // 상태에 데이터 저장
                setLoading(false); // 로딩 종료
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchTests(); // 컴포넌트 로드 시 데이터 가져오기
    }, []);

    if (loading) {
        return <div>Loading...</div>; // 로딩 중일 때 표시
    }

    return (
        <div>
            <h1>Test Data</h1>
            <table border="1">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                {tests.map((test) => (
                    <tr key={test.id}>
                        <td>{test.id}</td>
                        <td>{test.email}</td>
                        <td>{test.name}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TestList;