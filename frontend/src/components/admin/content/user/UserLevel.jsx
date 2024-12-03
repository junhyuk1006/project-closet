import React from 'react';
import { Table, Form, Button } from 'react-bootstrap';

const UserLevel = () => {
  return (
    <div>
      <h2>회원 등급 관리</h2>
      <p>회원 등급 관리 페이지입니다.</p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>레벨명</th>
            <th>할인율</th>
            <th>비고</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(9)].map((_, idx) => (
            <tr key={idx}>
              <td>
                <Form.Control
                  type="text"
                  placeholder="레벨명 입력"
                  defaultValue={
                    idx === 0
                      ? '일반회원'
                      : idx === 1
                        ? '우수회원'
                        : idx === 2
                          ? '특별회원'
                          : ''
                  }
                />
              </td>
              <td>
                <Form.Group className="d-flex align-items-center">
                  <Form.Control
                    type="number"
                    placeholder="0"
                    min="0"
                    max="100"
                    style={{ width: '70px', marginRight: '5px' }}
                  />
                  <span>%</span>
                </Form.Group>
              </td>
              <td>
                <Form.Control
                  type="text"
                  placeholder="비고 입력"
                  defaultValue={
                    idx === 0
                      ? '쇼핑몰 이용회원 (최하위)'
                      : idx === 8
                        ? '최고 관리자'
                        : '가맹점 회원'
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="text-center mt-3">
        <Button variant="primary">저장</Button>
      </div>
    </div>
  );
};

export default UserLevel;
