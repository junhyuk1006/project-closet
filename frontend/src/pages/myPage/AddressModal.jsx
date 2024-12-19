import React, { useState } from 'react';

const AddressModal = ({ onClose, onAddressSelect }) => {
  const [postcode, setPostcode] = useState('');
  const [roadAddress, setRoadAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');

  const openPostcode = () => {
    new window.daum.Postcode({
      oncomplete: (data) => {
        setPostcode(data.zonecode);
        setRoadAddress(data.roadAddress);
      },
    }).open();
  };

  const handleSave = () => {
    const fullAddress = `${roadAddress} ${detailAddress}`;
    onAddressSelect(fullAddress); // 주소 전달
    onClose(); // 모달 닫기
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>배송지 등록</h3>
        <div>
          <label>우편번호</label>
          <div style={{ display: 'flex', marginBottom: '8px' }}>
            <input type="text" value={postcode} readOnly style={styles.input} />
            <button onClick={openPostcode} style={styles.button}>
              우편번호 검색
            </button>
          </div>

          <label>도로명 주소</label>
          <input
            type="text"
            value={roadAddress}
            readOnly
            style={{ ...styles.input, marginBottom: '8px' }}
          />

          <label>상세 주소</label>
          <input
            type="text"
            value={detailAddress}
            onChange={(e) => setDetailAddress(e.target.value)}
            placeholder="상세 주소를 입력하세요"
            style={styles.input}
          />
        </div>
        <div style={{ textAlign: 'right', marginTop: '10px' }}>
          <button onClick={handleSave} style={styles.button}>
            저장
          </button>
          <button onClick={onClose} style={styles.button}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '8px',
    boxSizing: 'border-box',
  },
  button: {
    marginLeft: '5px',
    padding: '6px 12px',
    cursor: 'pointer',
  },
};

export default AddressModal;
