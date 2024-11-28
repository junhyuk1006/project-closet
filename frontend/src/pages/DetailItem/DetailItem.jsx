import React, { useState } from "react";
import FetchItemAllData from "../../api/item/DetailAllItem";
import "../../assets/styles/DetailItem/DetailItem.css";

function ItemList() {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(0);



    const handleItemClick = (item) => {
        setSelectedItem(item);
        setSelectedColor("");
        setSelectedSize("");
        setQuantity(0);
    };

    const handleColorChange = (e) => {
        const color = e.target.value;
        setSelectedColor(color);
        updateQuantity(color, selectedSize);
    };

    const handleSizeChange = (e) => {
        const size = e.target.value;
        setSelectedSize(size);
        updateQuantity(selectedColor, size);
    };



    const uniqueItems = items.reduce((acc, current) => {
        if (!acc.some(item => item.item_name === current.item_name)) {
            acc.push(current);
        }
        return acc;
    }, []);

    const getUniqueColors = () => {
        return [
            ...new Set(
                items
                    .filter((item) => item.item_name === selectedItem?.item_name)
                    .map((item) => item.color)
            ),
        ];
    };

    const updateQuantity = (color, size) => {
        const matchedItem = items.find(
            (item) =>
                item.item_name === selectedItem?.item_name &&
                item.color === color &&
                item.size === size
        );
        setQuantity(matchedItem ? matchedItem.item_count : 0);
    };

    const handleQuantityChange = (e) => {
        const inputQuantity = parseInt(e.target.value, 10);
        if (inputQuantity > quantity) {
            alert(`최대 수량은 ${quantity}개입니다.`);
        }
    };

    return (
        <div>
            <h1>상품 목록</h1>
            <FetchItemAllData onItemFetch={setItems} />

            <table className="item-table">
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
                            <button
                                onClick={() => handleItemClick(item)}
                                aria-label="상세보기"
                            >
                                상세보기
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedItem && (
                <div className="item-details">
                    <h2>상품 상세정보</h2>
                    <table className="detail-table">
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
                                <select
                                    value={selectedColor}
                                    onChange={handleColorChange}
                                    aria-label="색상 선택"
                                >
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
                                <select
                                    value={selectedSize}
                                    onChange={handleSizeChange}
                                    aria-label="사이즈 선택"
                                >
                                    <option value="">사이즈 선택</option>
                                    {items
                                        .filter(
                                            (item) =>
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
                                    min="0"
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