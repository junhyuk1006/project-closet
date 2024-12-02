import { Table } from 'react-bootstrap';

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <hr />
      <div
        style={{ height: '300px', background: '#f5f5f5', marginBottom: '20px' }}
      >
        <h5>Graph Area</h5>
      </div>
      <h4>Section title</h4>
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

export default Dashboard;
