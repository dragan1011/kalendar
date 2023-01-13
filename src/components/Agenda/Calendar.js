import React, { useState, useEffect } from 'react';

import useCalendar from './hooks/useCalendar';

import classes from './Calendar.module.css'

import Modal from './ModalAddPlan/ModalAddPlan'
import ModalInfo from './ModalInfo/ModalInfo'

import { db } from "../../firebase_setup/firebase";
import { onSnapshot, collection } from "@firebase/firestore"

import moment from 'moment-timezone';
const Calendar = () => {
  const { calendarRows, selectedDate, todayFormatted,todayFormattedReverse ,daysShort, monthNames, getNextMonth, getPrevMonth, getCurrentMonth } = useCalendar();

  const [isModal, setIsModal] = useState(false)
  const [isModalInfo, setIsModalInfo] = useState(false)
  const [datum, setDatum] = useState('')
  const [data, setData] = useState('')
  const [podaciEdit, setPodaciEdit] = useState('')
  const [zona, setZona] = useState('UTC+1')
  const [FT, setFT] = useState([])
  const [startTime, setStartTime] = useState('')
  

  useEffect(()=> onSnapshot(collection(db, "aktivnost"), (snapshot) =>
  setData(snapshot.docs.map((doc) => doc.data())) ), [])

  const modal = (date) => {
    setIsModal(true)
    document.body.style.overflow = 'hidden'
    setDatum(date)
   }

   const edit = (data) => {
    setIsModalInfo(true)
    document.body.style.overflow = 'hidden'
    setPodaciEdit(data)
   }

   const timezone = (e) => {
  setZona(e.target.value)
   }


  const satPocetak = Array.from(data).map(sat => sat.pocetakSat)
  const minutPocetak = Array.from(data).map(minut => minut.pocetakMinut)





  let today = new Date();

  return(
    <div className={classes.component}>
      <div className={classes.heading}>
      <h2 className={classes.title}>{`${monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`}</h2>
      <button className={classes.changeDate} onClick={getPrevMonth}>&#60;</button>
      <button className={classes.changeDate} onClick={getNextMonth}>&#62;</button>
      <button className={classes.button} onClick={getCurrentMonth}>Today</button>
      <select onClick={timezone} className={classes.button}>
      <option className={classes.zone}>UTC+1</option>
      <option className={classes.zone}>UTC-8</option>
      <option className={classes.zone}>UTC-7</option>
      <option className={classes.zone}>UTC-6</option>
      <option className={classes.zone}>UTC-5</option>
      <option className={classes.zone}>UTC-3</option>
      <option className={classes.zone}>UTC</option>
      <option className={classes.zone}>UTC+3</option>
      <option className={classes.zone}>UTC+4</option>
      <option className={classes.zone}>UTC+8</option>
      <option className={classes.zone}>UTC+9</option>
      <option className={classes.zone}>UTC+11</option>
      <option className={classes.zone}>UTC+13</option>
      </select>
      </div>
      <table className={classes.table} >
        <thead>
          <tr className={classes.weekday}>
            {daysShort.map(day => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody key={Math.random()}>
          {
            Object.values(calendarRows).map(cols => {
              return <tr key={Math.random()}>
                {cols.map(col => (
                  col.date === todayFormatted
                    ?
                     <td key={Math.random()} className={`${classes.day}`} onDoubleClick={() => modal(col.dateReverse)}>
                     <div className={classes.today}> {col.value} { (col.date.slice(0,4) === '1-12' ?'December' : '') || (col.date.slice(0,3) === '1-1' ?'January' : '') || (col.date.slice(0,3) === '1-2' ?'February' : '') || (col.date.slice(0,3) === '1-3' ?'March' : '') || (col.date.slice(0,3) === '1-4' ?'April' : '') || (col.date.slice(0,3) === '1-5' ?'May' : '') || (col.date.slice(0,3) === '1-6' ?'June' : '') || (col.date.slice(0,3) === '1-7' ?'July' : '') || (col.date.slice(0,3) === '1-8' ?'August' : '') || (col.date.slice(0,3) === '1-9' ?'September' : '') || (col.date.slice(0,4) === '1-10' ?'October' : '') || (col.date.slice(0,4) === '1-11' ?'November' : '')} 
                     </div>
                     <div className={classes.eventWrapper}>
                      
                      
                     {Array.from(data).map((data) => {
                       let newVatr;
                       let newKarr;
                    
                    if (zona === 'UTC+1') {
                      const timeInOriginalTimezone = moment.tz(`${data.datum} ${data.pocetakSat}:${data.pocetakMinut}:00`, 'Europe/Sarajevo');
                      const timeInDesiredTimezone = timeInOriginalTimezone.clone().tz(`Europe/Sarajevo`);
                      const formattedTimes = timeInDesiredTimezone.format('HH:mm');
                      newVatr = formattedTimes;
                      const timeInOriginalTimezoneEnd = moment.tz(`${data.datum} ${data.krajSat}:${data.krajMinut}:00`, 'Europe/Sarajevo');
                      const timeInDesiredTimezoneEnd = timeInOriginalTimezoneEnd.clone().tz(`Europe/Sarajevo`);
                      const formattedTimesEnd = timeInDesiredTimezoneEnd.format('HH:mm');
                      newKarr = formattedTimesEnd;
                      
                     } 
                      if (zona === 'UTC-8') {
                      const timeInOriginalTimezone = moment.tz(`${data.datum} ${data.pocetakSat}:${data.pocetakMinut}:00`, 'Europe/Sarajevo');
                      const timeInDesiredTimezone = timeInOriginalTimezone.clone().tz(`US/Pacific`);
                      const formattedTimes = timeInDesiredTimezone.format('HH:mm');
                      newVatr = formattedTimes;
                      const timeInOriginalTimezoneEnd = moment.tz(`${data.datum} ${data.krajSat}:${data.krajMinut}:00`, 'Europe/Sarajevo');
                      const timeInDesiredTimezoneEnd = timeInOriginalTimezoneEnd.clone().tz(`US/Pacific`);
                      const formattedTimesEnd = timeInDesiredTimezoneEnd.format('HH:mm');
                      newKarr = formattedTimesEnd;
                     } 
                      if (zona === 'UTC-7') {
                      const timeInOriginalTimezone = moment.tz(`${data.datum} ${data.pocetakSat}:${data.pocetakMinut}:00`, 'Europe/Sarajevo');
                      const timeInDesiredTimezone = timeInOriginalTimezone.clone().tz(`US/Mountain`);
                      const formattedTimes = timeInDesiredTimezone.format('HH:mm');
                      newVatr = formattedTimes;
                      const timeInOriginalTimezoneEnd = moment.tz(`${data.datum} ${data.krajSat}:${data.krajMinut}:00`, 'Europe/Sarajevo');
                      const timeInDesiredTimezoneEnd = timeInOriginalTimezoneEnd.clone().tz(`US/Mountain`);
                      const formattedTimesEnd = timeInDesiredTimezoneEnd.format('HH:mm');
                      newKarr = formattedTimesEnd;
                     }
                     if (zona === 'UTC-6') {
                      const timeInOriginalTimezone = moment.tz(`${data.datum} ${data.pocetakSat}:${data.pocetakMinut}:00`, 'Europe/Sarajevo');
                      const timeInDesiredTimezone = timeInOriginalTimezone.clone().tz(`US/Central`);
                      const formattedTimes = timeInDesiredTimezone.format('HH:mm');
                      newVatr = formattedTimes;
                      const timeInOriginalTimezoneEnd = moment.tz(`${data.datum} ${data.krajSat}:${data.krajMinut}:00`, 'Europe/Sarajevo');
                      const timeInDesiredTimezoneEnd = timeInOriginalTimezoneEnd.clone().tz(`US/Central`);
                      const formattedTimesEnd = timeInDesiredTimezoneEnd.format('HH:mm');
                      newKarr = formattedTimesEnd;
                     }
                     if (zona === 'UTC-5') {
                      const timeInOriginalTimezone = moment.tz(`${data.datum} ${data.pocetakSat}:${data.pocetakMinut}:00`, 'Europe/Sarajevo');
                      const timeInDesiredTimezone = timeInOriginalTimezone.clone().tz(`US/Eastern`);
                      const formattedTimes = timeInDesiredTimezone.format('HH:mm');
                      newVatr = formattedTimes;
                      const timeInOriginalTimezoneEnd = moment.tz(`${data.datum} ${data.krajSat}:${data.krajMinut}:00`, 'Europe/Sarajevo');
                      const timeInDesiredTimezoneEnd = timeInOriginalTimezoneEnd.clone().tz(`US/Eastern`);
                      const formattedTimesEnd = timeInDesiredTimezoneEnd.format('HH:mm');
                      newKarr = formattedTimesEnd;
                     }
                     if (zona === 'UTC-3') {
                      const timeInOriginalTimezone = moment.tz(`${data.datum} ${data.pocetakSat}:${data.pocetakMinut}:00`, 'Europe/Sarajevo');
                      const timeInDesiredTimezone = timeInOriginalTimezone.clone().tz(`Etc/GMT-3`);
                      const formattedTimes = timeInDesiredTimezone.format('HH:mm');
                      newVatr = formattedTimes;
                      const timeInOriginalTimezoneEnd = moment.tz(`${data.datum} ${data.krajSat}:${data.krajMinut}:00`, 'Europe/Sarajevo');
                      const timeInDesiredTimezoneEnd = timeInOriginalTimezoneEnd.clone().tz(`Etc/GMT-3`);
                      const formattedTimesEnd = timeInDesiredTimezoneEnd.format('HH:mm');
                      newKarr = formattedTimesEnd;
                     }
                     if (zona === 'UTC') {
                      const timeInOriginalTimezone = moment.tz(`${data.datum} ${data.pocetakSat}:${data.pocetakMinut}:00`, 'Europe/Sarajevo');
                      const timeInDesiredTimezone = timeInOriginalTimezone.clone().tz(`Europe/London`);
                      const formattedTimes = timeInDesiredTimezone.format('HH:mm');
                      newVatr = formattedTimes;
                      const timeInOriginalTimezoneEnd = moment.tz(`${data.datum} ${data.krajSat}:${data.krajMinut}:00`, 'Europe/Sarajevo');
                      const timeInDesiredTimezoneEnd = timeInOriginalTimezoneEnd.clone().tz(`Europe/London`);
                      const formattedTimesEnd = timeInDesiredTimezoneEnd.format('HH:mm');
                      newKarr = formattedTimesEnd;
                     }
                     if (zona === 'UTC+3') {
                      const timeInOriginalTimezone = moment.tz(`${data.datum} ${data.pocetakSat}:${data.pocetakMinut}:00`, 'Europe/Sarajevo');
                      const timeInDesiredTimezone = timeInOriginalTimezone.clone().tz(`Europe/Moscow`);
                      const formattedTimes = timeInDesiredTimezone.format('HH:mm');
                      newVatr = formattedTimes;
                      const timeInOriginalTimezoneEnd = moment.tz(`${data.datum} ${data.krajSat}:${data.krajMinut}:00`, 'Europe/Sarajevo');
                      const timeInDesiredTimezoneEnd = timeInOriginalTimezoneEnd.clone().tz(`Europe/Moscow`);
                      const formattedTimesEnd = timeInDesiredTimezoneEnd.format('HH:mm');
                      newKarr = formattedTimesEnd;
                     }
                     if (zona === 'UTC+4') {
                      const timeInOriginalTimezone = moment.tz(`${data.datum} ${data.pocetakSat}:${data.pocetakMinut}:00`, 'Europe/Sarajevo');
                      const timeInDesiredTimezone = timeInOriginalTimezone.clone().tz(`Asia/Dubai`);
                      const formattedTimes = timeInDesiredTimezone.format('HH:mm');
                      newVatr = formattedTimes;
                      const timeInOriginalTimezoneEnd = moment.tz(`${data.datum} ${data.krajSat}:${data.krajMinut}:00`, 'Europe/Sarajevo');
                      const timeInDesiredTimezoneEnd = timeInOriginalTimezoneEnd.clone().tz(`Asia/Dubai`);
                      const formattedTimesEnd = timeInDesiredTimezoneEnd.format('HH:mm');
                      newKarr = formattedTimesEnd;
                     }
                     if (zona === 'UTC+8') {
                      const timeInOriginalTimezone = moment.tz(`${data.datum} ${data.pocetakSat}:${data.pocetakMinut}:00`, 'Europe/Sarajevo');
                      const timeInDesiredTimezone = timeInOriginalTimezone.clone().tz(`Asia/Shanghai`);
                      const formattedTimes = timeInDesiredTimezone.format('HH:mm');
                      newVatr = formattedTimes;
                      const timeInOriginalTimezoneEnd = moment.tz(`${data.datum} ${data.krajSat}:${data.krajMinut}:00`, 'Europe/Sarajevo');
                      const timeInDesiredTimezoneEnd = timeInOriginalTimezoneEnd.clone().tz(`Asia/Shanghai`);
                      const formattedTimesEnd = timeInDesiredTimezoneEnd.format('HH:mm');
                      newKarr = formattedTimesEnd;
                     }
                     if (zona === 'UTC+9') {
                      const timeInOriginalTimezone = moment.tz(`${data.datum} ${data.pocetakSat}:${data.pocetakMinut}:00`, 'Europe/Sarajevo');
                      const timeInDesiredTimezone = timeInOriginalTimezone.clone().tz(`Asia/Tokyo`);
                      const formattedTimes = timeInDesiredTimezone.format('HH:mm');
                      newVatr = formattedTimes;
                      const timeInOriginalTimezoneEnd = moment.tz(`${data.datum} ${data.krajSat}:${data.krajMinut}:00`, 'Europe/Sarajevo');
                      const timeInDesiredTimezoneEnd = timeInOriginalTimezoneEnd.clone().tz(`Asia/Tokyo`);
                      const formattedTimesEnd = timeInDesiredTimezoneEnd.format('HH:mm');
                      newKarr = formattedTimesEnd;
                     }
                     if (zona === 'UTC+11') {
                      const timeInOriginalTimezone = moment.tz(`${data.datum} ${data.pocetakSat}:${data.pocetakMinut}:00`, 'Europe/Sarajevo');
                      const timeInDesiredTimezone = timeInOriginalTimezone.clone().tz(`Australia/Sydney`);
                      const formattedTimes = timeInDesiredTimezone.format('HH:mm');
                      newVatr = formattedTimes;
                      const timeInOriginalTimezoneEnd = moment.tz(`${data.datum} ${data.krajSat}:${data.krajMinut}:00`, 'Europe/Sarajevo');
                      const timeInDesiredTimezoneEnd = timeInOriginalTimezoneEnd.clone().tz(`Australia/Sydney`);
                      const formattedTimesEnd = timeInDesiredTimezoneEnd.format('HH:mm');
                      newKarr = formattedTimesEnd;
                     }
                     if (zona === 'UTC+13') {
                      const timeInOriginalTimezone = moment.tz(`${data.datum} ${data.pocetakSat}:${data.pocetakMinut}:00`, 'Europe/Sarajevo');
                      const timeInDesiredTimezone = timeInOriginalTimezone.clone().tz(`Pacific/Auckland`);
                      const formattedTimes = timeInDesiredTimezone.format('HH:mm');
                      newVatr = formattedTimes;
                      const timeInOriginalTimezoneEnd = moment.tz(`${data.datum} ${data.krajSat}:${data.krajMinut}:00`, 'Europe/Sarajevo');
                      const timeInDesiredTimezoneEnd = timeInOriginalTimezoneEnd.clone().tz(`Pacific/Auckland`);
                      const formattedTimesEnd = timeInDesiredTimezoneEnd.format('HH:mm');
                      newKarr = formattedTimesEnd;
                     }
                      
                     return ( <div onClick={() => edit(data)} key={Math.random()} className={classes.eventCurrent}>{data.datum === col.dateReverse ?`${newVatr}-${newKarr} ${data.naziv.length > 4 ?data.naziv.slice(0,4)+ '...' : data.naziv}` : ''}</div>)
            })}
                     </div>
                  </td>
                    :<td key={Math.random()} className={`${classes.day} }`} onDoubleClick={() => modal(col.dateReverse)}>
                      <div className={` ${ (today.getMonth()+1 === Number(col.monthNumber) && Number(today.getFullYear()) === Number(col.dateReverse.slice(0,4)) ? '' : classes.drop) }`}> </div>
                      <div className={classes.dateValue}>{col.value} {(col.date.slice(0,4) === '1-12' ?'December' : '') || (col.date.slice(0,3) === '1-1' ?'January' : '') || (col.date.slice(0,3) === '1-2' ?'February' : '') || (col.date.slice(0,3) === '1-3' ?'March' : '') || (col.date.slice(0,3) === '1-4' ?'April' : '') || (col.date.slice(0,3) === '1-5' ?'May' : '') || (col.date.slice(0,3) === '1-6' ?'June' : '') || (col.date.slice(0,3) === '1-7' ?'July' : '') || (col.date.slice(0,3) === '1-8' ?'August' : '') || (col.date.slice(0,3) === '1-9' ?'September' : '') || (col.date.slice(0,4) === '1-10' ?'October' : '') || (col.date.slice(0,4) === '1-11' ?'November' : '') }
                      </div>
                      <div className={classes.eventWrapper}>
                        {Number(data.length) === Number(0) ? '' : Array.from(data).map((data) => {
                            
                            const date1 = col.dateReverse;
                             const date2 = todayFormattedReverse;
                             let newVatr;
                             let newKarr;
                             
                            const dateObject1 = new Date(Date.parse(date1));
                             const dateObject2 = new Date(Date.parse(date2));
               
                             
                             if (zona === 'UTC+1') {
                              const timeInOriginalTimezone = moment.tz(`${data.datum} ${data.pocetakSat}:${data.pocetakMinut}:00`, 'Europe/Sarajevo');
                              const timeInDesiredTimezone = timeInOriginalTimezone.clone().tz(`Europe/Sarajevo`);
                              const formattedTimes = timeInDesiredTimezone.format('HH:mm');
                              newVatr = formattedTimes;
                              const timeInOriginalTimezoneEnd = moment.tz(`${data.datum} ${data.krajSat}:${data.krajMinut}:00`, 'Europe/Sarajevo');
                              const timeInDesiredTimezoneEnd = timeInOriginalTimezoneEnd.clone().tz(`Europe/Sarajevo`);
                              const formattedTimesEnd = timeInDesiredTimezoneEnd.format('HH:mm');
                              newKarr = formattedTimesEnd;
                              
                             } 
                              if (zona === 'UTC-8') {
                              const timeInOriginalTimezone = moment.tz(`${data.datum} ${data.pocetakSat}:${data.pocetakMinut}:00`, 'Europe/Sarajevo');
                              const timeInDesiredTimezone = timeInOriginalTimezone.clone().tz(`US/Pacific`);
                              const formattedTimes = timeInDesiredTimezone.format('HH:mm');
                              newVatr = formattedTimes;
                              const timeInOriginalTimezoneEnd = moment.tz(`${data.datum} ${data.krajSat}:${data.krajMinut}:00`, 'Europe/Sarajevo');
                              const timeInDesiredTimezoneEnd = timeInOriginalTimezoneEnd.clone().tz(`US/Pacific`);
                              const formattedTimesEnd = timeInDesiredTimezoneEnd.format('HH:mm');
                              newKarr = formattedTimesEnd;
                             } 
                              if (zona === 'UTC-7') {
                              const timeInOriginalTimezone = moment.tz(`${data.datum} ${data.pocetakSat}:${data.pocetakMinut}:00`, 'Europe/Sarajevo');
                              const timeInDesiredTimezone = timeInOriginalTimezone.clone().tz(`US/Mountain`);
                              const formattedTimes = timeInDesiredTimezone.format('HH:mm');
                              newVatr = formattedTimes;
                              const timeInOriginalTimezoneEnd = moment.tz(`${data.datum} ${data.krajSat}:${data.krajMinut}:00`, 'Europe/Sarajevo');
                              const timeInDesiredTimezoneEnd = timeInOriginalTimezoneEnd.clone().tz(`US/Mountain`);
                              const formattedTimesEnd = timeInDesiredTimezoneEnd.format('HH:mm');
                              newKarr = formattedTimesEnd;
                             }
                             if (zona === 'UTC-6') {
                              const timeInOriginalTimezone = moment.tz(`${data.datum} ${data.pocetakSat}:${data.pocetakMinut}:00`, 'Europe/Sarajevo');
                              const timeInDesiredTimezone = timeInOriginalTimezone.clone().tz(`US/Central`);
                              const formattedTimes = timeInDesiredTimezone.format('HH:mm');
                              newVatr = formattedTimes;
                              const timeInOriginalTimezoneEnd = moment.tz(`${data.datum} ${data.krajSat}:${data.krajMinut}:00`, 'Europe/Sarajevo');
                              const timeInDesiredTimezoneEnd = timeInOriginalTimezoneEnd.clone().tz(`US/Central`);
                              const formattedTimesEnd = timeInDesiredTimezoneEnd.format('HH:mm');
                              newKarr = formattedTimesEnd;
                             }
                             if (zona === 'UTC-5') {
                              const timeInOriginalTimezone = moment.tz(`${data.datum} ${data.pocetakSat}:${data.pocetakMinut}:00`, 'Europe/Sarajevo');
                              const timeInDesiredTimezone = timeInOriginalTimezone.clone().tz(`US/Eastern`);
                              const formattedTimes = timeInDesiredTimezone.format('HH:mm');
                              newVatr = formattedTimes;
                              const timeInOriginalTimezoneEnd = moment.tz(`${data.datum} ${data.krajSat}:${data.krajMinut}:00`, 'Europe/Sarajevo');
                              const timeInDesiredTimezoneEnd = timeInOriginalTimezoneEnd.clone().tz(`US/Eastern`);
                              const formattedTimesEnd = timeInDesiredTimezoneEnd.format('HH:mm');
                              newKarr = formattedTimesEnd;
                             }
                             if (zona === 'UTC-3') {
                              const timeInOriginalTimezone = moment.tz(`${data.datum} ${data.pocetakSat}:${data.pocetakMinut}:00`, 'Europe/Sarajevo');
                              const timeInDesiredTimezone = timeInOriginalTimezone.clone().tz(`Etc/GMT-3`);
                              const formattedTimes = timeInDesiredTimezone.format('HH:mm');
                              newVatr = formattedTimes;
                              const timeInOriginalTimezoneEnd = moment.tz(`${data.datum} ${data.krajSat}:${data.krajMinut}:00`, 'Europe/Sarajevo');
                              const timeInDesiredTimezoneEnd = timeInOriginalTimezoneEnd.clone().tz(`Etc/GMT-3`);
                              const formattedTimesEnd = timeInDesiredTimezoneEnd.format('HH:mm');
                              newKarr = formattedTimesEnd;
                             }
                             if (zona === 'UTC') {
                              const timeInOriginalTimezone = moment.tz(`${data.datum} ${data.pocetakSat}:${data.pocetakMinut}:00`, 'Europe/Sarajevo');
                              const timeInDesiredTimezone = timeInOriginalTimezone.clone().tz(`Europe/London`);
                              const formattedTimes = timeInDesiredTimezone.format('HH:mm');
                              newVatr = formattedTimes;
                              const timeInOriginalTimezoneEnd = moment.tz(`${data.datum} ${data.krajSat}:${data.krajMinut}:00`, 'Europe/Sarajevo');
                              const timeInDesiredTimezoneEnd = timeInOriginalTimezoneEnd.clone().tz(`Europe/London`);
                              const formattedTimesEnd = timeInDesiredTimezoneEnd.format('HH:mm');
                              newKarr = formattedTimesEnd;
                             }
                             if (zona === 'UTC+3') {
                              const timeInOriginalTimezone = moment.tz(`${data.datum} ${data.pocetakSat}:${data.pocetakMinut}:00`, 'Europe/Sarajevo');
                              const timeInDesiredTimezone = timeInOriginalTimezone.clone().tz(`Europe/Moscow`);
                              const formattedTimes = timeInDesiredTimezone.format('HH:mm');
                              newVatr = formattedTimes;
                              const timeInOriginalTimezoneEnd = moment.tz(`${data.datum} ${data.krajSat}:${data.krajMinut}:00`, 'Europe/Sarajevo');
                              const timeInDesiredTimezoneEnd = timeInOriginalTimezoneEnd.clone().tz(`Europe/Moscow`);
                              const formattedTimesEnd = timeInDesiredTimezoneEnd.format('HH:mm');
                              newKarr = formattedTimesEnd;
                             }
                             if (zona === 'UTC+4') {
                              const timeInOriginalTimezone = moment.tz(`${data.datum} ${data.pocetakSat}:${data.pocetakMinut}:00`, 'Europe/Sarajevo');
                              const timeInDesiredTimezone = timeInOriginalTimezone.clone().tz(`Asia/Dubai`);
                              const formattedTimes = timeInDesiredTimezone.format('HH:mm');
                              newVatr = formattedTimes;
                              const timeInOriginalTimezoneEnd = moment.tz(`${data.datum} ${data.krajSat}:${data.krajMinut}:00`, 'Europe/Sarajevo');
                              const timeInDesiredTimezoneEnd = timeInOriginalTimezoneEnd.clone().tz(`Asia/Dubai`);
                              const formattedTimesEnd = timeInDesiredTimezoneEnd.format('HH:mm');
                              newKarr = formattedTimesEnd;
                             }
                             if (zona === 'UTC+8') {
                              const timeInOriginalTimezone = moment.tz(`${data.datum} ${data.pocetakSat}:${data.pocetakMinut}:00`, 'Europe/Sarajevo');
                              const timeInDesiredTimezone = timeInOriginalTimezone.clone().tz(`Asia/Shanghai`);
                              const formattedTimes = timeInDesiredTimezone.format('HH:mm');
                              newVatr = formattedTimes;
                              const timeInOriginalTimezoneEnd = moment.tz(`${data.datum} ${data.krajSat}:${data.krajMinut}:00`, 'Europe/Sarajevo');
                              const timeInDesiredTimezoneEnd = timeInOriginalTimezoneEnd.clone().tz(`Asia/Shanghai`);
                              const formattedTimesEnd = timeInDesiredTimezoneEnd.format('HH:mm');
                              newKarr = formattedTimesEnd;
                             }
                             if (zona === 'UTC+9') {
                              const timeInOriginalTimezone = moment.tz(`${data.datum} ${data.pocetakSat}:${data.pocetakMinut}:00`, 'Europe/Sarajevo');
                              const timeInDesiredTimezone = timeInOriginalTimezone.clone().tz(`Asia/Tokyo`);
                              const formattedTimes = timeInDesiredTimezone.format('HH:mm');
                              newVatr = formattedTimes;
                              const timeInOriginalTimezoneEnd = moment.tz(`${data.datum} ${data.krajSat}:${data.krajMinut}:00`, 'Europe/Sarajevo');
                              const timeInDesiredTimezoneEnd = timeInOriginalTimezoneEnd.clone().tz(`Asia/Tokyo`);
                              const formattedTimesEnd = timeInDesiredTimezoneEnd.format('HH:mm');
                              newKarr = formattedTimesEnd;
                             }
                             if (zona === 'UTC+11') {
                              const timeInOriginalTimezone = moment.tz(`${data.datum} ${data.pocetakSat}:${data.pocetakMinut}:00`, 'Europe/Sarajevo');
                              const timeInDesiredTimezone = timeInOriginalTimezone.clone().tz(`Australia/Sydney`);
                              const formattedTimes = timeInDesiredTimezone.format('HH:mm');
                              newVatr = formattedTimes;
                              const timeInOriginalTimezoneEnd = moment.tz(`${data.datum} ${data.krajSat}:${data.krajMinut}:00`, 'Europe/Sarajevo');
                              const timeInDesiredTimezoneEnd = timeInOriginalTimezoneEnd.clone().tz(`Australia/Sydney`);
                              const formattedTimesEnd = timeInDesiredTimezoneEnd.format('HH:mm');
                              newKarr = formattedTimesEnd;
                             }
                             if (zona === 'UTC+13') {
                              const timeInOriginalTimezone = moment.tz(`${data.datum} ${data.pocetakSat}:${data.pocetakMinut}:00`, 'Europe/Sarajevo');
                              const timeInDesiredTimezone = timeInOriginalTimezone.clone().tz(`Pacific/Auckland`);
                              const formattedTimes = timeInDesiredTimezone.format('HH:mm');
                              newVatr = formattedTimes;
                              const timeInOriginalTimezoneEnd = moment.tz(`${data.datum} ${data.krajSat}:${data.krajMinut}:00`, 'Europe/Sarajevo');
                              const timeInDesiredTimezoneEnd = timeInOriginalTimezoneEnd.clone().tz(`Pacific/Auckland`);
                              const formattedTimesEnd = timeInDesiredTimezoneEnd.format('HH:mm');
                              newKarr = formattedTimesEnd;
                             }
                             if (dateObject1 < dateObject2) {
                      
                              return  <div onClick={() => edit(data)} key={Math.random()} className={classes.eventBefore}>{data.datum === col.dateReverse ?`${newVatr}-${newKarr} ${data.naziv.length > 4 ?data.naziv.slice(0,4)+ '...' : data.naziv}` : ''}</div>
                            
                               } else if (dateObject1 > dateObject2) {
                                 
                                return <div onClick={() => edit(data)} key={Math.random()} className={classes.eventAfter}>{data.datum === col.dateReverse ?`${newVatr}-${newKarr} ${data.naziv.length > 4 ?data.naziv.slice(0,4)+ '...' : data.naziv}` : ''}</div>
                               } else {
                                <div onClick={() => edit(data)} key={Math.random()} className={classes.eventAfter}>{data.datum === col.dateReverse ?`${newVatr}-${newKarr} ${data.naziv.length > 4 ?data.naziv.slice(0,4)+ '...' : data.naziv}` : ''}</div>
                               }
                        }                          
                      )} 
                          </div>
                        
                      </td>
                     
                ))}
              </tr>
              
            })
          }
        </tbody>
      </table>
      { isModal && <Modal date={datum} key={Math.random()} closeModal={setIsModal} title="Add task" />}
      { isModalInfo && <ModalInfo data={podaciEdit} key={Math.random()} closeModal={setIsModalInfo} title="View" />}
       </div>
  );
}



export default Calendar;