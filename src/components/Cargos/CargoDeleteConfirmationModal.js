import {useState} from "react";
import Button from "react-bootstrap/Button";
import DeleteIcon from "../UI/Icons/DeleteIcon";
import Modal from "react-bootstrap/Modal";

const CargoDeleteConfirmationModal = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="danger" onClick={handleShow}>
                <DeleteIcon />
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Remove cargo listing</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to remove this cargo listing?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" data-id={props.id} onClick={props.handleCargoDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CargoDeleteConfirmationModal;