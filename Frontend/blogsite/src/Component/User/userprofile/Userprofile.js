// import { useState } from 'react';
import React, {useState} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useUser } from "../UserContext";

const Userprofile = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const {user} = useUser()
  const {first_name ,last_name,email} = user

  return (
    <>
      <Modal isOpen={modal} toggle={toggle} fullscreen>
        <ModalHeader toggle={toggle}>Your Profile</ModalHeader>
        <ModalBody>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Update
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default Userprofile
