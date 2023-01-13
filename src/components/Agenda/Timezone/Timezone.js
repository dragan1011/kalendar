import { Fragment } from 'react';
import ReactDOM from 'react-dom';

import classes from './Timezone.module.css';

const ModalOverlay = (props) => {


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
      <div className={classes.zones}>
   <div className={classes.zone}>UTC-8</div>
   <div className={classes.zone}>UTC-7</div>
   <div className={classes.zone}>UTC-6</div>
   <div className={classes.zone}>UTC-5</div>
   <div className={classes.zone}>UTC</div>
   <div className={classes.zone}>UTC+1</div>
   <div className={classes.zone}>UTC+3</div>
   <div className={classes.zone}>UTC+4</div>
   <div className={classes.zone}>UTC+5:30</div>
   <div className={classes.zone}>UTC+8</div>
   <div className={classes.zone}>UTC+9</div>
   <div className={classes.zone}>UTC+11</div>
   <div className={classes.zone}>UTC+13</div>
   </div>
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

const Timezone = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ModalOverlay data={props.data} submitData={props.submitData} closeModal={props.closeModal} title={props.title}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Timezone;