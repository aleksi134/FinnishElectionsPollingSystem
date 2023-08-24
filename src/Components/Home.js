import { Tab } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Table, Container, Button } from "react-bootstrap";

const Home = (props) => {
  const [promptList, changePromptList] = useState([]);
  const [buttonStatus, changeButtonStatus] = useState(false);
  const [showresults, changeResultsDisplay] = useState(false);

  useEffect(() => {
    const getPrompts = async () => {
      changePromptList(await window.contract.getAllIds());
      console.log(await window.contract.getAllIds());
    };
    getPrompts();
  }, []);

  return (
    <Container>
      <Table style={{ margin: "5vh" }} striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Id</th>
            <th>Name</th>
            <th>Party</th>
            <th>Votes</th>
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
                <td>{" "}</td>
                <td>{" "}</td>
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
