import { Route, Routes } from 'react-router-dom';
import HomeAdmin from './adminDetail/HomeAdmin';
import UserAdmin from './adminDetail/UserAdmin';
import OrderAdmin from './adminDetail/OrderAdmin';
import ItemAdmin from './adminDetail/ItemAdmin';
import PageAdmin from './adminDetail/PageAdmin';

const Admin = () => {
  return (
    <Routes>
      <Route index element={<HomeAdmin />} />
      <Route path="user" element={<UserAdmin />} />
      <Route path="order" element={<OrderAdmin />} />
      <Route path="item" element={<ItemAdmin />} />
      <Route path="page" element={<PageAdmin />} />
    </Routes>
  );
};

export default Admin;
