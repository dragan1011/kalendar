import { Fragment, useEffect } from 'react';
import ReactDOM from 'react-dom';

import classes from './ModalInfo.module.css';

const ModalOverlay = (props) => {


  useEffect(()=> {
    document.addEventListener('keydown', hideOnEscape, true)
  }, [])

   const hideOnEscape = (e) =>{
    if (e.key === "Escape") {
      close();
    }
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
        <form className={classes.modalWrapper} autoComplete="off" >
   <div className={classes.smallWrapper}>
    <div className={classes.infoWrapper}>
   <label htmlFor='naziv' className={classes.label}>Name:</label>
   <label htmlFor='naziv' className={classes.labelResult}>{props.data.naziv}</label>
   </div>
   <div className={classes.infoWrapper}>
   <label htmlFor='Vrijeme kraja' className={classes.label}>Date:</label>
   <label htmlFor='Vrijeme kraja' className={classes.labelResult}>{props.data.datum}</label>
   </div>
    <div className={classes.infoWrapper}>
   <label htmlFor='Vrijeme početka' className={classes.label}>Start time:</label>
   <label htmlFor='Vrijeme početka' className={classes.labelResult}>{props.data.pocetakSat}:{props.data.pocetakMinut} h</label>
   </div>
   <div className={classes.infoWrapper}>
   <label htmlFor='Vrijeme kraja' className={classes.label}>End time:</label>
   <label htmlFor='Vrijeme kraja' className={classes.labelResult}>{props.data.krajSat}:{props.data.krajMinut} h</label>
   </div>
   </div>
   <footer className={classes.actions}>
          <button onClick={close} className={classes.close}>Close</button>
        </footer>
    </form>
        </div>
       
      </div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const ModalInfo = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ModalOverlay data={props.data} submitData={props.submitData} closeModal={props.closeModal} title={props.title}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default ModalInfo;