import { Table } from 'react-bootstrap';
const Stock = () => {
  return (
    <div>
      <h2>재고</h2>
      <p>재고 페이지 입니다!</p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Header</th>
            <th>Header</th>
            <th>Header</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Stock;
