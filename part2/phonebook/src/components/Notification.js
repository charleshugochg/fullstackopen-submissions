import React from 'react';

const Notification = ({message, error}) => (
  <>
  {message &&
    <div className="noti">
      {message}
    </div>
  }
  {error &&
    <div className="error">
      {error}
    </div>
  }
  </>
)

export default Notification
