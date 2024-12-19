import React, { useState } from 'react';
import { Dropdown, Modal, Button } from 'react-bootstrap';

export default function Alarm() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // 이전에 제시한 화상회의 HTML 코드(바디 부분)를 문자열로 삽입
  const htmlContent = `
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="page-header">
            <h1>화상회의
              <button class="btn btn-default" autocomplete="off" id="start">Start</button>
            </h1>
          </div>
          <div class="container" id="details">
            <div class="row">
              <div class="col-md-12">
                <h3>Start 버튼을 누르고 데모를 시작하세요</h3>
                <h4>채팅방 ID로 기존 채팅방을 연결하거나 새로 생성합니다.</h4>
                <h4>* ID는 영문 또는 숫자로 입력해야 합니다.</h4>
              </div>
            </div>
          </div>
          <div class="container hide" id="videojoin">
            <div class="row">
              <div class="col-md-12" id="controls">
                <div id="registernow">
                  <span class="label label-info" id="room"></span>
                  <div class="input-group margin-bottom-md " style="width: 100% !important;">
                    <input autocomplete="off" class="form-control" type="text" placeholder="Room Name" id="roomname" />
                  </div>
                  <span class="label label-info" id="you"></span>
                  <div class="input-group margin-bottom-md ">
                    <span class="input-group-addon">대화명</span>
                    <input autocomplete="off" class="form-control" type="text" placeholder="My Name" id="username" />
                    <span class="input-group-btn">
                      <button class="btn btn-success" autocomplete="off" id="register">대화방 참여</button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="container hide" id="videos">
            <div class="row">
              <div class="col-md-4">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h3 class="panel-title">Local Video <span class="label label-primary hide" id="publisher"></span></h3>
                  </div>
                  <div class="panel-body" id="videolocal"></div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h3 class="panel-title">Remote Video #1 <span class="label label-info hide" id="remote1"></span></h3>
                  </div>
                  <div class="panel-body relative" id="videoremote1"></div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h3 class="panel-title">Remote Video #2 <span class="label label-info hide" id="remote2"></span></h3>
                  </div>
                  <div class="panel-body relative" id="videoremote2"></div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h3 class="panel-title">Remote Video #3 <span class="label label-info hide" id="remote3"></span></h3>
                  </div>
                  <div class="panel-body relative" id="videoremote3"></div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h3 class="panel-title">Remote Video #4 <span class="label label-info hide" id="remote4"></span></h3>
                  </div>
                  <div class="panel-body relative" id="videoremote4"></div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h3 class="panel-title">Remote Video #5 <span class="label label-info hide" id="remote5"></span></h3>
                  </div>
                  <div class="panel-body relative" id="videoremote5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <div class="footer"></div>
    </div>
  `;

  return (
      <>
        <Dropdown autoClose={'inside'}>
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
              <span style={{ color: '#06F', fontWeight: 'bold' }}>[알림]</span>{' '}
              예약하신 상담 시간이 곧 시작됩니다!
              <br />
              잊지 말고 시간에 맞춰 준비해주세요.
              <br />
              상담 일정:{' '}
              <span style={{ fontWeight: 'bold' }}>2024년 12월 24일 14:00</span>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="/shop">
              <span style={{ color: '#06F', fontWeight: 'bold' }}>[알림]</span>{' '}
              고객님의 주문이 배송을 시작했습니다!
              <br />
              주문 번호: <span style={{ fontWeight: 'bold' }}>1234 12345</span>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleShowModal}>
              <span style={{ color: '#06f', fontWeight: 'bold' }}>[알림]</span>{' '}
              코디네이트 예약일 입니다. 화면을 클릭해주세요
              <br />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* Modal 부분 */}
        <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>화상회의</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* 여기서 dangerouslySetInnerHTML로 HTML 삽입 */}
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              닫기
            </Button>
          </Modal.Footer>
        </Modal>
      </>
  );
}