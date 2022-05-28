import { AlertContext } from "./AlertContext";
import React from 'react';
function statusTogglerAlert() {
  return(
  <AlertContext.Consumer>
    {({ icon, text, toggleState }) => (
      <div className={"messageAlert" + (text !== "" ? "" : " hideAny")}>
        <i className={"fa-solid " + icon} />
        {text}
      </div>
    )}
  </AlertContext.Consumer>)
}

export default statusTogglerAlert;
