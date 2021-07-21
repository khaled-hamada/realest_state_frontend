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
import { Provider } from "react-redux"; 
import Store from "./store";
const App = () => {
  return (
   <Provider  store={Store} >
    <Router>
      <Layout >
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/login" component={SignIn} exact/>
          <Route path="/signup" component={SignUp} exact/>
          <Route path="/about" component={About} exact/>
          <Route path="/contact" component={Contact} exact/>
          <Route path="/listings" component={Listing} exact/>
          <Route path="/listings/:id" component={ListingDetail} exact/>
          <Route  component={NotFoundPage} exact/>
          
        </Switch>
      </Layout>
   </Router>
 
   </Provider>
 );
}
 
export default App;

