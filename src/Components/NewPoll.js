import React, { useRef, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const NewPoll = (props) => {
  const candidateName = useRef();
  const party = useRef();
  const candidateIdref = useRef();


  const [disableButton, changeDisable] = useState(false);

  const sendToBlockChain = async () => {

    await window.contract.addCandidate({
      id: candidateIdref.current.value,
      name: candidateName.current.value,
      party: party.current.value,
    });

    await window.contract.addToIDArray({ candidateID: candidateIdref.current.value });

    alert("Canditate added");
  };
//used to make the canditates no timer
  return (
    <Container style={{ marginTop: "10px" }}>
      <Form>
      <Form.Group className='mb-3'>
          <Form.Label>Id</Form.Label>
          <Form.Control ref={candidateIdref} placeholder='Add Id'></Form.Control>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Candidiate Name</Form.Label>
          <Form.Control
            ref={candidateName}
            placeholder='Enter Candidate Name'
          ></Form.Control>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Party</Form.Label>
          <Form.Control
            ref={party}
            placeholder='Enter Party Name'
          ></Form.Control>
        </Form.Group>


      </Form>

      <Button
        disabled={disableButton}
        onClick={sendToBlockChain}
        variant='primary'
      >
        Submit
      </Button>
    </Container>
  );
};

export default NewPoll;
