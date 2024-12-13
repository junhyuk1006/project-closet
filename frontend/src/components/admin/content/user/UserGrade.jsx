import { useEffect, useState } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import { getGrade, updateGrade } from '../../../../api/admin/user/user';

const UserGrade = () => {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = () => {
    getGrade()
      .then((response) => {
        setGrades(response);
      })
      .catch((error) => console.error(error));
  };

  const handleSave = () => {
    const updateGrades = Array.from(document.querySelectorAll('tbody tr')).map(
      (row, idx) => {
        const cells = row.querySelectorAll('input');
        return {
          id: grades[idx]?.id || null,
          grade: cells[0].value,
          rate: parseInt(cells[1].value, 10) || 0,
          gradeDescription: cells[2].value,
        };
      }
    );
    // .filter((grade) => grade.grade !== '');
    updateGrade(updateGrades);
    alert('저장되었습니다!');
    fetchGrades();
  };

  return (
    <div>
      <h2>회원 등급 관리</h2>
      <p>회원 등급 관리 페이지입니다.</p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>레벨명</th>
            <th>포인트 지급률</th>
            <th>비고</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(9)].map((_, idx) => {
            const grade = grades[idx] || {};
            return (
              <tr key={idx}>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="레벨명 입력"
                    defaultValue={grade.grade || ''}
                  />
                </td>
                <td>
                  <Form.Group className="d-flex align-items-center">
                    <Form.Control
                      type="number"
                      placeholder="0"
                      min="0"
                      max="100"
                      defaultValue={grade.rate || ''}
                      style={{ width: '70px', marginRight: '5px' }}
                    />
                    <span>%</span>
                  </Form.Group>
                </td>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="비고 입력"
                    defaultValue={grade.gradeDescription || ''}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="text-center mt-3">
        <Button variant="primary" onClick={handleSave}>
          저장
        </Button>
      </div>
    </div>
  );
};

export default UserGrade;
