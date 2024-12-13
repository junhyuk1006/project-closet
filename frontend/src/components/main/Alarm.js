import { Dropdown } from 'react-bootstrap';

export default function Alarm() {
  return (
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
        <Dropdown.Item href="/shop">
          <span style={{ color: '#06f', fontWeight: 'bold' }}>[알림]</span>{' '}
          <span style={{ color: '#f44' }}>환불 요청</span>에 대한 답변이
          완료되었습니다.
          <br />
          상세 내용은 고객센터 페이지에서 확인해주세요.
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
