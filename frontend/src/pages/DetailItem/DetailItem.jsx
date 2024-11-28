import React, { useState } from "react";
import FetchItemAllData from "../../api/item/DetailAllItem";
import "../../assets/styles/DetailItem/DetailItem.css"

function ItemList() {
    const [items, setItems] = useState([]); // 아이템 데이터를 저장할 상태
    const [selectedItem, setSelectedItem] = useState(null); // 선택된 아이템
    const [selectedColor, setSelectedColor] = useState(""); // 선택된 색상
    const [selectedSize, setSelectedSize] = useState(""); // 선택된 사이즈
    const [quantity, setQuantity] = useState(0); // 입력된 수량



    /** 여기부터는 클릭과 같은 이벤트 발생 시 동작 함수들입니다
     *  보통 handle ~~ 이렇게 표현 합니다*/


    const handleItemClick = (item) => {
        setSelectedItem(item);
        setSelectedColor(""); // 색상 초기화
        setSelectedSize(""); // 사이즈 초기화
        setQuantity(0); // 수량 초기화
    };

    const handleColorChange = (e) => {
        setSelectedColor(e.target.value);
        updateQuantity(e.target.value, selectedSize); // 색상이 바뀌면 수량 업데이트
    };

    const handleSizeChange = (e) => {
        setSelectedSize(e.target.value);
        updateQuantity(selectedColor, e.target.value); // 사이즈가 바뀌면 수량 업데이트
    };


    /** 여기부터는 중복 제거하는 함수들입니다 */

    const uniqueItems = items.reduce((acc, current) => {
        const isDuplicate = acc.some(item => item.item_name === current.item_name);
        if (!isDuplicate) acc.push(current);
        return acc;
    }, []);

    const getUniqueColors = () => {
        const colors = items
            .filter((item) => item.item_name === selectedItem.item_name)
            .map((item) => item.color);
        return [...new Set(colors)]; // Set을 사용해 중복 제거
    };



    /** 여기부터는 색상과 사이즈에 해당하는 데이터(수량)를 찾는 함수입니다 */

    const updateQuantity = (color, size) => {
        // items 배열에서 선택된 색상과 사이즈에 해당하는 데이터를 찾아 수량 업데이트
        const matchedItem = items.find(
            (item) =>
                item.item_name === selectedItem.item_name &&
                item.color === color &&
                item.size === size
        );
        setQuantity(matchedItem ? matchedItem.item_count : 0); // 없으면 0으로 설정
    };



    /**여기부터는 최대 수량에 따른 조치와 관련된 코드 입니다*/

    const handleQuantityChange = (e) => {
        const inputQuantity = parseInt(e.target.value, 10);
        if (inputQuantity > quantity) {
            alert(`최대 수량은 ${quantity}개입니다.`);
        }
    };


    /** return 아래는 위에서 useState 앞쪽에 있는 변수를 가져와 사용하거나, Html 작업을 하는 곳입니다*/

    return (
        <div>
            <h1>Item List</h1>
            <FetchItemAllData onItemFetch={setItems} />

            {/* 아이템 목록 테이블 */}
            <table border="1" style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                <thead>
                <tr>
                    <th>상품명</th>
                    <th>가격</th>
                    <th>상태</th>
                    <th>상세보기</th>
                </tr>
                </thead>
                <tbody>
                {uniqueItems.map((item) => (
                    <tr key={item.id}>
                        <td>{item.item_name}</td>
                        <td>{item.item_price} 원</td>
                        <td>{item.item_status}</td>
                        <td>
                            <button onClick={() => handleItemClick(item)} style={{ cursor: "pointer" }}>
                                상세보기
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* 선택된 아이템의 상세 정보 */}
            {selectedItem && (
                <div style={{ marginTop: "20px" }}>
                    <h2>Item Details</h2>
                    <table border="1" style={{ width: "50%", borderCollapse: "collapse", margin: "0 auto" }}>
                        <tbody>
                        <tr>
                            <td><strong>상품명</strong></td>
                            <td>{selectedItem.item_name}</td>
                        </tr>
                        <tr>
                            <td><strong>분류</strong></td>
                            <td>{selectedItem.item_category}</td>
                        </tr>
                        <tr>
                            <td><strong>가격</strong></td>
                            <td>{selectedItem.item_price} 원</td>
                        </tr>
                        <tr>
                            <td><strong>색상</strong></td>
                            <td>
                                <select value={selectedColor} onChange={handleColorChange}>
                                    <option value="">색상 선택</option>
                                    {getUniqueColors().map((color, index) => (
                                        <option key={index} value={color}>
                                            {color}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>사이즈</strong></td>
                            <td>
                                <select value={selectedSize} onChange={handleSizeChange}>
                                    <option value="">사이즈 선택</option>
                                    {items
                                        .filter(
                                            item =>
                                                item.item_name === selectedItem.item_name &&
                                                item.color === selectedColor
                                        )
                                        .map((item, index) => (
                                            <option key={index} value={item.size}>
                                                {item.size}
                                            </option>
                                        ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>재고</strong></td>
                            <td>{quantity}</td>
                        </tr>
                        <tr>
                            <td><strong>수량</strong></td>
                            <td>
                                <input
                                    type="number"
                                    onChange={handleQuantityChange}
                                    style={{ width: "100%" }}
                                />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default ItemList;