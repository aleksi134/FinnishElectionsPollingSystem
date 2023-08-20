import { Tab } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Table, Container, Button } from "react-bootstrap";

const Home = (props) => {
  const [promptList, changePromptList] = useState([]);

  useEffect(() => {
    const getPrompts = async () => {
      changePromptList(await window.contract.getAllPrompts());
      console.log(await window.contract.getAllPrompts());
    };
    getPrompts();
  }, []);
//these need to be properly referenced when contract is complete
  return (
    <Container>
      <Table style={{ margin: "5vh" }} striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Canditate</th>
            <th>Party</th>
            <th>Number of Votes</th>
            <th>Vote</th>
          </tr>
        </thead>
        <tbody>
          {promptList.map((el, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{el}</td>
                <td>{" "}</td>
                <td>{99}</td>
                <td>
                  {" "}
                  <Button onClick={() => props.changeCandidates(el)}>
                    Vote
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default Home;
