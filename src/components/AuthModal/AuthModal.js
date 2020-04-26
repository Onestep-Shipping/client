import React from 'react';
import Modal from 'react-modal';
import './AuthModal.css';
import LoginForm from '../AuthForm/LoginForm.js';
import RegisterForm from '../AuthForm/RegisterForm.js';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    borderRadius          : '10px',
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
      {type === 'login' ? <LoginForm /> : <RegisterForm />}
    </Modal>
  );
}

export default AuthModal;
