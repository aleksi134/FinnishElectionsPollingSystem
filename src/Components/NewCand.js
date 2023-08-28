import React, { useEffect, useRef, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const NewCand = (props) => {
  const candidateName = useRef();
  const partyName = useRef();
  const candidateIdref = useRef();
  const [buttonStatus, changeButtonStatus] = useState(false);


  useEffect(() => {
    const getStatus = async () => {
    console.log(await window.contract.votingStarted())
    changeButtonStatus(await window.contract.votingStarted())
    };
    getStatus();
  }, []);

  const sendToBlockChain = async () => {

    await window.contract.addToIDArray({ id: candidateIdref.current.value });

    await window.contract.addCandidate({
      id: candidateIdref.current.value,
      name: candidateName.current.value,
      party: partyName.current.value,
    });


    alert("Candidate added");
    document.getElementById("form").reset();

  };

  const startVote = async () => {
    changeButtonStatus(true);
    await window.contract.startVoting();
    alert("Voting has started");
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
      
      <Form.Group className='mb-3'>
      <Button
        onClick={sendToBlockChain}
        variant='primary'
        disabled={buttonStatus}
      >
        Submit
      </Button>
      </Form.Group>
      <Form.Group className='mb-3'>
      <Button
        onClick={startVote}
        variant='primary'
        disabled={buttonStatus}
      >
        Start vote
      </Button>
      </Form.Group>

      </Form>
    </Container>
  );
};

export default NewCand;