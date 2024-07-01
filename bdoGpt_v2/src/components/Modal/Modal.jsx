import { useState} from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const Modals = () => {
const [show, setShow] = useState(false);
const handleClose = () => setShow (false);
const handleShow = () => setShow(true);


  return (
    <div>

        <Button onClick={handleShow}> 
            pls work
        </Button>   

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title> Modal Heading</Modal.Title>
            </Modal.Header>

            <Modal.Body> fkmodals</Modal.Body>

            <Modal.Footer>

                <Button onClick={handleClose}>
                    Close
                </Button>
                <Button onClick={handleClose}>
                    Save Changes
                </Button>

            </Modal.Footer>

        </Modal>      
       
    </div>
  )
}

export default Modals
