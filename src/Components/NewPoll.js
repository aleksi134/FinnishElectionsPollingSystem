import React, { useRef, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const NewPoll = (props) => {
  const candidateName = useRef();
  const partyName = useRef();
  const candidateIdref = useRef();




  const sendToBlockChain = async () => {

    await window.contract.addCandidate({
      id: candidateIdref.current.value,
      name: candidateName.current.value,
      party: partyName.current.value,
    });

    await window.contract.addToIDArray({ id: candidateIdref.current.value });

    alert("Candidate added");
    document.getElementById("form").reset();

  };

  return (
    <Container style={{ marginTop: "10px" }}>
      <Form id="form">
      <Form.Group className='mb-3'>
          <Form.Label>Id</Form.Label>
          <Form.Control 
          ref={candidateIdref} 
          placeholder='Add Id'
          ></Form.Control>
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
            ref={partyName}
            placeholder='Enter Party Name'
          ></Form.Control>
        </Form.Group>

      </Form>

      <Button
        onClick={sendToBlockChain}
        variant='primary'
      >
        Submit
      </Button>
    </Container>
  );
};

export default NewPoll;