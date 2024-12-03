import { Table, Button, Form } from 'react-bootstrap';
const ExcelItem = () => {
  return (
    <div>
      <h2>엑셀 등록</h2>
      <p>엑셀 등록 페이지입니다.</p>
      <Table bordered>
        <tbody>
          <tr>
            <td>샘플 파일 다운</td>
            <td>
              <Button
                variant="primary"
                onClick={() => alert('샘플 파일 다운로드')}
              >
                샘플파일 다운로드
              </Button>
            </td>
          </tr>
          <tr>
            <td>파일 업로드</td>
            <td>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control type="file" />
              </Form.Group>
            </td>
          </tr>
        </tbody>
      </Table>
      <Button variant="dark" onClick={() => alert('상품 등록 처리')}>
        상품 일괄 등록
      </Button>
    </div>
  );
};

export default ExcelItem;
