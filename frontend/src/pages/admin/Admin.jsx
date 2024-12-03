import { Route, Routes } from 'react-router-dom';
import HomeAdmin from './adminDetail/HomeAdmin';
import UserAdmin from './adminDetail/UserAdmin';
import OrderAdmin from './adminDetail/OrderAdmin';
import ItemAdmin from './adminDetail/ItemAdmin';

const Admin = () => {
  return (
    <Routes>
      <Route index element={<HomeAdmin />} />
      <Route path="user" element={<UserAdmin />} />
      <Route path="order" element={<OrderAdmin />} />
      <Route path="item" element={<ItemAdmin />} />
    </Routes>
  );
};

export default Admin;
