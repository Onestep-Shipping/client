import React from 'react';
import Modal from 'react-modal';
import LoginForm from '../AuthForm/LoginForm.js';
import RegisterForm from '../AuthForm/RegisterForm.js';
import PropTypes from 'prop-types';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    transform             : 'translate(-50%, -50%)',
    borderRadius          : '10px',
    padding               : '0px',
    border                : 'none'
  }
};

const AuthModal = (props) => {
  const { isModalOpen, closeModal, type } = props;

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      {type === 'login' ? 
        <LoginForm closeModal={closeModal}/> : 
        <RegisterForm closeModal={closeModal}/>}
    </Modal>
  );
}

export default AuthModal;

AuthModal.propTypes = {
  isModalOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  type: PropTypes.string,
};
