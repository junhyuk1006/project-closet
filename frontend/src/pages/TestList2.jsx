import React, { useState, useEffect } from "react";
import { fetchTests } from "../fetch/fetchTests"; // 데이터 호출 로직 임포트

function TestList2() {
    const [tests, setTests] = useState([]); // 데이터 상태 저장
    const [loading, setLoading] = useState(true); // 로딩 상태 저장

    useEffect(() => {
        const loadTests = async () => {
            const data = await fetchTests(); // 분리된 데이터 호출 함수 사용
            setTests(data); // 상태에 데이터 저장
            setLoading(false); // 로딩 종료
        };

        loadTests(); // 데이터 가져오기 호출
    }, []);

    if (loading) {
        return <div>Loading...</div>; // 로딩 중일 때 표시
    }

    return (
        <div>
            <h1>Test2 Data</h1>
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
}

export default TestList2;