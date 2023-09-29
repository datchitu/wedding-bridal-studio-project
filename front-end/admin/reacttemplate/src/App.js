import './App.css';

import "./assets/bootstrap-5.3.0/css/bootstrap.min.css"
import "./assets/fonts/fontawesome 6.3.0/css/all.min.css"
import Headers from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import InfomationUserComponent from './components/InfomationUserComponents/InfomationUserComponent';
import ChangePasswordComponent from './components/ChangePasswordComponents/ChangePasswordComponent';
import CategoryComponent from './components/Admin/CategoryComponents/CategoryComponent';
import UpdateCategory from './components/Admin/CategoryComponents/UpdateCategory';
import AddCategory from './components/Admin/CategoryComponents/AddCategory';
import ServiceComponent from './components/Admin/ServiceComponents/ServiceComponent';
import UpdateService from './components/Admin/ServiceComponents/UpdateService';
import AddService from './components/Admin/ServiceComponents/AddService';
import VariantvariantServiceComponent from './components/Admin/VariantServiceComponents/VariantServiceComponent';
import UpdatevariantService from './components/Admin/VariantServiceComponents/UpdateVariantService';
import AddVariantvariantService from './components/Admin/VariantServiceComponents/AddVariantService';
import VoucherComponent from './components/Admin/VoucherComponents/VoucherComponent';
import UpdateVoucher from './components/Admin/VoucherComponents/UpdateVoucher';
import AddVoucher from './components/Admin/VoucherComponents/AddVoucher';
import UserComponent from './components/Admin/UserComponents/UserComponent';
import AddUser from './components/Admin/UserComponents/AddUser';
import TransactionComponent from './components/Admin/TransactionComponents/TransactionComponent';
import TransactionDetail from './components/Admin/TransactionComponents/TransactionDetail';



function App() {
  return (
    <>
    <Router>
      <Headers />
        <Routes>
          <Route exact path="/"  element={<Home />}/>
          <Route exact path="/list-user"  element={<UserComponent />}/>
          <Route exact path="/add-user"  element={<AddUser />}/>
          <Route exact path="/list-category"  element={<CategoryComponent />}/>
          <Route exact path="/add-category"  element={<AddCategory />}/>
          <Route exact path="/update-category"  element={<UpdateCategory />}/>
          <Route exact path="/update-category/:id"  element={<UpdateCategory />}/>
          <Route exact path="/list-service"  element={<ServiceComponent />}/>
          <Route exact path="/add-service"  element={<AddService />}/>
          <Route exact path="/update-service"  element={<UpdateService />}/>
          <Route exact path="/update-service/:id"  element={<UpdateService />}/>
          <Route exact path="/list-variant-service"  element={<VariantvariantServiceComponent />}/>
          <Route exact path="/update-variant-service"  element={<UpdatevariantService />}/>
          <Route exact path="/update-variant-service/:id"  element={<UpdatevariantService />}/>
          <Route exact path="/add-variant-service"  element={<AddVariantvariantService />}/>
          <Route exact path="/list-voucher"  element={<VoucherComponent />}/>
          <Route exact path="/add-voucher"  element={<AddVoucher />}/>
          <Route exact path="/update-voucher"  element={<UpdateVoucher />}/>
          <Route exact path="/update-voucher/:id"  element={<UpdateVoucher />}/>
          <Route exact path="/list-transaction"  element={<TransactionComponent />}/>
          <Route exact path="/transaction-detail" element={<TransactionDetail />}/>
          <Route exact path="/transaction-detail/:transactionId" element={<TransactionDetail />}/>
          <Route exact path="/infomation-user" element={<InfomationUserComponent />}/>
          <Route exact path="/change-password" element={<ChangePasswordComponent />}/>
        </Routes>
      <Footer />
    </Router>
    </>
  );
}


export default App;
