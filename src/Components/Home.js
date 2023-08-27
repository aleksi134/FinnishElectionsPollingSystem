import { Tab } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Table, Container, Button } from "react-bootstrap";

const Home = (props) => {
  const [promptList, changePromptList] = useState([]);
  const [candList, changecandList] = useState([]);
  const [voteList, changevotelist] = useState([]);
  const [buttonStatus, changeButtonStatus] = useState(false);
  const [showresults, changeResultsDisplay] = useState(false);
  const [candidate, changeCanditate] = useState("--");

  useEffect(() => {
    const fetchData = async () => {
      // Fetch prompt list
      const prompts = await window.contract.getAllIds();
      changePromptList(prompts);

      // Fetch and set candidate list
      const candidatePromises = prompts.map(async (id) => {
        const candidateInfo = await window.contract.getCandidate({id: id});
        return candidateInfo;
      });
      const candidates = await Promise.all(candidatePromises);
      changecandList(candidates);

      // Fetch and set vote list
      const votePromises = prompts.map(async (id) => {
        const votes = await window.contract.getVotes({id: id});
        return votes;
      });
      const votes = await Promise.all(votePromises);
      changevotelist(votes);

      // Fetch other data and update states here
    };

    fetchData();
  }, []);

  const addVote = async (index) => {
    changeButtonStatus(true);
    await window.contract.addVote({
      prompt: localStorage.getItem("prompt"),
      index: index,
    });

    await window.contract.recordUser({
      prompt: localStorage.getItem("prompt"),
      user: window.accountId,
    });

    let voteCount = await window.contract.getVotes({
      prompt: localStorage.getItem("prompt"),
    });
    changeVote1(voteCount[0]);
    changeVote2(voteCount[1]);
    changeResultsDisplay(true);
  };


  

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
                <td>{candList[index] && candList[index][0]}</td>
                <td>{candList[index] && candList[index][1]}</td>
                <td>{voteList[index]}</td>
                <td>
                  {" "}
                  <Button disabled={buttonStatus} onClick={() => addVote(0)}>
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
