import React, { useState } from "react";
import { Dropdown, Modal, Button } from "react-bootstrap";
import Draggable from "react-draggable"; // Draggable 라이브러리 임포트
import Videoroomtest from "../../pages/Videoroomtest"; // Videoroomtest 컴포넌트 임포트


export default function Alarm() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
      <>
        <Dropdown autoClose={"inside"}>
          <Dropdown.Toggle variant="" id="">
            <div
                className="icon-header-item cl2 hov-cl1 trans-04 p-l-20 p-r-12 icon-header-noti"
                data-notify="3"
            >
              <i className="zmdi zmdi-notifications-none"></i>
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="/shop">
              <span style={{ color: "#06F", fontWeight: "bold" }}>[알림]</span>{" "}
              예약하신 상담 시간이 곧 시작됩니다!
              <br />
              잊지 말고 시간에 맞춰 준비해주세요.
              <br />
              상담 일정:{" "}
              <span style={{ fontWeight: "bold" }}>2024년 12월 24일 14:00</span>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="/shop">
              <span style={{ color: "#06F", fontWeight: "bold" }}>[알림]</span>{" "}
              고객님의 주문이 배송을 시작했습니다!
              <br />
              주문 번호: <span style={{ fontWeight: "bold" }}>1234 12345</span>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleShowModal}>
              <span style={{ color: "#06f", fontWeight: "bold" }}>[알림]</span>{" "}
              코디네이트 예약일 입니다. 화면을 클릭해주세요
              <br />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* Modal 부분 */}
        {showModal && (
            <Draggable>
              <Modal
                  show={showModal}
                  onHide={handleCloseModal}
                  centered
                  size="lg"
                  backdrop={false} // 모달 외부 클릭 가능
                  keyboard={false} // Esc 키로 닫히지 않음
                  dialogClassName="draggable-modal" // CSS 스타일 추가
              >
                <Modal.Header closeButton>
                  <Modal.Title>코디네이터 상담</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {/* Videoroomtest 컴포넌트를 삽입 */}
                  <Videoroomtest />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseModal}>
                    닫기
                  </Button>
                </Modal.Footer>
              </Modal>
            </Draggable>
        )}
      </>
  );
}