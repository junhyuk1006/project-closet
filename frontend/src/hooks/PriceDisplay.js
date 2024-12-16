const PriceDisplay = ({ price }) => {
    // 금액을 한국 원화 형식으로 변환
    const formattedPrice = new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW',
        maximumFractionDigits: 0, // 소수점 제거
    }).format(price);

    return <div>{formattedPrice}</div>;
};

export default PriceDisplay;