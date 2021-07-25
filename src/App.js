import React from "react";
import Layout from "./hocs/layout";
import {BrowserRouter as Router , Route , Switch} from "react-router-dom";
import Home from './containers/home';
import About from './containers/about';
import Contact from './containers/contact';
import Listing from './containers/listings';
import ListingDetail from './containers/listingDetail';
import SignIn from './containers/signIN';
import SignUp from './containers/signUP';
import NotFoundPage from './components/notFound';
import './sass/main.scss';

import store from "./store";
const App = () => {
   console.log(store);
  return (
   
  //  <Provider  store={store} >
    <Router>
      <Layout >
        <Switch>
         
          <Route path="/login" component={SignIn} exact/>
          <Route path="/signup" component={SignUp} exact/>
          <Route path="/about" component={About} exact/>
          <Route path="/contact" component={Contact} exact/>
          <Route path="/listings" component={Listing} exact/>
          <Route path="/listings/:id" component={ListingDetail} exact/>
           <Route path="/" component={Home} exact/>
          <Route  component={NotFoundPage} exact/>
          
        </Switch>
      </Layout>
   </Router>
 
  //  </Provider>
 );
}
 
export default App;

