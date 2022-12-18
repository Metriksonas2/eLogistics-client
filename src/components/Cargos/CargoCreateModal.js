import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import DeleteIcon from "../UI/Icons/DeleteIcon";
import Modal from "react-bootstrap/Modal";

const CargoCreateModal = (props) => {
    const [show, setShow] = useState(false);
    const handleCreate = props.handleCreate;
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="success" onClick={handleShow} style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto'
            }}>
                Create new cargo
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create new cargo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="input-form" onSubmit={handleCreate}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" id="name" name="name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="identifier">Identifier</label>
                            <input type="text" className="form-control" id="identifier" name="identifier"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="color">Color</label>
                            <input type="text" className="form-control" id="color" name="color"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="totalWeight">Total weight</label>
                            <input type="text" className="form-control" id="totalWeight" name="totalWeight"
                            />
                        </div>
                        <br/>
                        <button type="submit" className="btn btn-success">Create</button>
                    </form>
                    {/*<form className="input-form" onSubmit={handleEdit}>*/}
                    {/*    <h3>Edit cargo</h3>*/}
                    {/*    <div className="form-group">*/}
                    {/*        <label htmlFor="name">Name</label>*/}
                    {/*        <input type="text" className="form-control" id="name"*/}
                    {/*               placeholder="Enter name" value={name}*/}
                    {/*               onChange={(e) => setName(e.target.value)}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*    <div className="form-group">*/}
                    {/*        <label htmlFor="identifier">Identifier</label>*/}
                    {/*        <input type="text" className="form-control" id="identifier"*/}
                    {/*               placeholder="Enter identifier" value={identifier}*/}
                    {/*               onChange={(e) => setIdentifier(e.target.value)}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*    <div className="form-group">*/}
                    {/*        <label htmlFor="color">Color</label>*/}
                    {/*        <input type="text" className="form-control" id="color"*/}
                    {/*               placeholder="Enter color" value={color}*/}
                    {/*               onChange={(e) => setColor(e.target.value)}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*    <div className="form-group">*/}
                    {/*        <label htmlFor="totalWeight">Total weight</label>*/}
                    {/*        <input type="text" className="form-control" id="totalWeight"*/}
                    {/*               placeholder="Enter total weight" value={totalWeight}*/}
                    {/*               onChange={(e) => setTotalWeight(e.target.value)}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*    <button type="submit" className="btn btn-primary">Update</button>*/}
                    {/*</form>*/}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CargoCreateModal;