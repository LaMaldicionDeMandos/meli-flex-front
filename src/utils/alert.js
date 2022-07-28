import React from "react";

const  alert = (notificationAlertRef, message, type = 'info', icon = '', place = 'tc') => {
  const options = {
    place: place,
    message: (
      <span>
              {message}
            </span>
    ),
    type: type,
    icon: `tim-icons ${icon}`,
    autoDismiss: 3,
  };
  notificationAlertRef.current.notificationAlert(options);
}

export default alert;
