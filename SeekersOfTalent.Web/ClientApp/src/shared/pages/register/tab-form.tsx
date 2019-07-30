import React, { Fragment } from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import SkillForm from './skill-form'
import { SkillViewModel } from '../../../_view_model/skill';
import { EducationViewModel } from '../../../_view_model/education';
import { EmploymentViewModel } from '../../../_view_model/emoployment';
import EducationForm from "./education-form";
import EmploymentForm from "./employment-form";
import {UserProfileRequest} from "../../../_view_model/user-information";
import PortfoleoForm from "./portfoleo-form";

interface IProps{
    userData : UserProfileRequest
    changeBinder : (userData : UserProfileRequest)=>void
}

function TabFormFields(props : IProps) {
  const [value, setValue] = React.useState(0);

  function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    setValue(newValue);
  }

  return (
    <Fragment>
      {/* <AppBar position="static"  color="default"> */}
        <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
        >
          <Tab label="Skill" />
          <Tab label="Education" />
          <Tab label="Employment" />
          <Tab label="POrtfoleo" />
        </Tabs>
      {/* </AppBar> */}
        {value == 0 && <SkillForm userData={props.userData} changeBinder={props.changeBinder} />}
        {value == 1 && <EducationForm userData={props.userData} changeBinder={props.changeBinder}/>}
        {value == 2 && <EmploymentForm userData={props.userData} changeBinder={props.changeBinder}/>}
        {value == 3 && <PortfoleoForm userData={props.userData} changeBinder={props.changeBinder}/>}
    </Fragment>
  );
}

export default TabFormFields;
