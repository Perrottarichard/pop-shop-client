import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PrimarySearchAppBar from './components/PrimarySearchAppBar'
import Login from './components/Login'
import Register from './components/Register'
import DrinkDisplay from './components/DrinkDisplay';
import TShirtDisplay from './components/TShirtDisplay'
import AuthContextProvider from './contexts/AuthContext';
import CategoryMenu from './components/CategoryMenu';
import CartDisplay from './components/CartDisplay';
import Checkout from './components/Checkout';
import CheckoutContextProvider from './contexts/CheckoutContext';
import ProductContextProvider from './contexts/ProductContext';
import MyAccount from './components/MyAccount';
import RecommendedDisplay from './components/RecommendedDisplay';
import DealDisplay from './components/DealDisplay';


const App = () => {

  return (
    <AuthContextProvider>
      <CheckoutContextProvider>
        <ProductContextProvider>
          <Router>
            <div style={{ backgroundColor: '#cf2b2b', height: '100vh' }}>
              <PrimarySearchAppBar />
              <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
              <Switch>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/register">
                  <Register />
                </Route>
                <Route path="/drinks">
                  <DrinkDisplay />
                </Route>
                <Route path="/tshirts">
                  <TShirtDisplay />
                </Route>
                <Route path="/recommended">
                  <RecommendedDisplay />
                </Route>
                <Route path="/deals">
                  <DealDisplay />
                </Route>
                <Route path="/mycart">
                  <CartDisplay />
                </Route>
                <Route path="/myaccount">
                  <MyAccount />
                </Route>
                <Route path="/checkout">
                  <Checkout />
                </Route>
                <Route exact path='/'>
                  <CategoryMenu />
                </Route>
              </Switch>
            </div>
          </Router>
        </ProductContextProvider>
      </CheckoutContextProvider>
    </AuthContextProvider>
  )
}

export default App;
