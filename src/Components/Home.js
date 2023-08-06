import { Tab } from "bootstrap";
import React, { useEffect, useState, useRef} from "react";
import { Table, Container, Button, Form } from "react-bootstrap";
import MaterialTable from "material-table";
import Select from 'react-select'

  const Home= (props) => {
    const First_name = useRef();
    const Last_name = useRef();
    const Personal_identity_code = useRef();
  
    const candidate= useRef();
  
    const [disableButton, changeDisable] = useState(false);
  
    /*const sendToBlockChain = async () => {
      changeDisable(true);
      await window.contract.addUrl({
        name: candidateName1.current.value,
        url: candidateName1URL.current.value,
      });
  
      await window.contract.addUrl({
        name: candidateName2.current.value,
        url: candidateName2URL.current.value,
      });
  
      await window.contract.addCandidatePair({
        prompt: promptRef.current.value,
        name1: candidateName1.current.value,
        name2: candidateName2.current.value,
      });
  
      await window.contract.addToPromptArray({ prompt: promptRef.current.value });
  
      alert("head back to home page");
    };*/
  
    return (
      <Container style={{ marginTop: "10px" }}>
        <Form>
          <Form.Group className='mb-3'>
            <Form.Label>First name</Form.Label>
            <Form.Control
              ref={First_name}y
              placeholder='Enter first name'
            ></Form.Control>
          </Form.Group>
  
  
          <Form.Group className='mb-3'>
            <Form.Label>Last name</Form.Label>
            <Form.Control
              ref={Last_name}
              placeholder='Enter last Name'
            ></Form.Control>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Personal identity code</Form.Label>
            <Form.Control
              ref={Personal_identity_code}
              placeholder='Enter personal identity code'
            ></Form.Control>
          </Form.Group>
          
  
          <Form.Group className='mb-3'>
            <Form.Label>Candidate</Form.Label>
            <Select></Select>
          </Form.Group>
        </Form>
  
        <Button
          disabled={disableButton}
          /*onClick={sendToBlockChain}*/
          variant='primary'
        >
          Submit
        </Button>
      </Container>
    );
  };

export default Home;
