import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//{alerts}
const Alert = ({alerts}) => {
    // console.log("alerts props", props)
    // let alerts = [];
    if(alerts !== null && alerts.length > 0 ){
      return  alerts.map((alert) => 
        <div key={alert.id} className={`alert alert--${alert.alertType}`}>
            {alert.msg}

        </div>
      )
    }
    else {
        return (<> </>)
    }
   
}

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
}

const mapStateToProps = (state) =>{
    return {
         alerts: state.alert
    }
}
export default connect(mapStateToProps)(Alert);