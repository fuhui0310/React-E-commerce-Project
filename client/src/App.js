import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './components/header/header.component.jsx';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';
import { createStructuredSelector } from 'reselect';

import { GlobalStyles } from './global.styles';

const HomePage = lazy(() => import('./pages/homepage/homepage.component.jsx'));
const ShopPage = lazy(() => import('./pages/shop/shop.component.jsx'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component.jsx'));
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.componment.jsx'));


const App = ({ checkUserSession, currentUser }) => {

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  // componentDidMount(){
  //   const { checkUserSession } = this.props;
  //   checkUserSession();
  //   // const {setCurrentUser} = this.props;

  //   // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
  //   //   if (userAuth) {
  //   //     const userRef = await createUserProfileDocument(userAuth);

  //   //     userRef.onSnapshot(snapShot => {
  //   //         setCurrentUser({
  //   //           id: snapShot.id,
  //   //           ...snapShot.data()
  //   //         });
  //   //     });
  //   //   }

  //   // setCurrentUser( userAuth );
  //   // });
  // }

  return (
    <div>
    <GlobalStyles />
    <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
              <Route exact path='/' component={HomePage} />
              <Route path='/shop' component={ShopPage} />
              <Route exact path='/checkout' component={CheckoutPage} />
              <Route 
                exact 
                path='/signin' 
                render={() => 
                  currentUser ? (
                      <Redirect to ='/' /> 
                    ) : (
                      <SignInAndSignUpPage/>
                      )
                  } 
                />
              </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
