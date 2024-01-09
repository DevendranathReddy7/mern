import React from "react";
import "./Newplaces.css";
import Input from "../../common/components/FormElements/Input/Input";

const Newplaces = (props) => {
  return (
    <form className="place-form">
      <Input
        type="text"
        label="Title"
        element="input"
        errorText="Please enter a valid input"
      />
      <Input label="Title" element="textarea" rows={3} />
    </form>
  );
};
export default Newplaces;
