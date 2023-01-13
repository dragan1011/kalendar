import React, {useState} from 'react'
import classes from './SideMenu.module.css'

import MenuButton from '../UI/MenuButton/MenuButton'

import Agenda from '../Agenda/Calendar'
import Exercises from '../Exercises/Exercises'
import Materials from '../Materials/Materials'
import PersonalInformation from '../PersonalInformation/PersonalInformation'
import Invoices from '../Invoices/Invoices'
import Avaliability from '../Avaliability/Avaliability'

export default function SideMenu() {

  const [active, setActive] = useState('Agenda')

  const setSelectedHandler = naziv => {
    setActive(naziv);
  }

  return (
    <div className={classes.show}>
    <div className={classes.menu}>
        <div className={classes.position}>
        <h3 className={classes.naslov}>YOUR PATH</h3>
        <MenuButton name={"Agenda"} activ={active} select={setSelectedHandler} > <img alt='agenda' src='./utilities/calendar.png' /> <h4 className={classes.item}>Agenda</h4></MenuButton>
        <MenuButton name={"Exercise"} activ={active} select={setSelectedHandler}> <img alt='weight' src='./utilities/weight.png' /> <h4 className={classes.item}>Exercises</h4></MenuButton>
        <MenuButton name={"Materials"} activ={active} select={setSelectedHandler}> <img alt='membrane' src='./utilities/membrane.png' /> <h4 className={classes.item}>Materials</h4></MenuButton>
        <h3 className={classes.naslov}>YOUR PROFILE</h3>
        <MenuButton name={"perinfo"} activ={active} select={setSelectedHandler}> <img alt='personal-information' src='./utilities/personal-information.png' /> <h4 className={classes.item}>Personal Information</h4></MenuButton>
        <MenuButton name={"invoices"} activ={active} select={setSelectedHandler}> <img alt='transparency' src='./utilities/transparency.png' /> <h4 className={classes.item}>Invoices</h4></MenuButton>
        <MenuButton name={"availability"} activ={active} select={setSelectedHandler}> <img alt='check' src='./utilities/check.png' /> <h4 className={classes.item}>Avaliability</h4></MenuButton>
        <div className={`${classes.meni} ${classes.logout}`}> <img alt='logout' src='./utilities/logout.png' /> <h4 className={classes.item}>Logout</h4></div>
        </div>
    </div>


{active === "Agenda" && <Agenda />}
{active === "Exercise" && <Exercises />}
{active === "Materials" && <Materials />}
{active === "perinfo" && <PersonalInformation />}
{active === "invoices" && <Invoices />}
{active === "availability" && <Avaliability />}

    </div>
   
  )
}
