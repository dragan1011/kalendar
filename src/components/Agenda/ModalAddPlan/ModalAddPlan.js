import { Fragment, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import classes from './ModalAddPlan.module.css';

import { db } from "../../../firebase_setup/firebase";
import { doc, setDoc } from "firebase/firestore"; 


const ModalOverlay = (props) => {

  const [naziv, setNaziv] = useState('')
  const [pocetakSat, setPocetakSat] = useState('')
  const [pocetakMinut, setPocetakMinut] = useState('')
  const [krajSat, setKrajSat] = useState('')
  const [krajMinut, setKrajMinut] = useState('')
  const [pocetakSatIsValid, setPocetakSatIsValid] = useState(false)
  const [pocetakMinutIsValid, setPocetakMinutIsValid] = useState(false)
  const [krajSatIsValid, setKrajSatIsValid] = useState(false)
  const [krajMinutIsValid, setKrajMinutIsValid] = useState(false)
  const [nazivIsValid, setNazivIsValid] = useState(false)
  const [vrijeme, setVrijeme] = useState(false)
  const [provjeraMinuta, setProvjeraMinuta] = useState(false)

  const hours = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]
  const minutes = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"]

    useEffect(()=> {
    document.addEventListener('keydown', hideOnEscape, true)
  }, [])

   const hideOnEscape = (e) =>{
    if (e.key === "Escape") {
      close();
    }
  } 

// eslint-disable-next-line
   const addNewData = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line
     if (naziv.trim() == '' || naziv.trim().length == 0 || naziv.length>0&&naziv.length<3) {
      return setNazivIsValid(true)
    } // eslint-disable-next-line
    if (pocetakSat === ''|| pocetakSat === null || pocetakSat === 'Sat') {
      return setPocetakSatIsValid(true)
    } 
    if (pocetakMinut === ''|| pocetakMinut === null || pocetakMinut === 'Minut') {
      return setPocetakMinutIsValid(true)
    } 
    if (krajSat === ''|| krajSat === null || krajSat === 'Sat') {
      return setKrajSatIsValid(true)
    } 
    if (krajMinut === ''|| krajMinut === null || krajMinut === 'Minut') {
      return setKrajMinutIsValid(true)
    } 
    if (pocetakSat > krajSat) {
      return setVrijeme(true)
    } 
    if (pocetakSat === krajSat && pocetakMinut > krajMinut ) {
      return setProvjeraMinuta(true)
    } 

      await setDoc(doc(db, "aktivnost", `${Math.random()}`), {
      naziv: naziv,
      pocetakSat: pocetakSat,
      pocetakMinut: pocetakMinut,
      krajSat: krajSat,
      krajMinut: krajMinut,
      datum: props.date
    }); 

 close();
 
  } 

  const close = () => {
    props.closeModal(false)
    document.body.style.overflow = 'visible'
   } 

  return (
    <div>
      <div onClick={close} className={classes.backdrop} />
      <div className={`${classes.modal} ${classes.card}`}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
        <form onSubmit={addNewData} className={classes.modalWrapper} autoComplete="off" >
   <div className={classes.smallWrapper}>
   <label htmlFor='naziv' className={classes.label}>Name</label>
    <input id='naziv' onChange={e => setNaziv(e.target.value)} className={classes.input} type="text" />
    {nazivIsValid&&naziv.trim().length<=0 ? <label className={classes.labelUpozorenja}>Ovo ne može biti prazno!</label>:""}
     {nazivIsValid&&naziv.trim().length>0&&naziv.trim().length<3 ? <label className={classes.labelUpozorenja}>Morate unijeti više od tri karaktera!</label>:""}
   </div>
   <div className={classes.row}>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Start hour</label>
    <select onChange={e => setPocetakSat(e.target.value)} className={classes.select} type="text" >
    <option className={classes.option}>Hour</option>
        {
         hours.map( sat => (
          <option key={sat} className={classes.option}>{sat}</option>
         ))
        }
      
      </select>
      {pocetakSatIsValid&&pocetakSat==='Sat' ? <label className={classes.labelUpozorenja}>Obavezno!</label>:""}
      {pocetakSatIsValid&&pocetakSat==='' ? <label className={classes.labelUpozorenja}>Obavezno!</label>:""}
      {pocetakSatIsValid&&pocetakSat===null ? <label className={classes.labelUpozorenja}>Obavezno!</label>:""}
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Start minute</label>
    <select onChange={e => setPocetakMinut(e.target.value)} className={classes.select} type="text" >
    <option className={classes.option}>Minute</option>
        {
         minutes.map( minut => (
          <option key={minut} className={classes.option}>{minut}</option>
         ))
        }
      
      </select>
      {pocetakMinutIsValid&&pocetakMinut==='Minut' ? <label className={classes.labelUpozorenja}>Obavezno!</label>:""}
      {pocetakMinutIsValid&&pocetakMinut==='' ? <label className={classes.labelUpozorenja}>Obavezno!</label>:""}
      {pocetakMinutIsValid&&pocetakMinut===null ? <label className={classes.labelUpozorenja}>Obavezno!</label>:""}
   </div>
   <div className={classes.minus}>
 -
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>End hour</label>
    <select onChange={e => setKrajSat(e.target.value)} className={classes.select} type="text" >
    <option className={classes.option}>Hour</option>
        {
         hours.map( sat => (
          <option key={sat} className={classes.option}>{sat}</option>
         ))
        }
      
      </select>
      {krajSatIsValid&&krajSat==='Sat' ? <label className={classes.labelUpozorenja}>Obavezno!</label>:""}
      {krajSatIsValid&&krajSat==='' ? <label className={classes.labelUpozorenja}>Obavezno!</label>:""}
      {krajSatIsValid&&krajSat===null ? <label className={classes.labelUpozorenja}>Obavezno!</label>:""}
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>End minute</label>
    <select onChange={e => setKrajMinut(e.target.value)} className={classes.select} type="text" >
    <option className={classes.option}>Minute</option>
        {
         minutes.map( minut => (
          <option key={minut} className={classes.option}>{minut}</option>
         ))
        }
      
      </select>
      {krajMinutIsValid&&krajMinut==='Minut' ? <label className={classes.labelUpozorenja}>Obavezno!</label>:""}
      {krajMinutIsValid&&krajMinut==='' ? <label className={classes.labelUpozorenja}>Obavezno!</label>:""}
      {krajMinutIsValid&&krajMinut===null ? <label className={classes.labelUpozorenja}>Obavezno!</label>:""}
   </div>
   </div>
   {vrijeme&&pocetakSat > krajSat ? <label className={classes.labelUpozorenja}>Događaj ne može početi nakon što završi!</label>:""}
   {provjeraMinuta&&pocetakSat === krajSat && pocetakMinut > krajMinut ? <label className={classes.labelUpozorenja}>Događaj ne može početi nakon što završi!</label>:""}
   <footer className={classes.actions}>
          <button type='submit' className={classes.button}>Add task</button>
          <button onClick={close} className={classes.close}>Cancel</button>
        </footer>
    </form>
        </div>
       
      </div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ModalOverlay date={props.date} submitData={props.submitData} closeModal={props.closeModal} title={props.title}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;