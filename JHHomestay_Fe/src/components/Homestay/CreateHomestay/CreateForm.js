import React from "react";

import InformationForm from "./InformationForm";
import ServiceForm from "./ServiceForm";
import AmenityForm from "./AmenityForm";
import GeneralServiceForm from "./GeneralServiceForm";
import Images from "./Images";

const CreateForm = (props) => {
    return (          
        <div className="m-4">
            <InformationForm 
                inforProps={props.inforProps} 
                state={props.state}
            />
            <AmenityForm amenityProps={props.amenityProps} />
            <GeneralServiceForm generalProps={props.generalProps} />
            <ServiceForm serviceProps={props.serviceProps} />
            <Images 
                imageProps={props.imageProps} 
                oldImages={props.oldImages} 
                setNewOldImages={props.setNewOldImages}
            />
        </div>
    );
  };
  
export default CreateForm;
  