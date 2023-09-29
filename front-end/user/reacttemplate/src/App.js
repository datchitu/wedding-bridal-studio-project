import './App.css';

import "./assets/bootstrap-5.3.0/css/bootstrap.min.css"
import "./assets/fonts/fontawesome 6.3.0/css/all.min.css"
import Headers from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login'
import Cart from './components/Cart'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import VariantServiceDetail from './components/VariantServiceDetail';
import Payment from './components/PaymentComponents/PaymentComponent';
import Register from './components/RegisterComponents/RegisterComponent';
import InfomationUserComponent from './components/InfomationUserComponents/InfomationUserComponent';
import ChangePasswordComponent from './components/ChangePasswordComponents/ChangePasswordComponent';
import HistoryPaymentComponent from './components/HistoryPaymentComponents/HistoryPaymentComponent';
import HistoryPaymentDetail from './components/HistoryPaymentComponents/HistoryPaymentDetail';



function App() {
  return (
    <>
    <Router>
      <Headers />
        <Routes>
          <Route exact path="/"  element={<Home />}/>
          <Route exact path="/page/:num"  element={<Home />}/>
          <Route exact path="/category/:serviceId"  element={<Home />}/>
          <Route exact path="/result/:keywordSearch"  element={<Home />}/>
          <Route exact path="/cart" element={<Cart />}/>
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/register" element={<Register />}/>
          <Route exact path="/variant-service-detail" element={<VariantServiceDetail />}/>
          <Route exact path="/variant-service-detail/:id" element={<VariantServiceDetail />}/>
          <Route exact path="/payment" element={<Payment />}/>
          <Route exact path="/infomation-user" element={<InfomationUserComponent />}/>
          <Route exact path="/change-password" element={<ChangePasswordComponent />}/>
          <Route exact path="/history-payment" element={<HistoryPaymentComponent />}/>
          <Route exact path="/history-payment-detail" element={<HistoryPaymentDetail />}/>
          <Route exact path="/history-payment-detail/:transactionId" element={<HistoryPaymentDetail />}/>
        </Routes>
      <Footer />
    </Router>
    </>
  );
}


export default App;
