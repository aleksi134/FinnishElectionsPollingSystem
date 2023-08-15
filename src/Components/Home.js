import { Tab } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Table, Container, Button } from "react-bootstrap";

const Home = (props) => {
  const [promptList, changePromptList] = useState([]);
  const [electionEndTimes, setElectionEndTimes] = useState({}); // State for storing end times

  useEffect(() => {
    const getPromptsAndEndTimes = async () => {
      const prompts = await window.contract.getAllPrompts();
      changePromptList(prompts);

      // Fetch end times for each prompt
      const endTimes = {};
      for (const prompt of prompts) {
        const endTime = await window.contract.getElectionEndTime({ prompt: prompt });
        endTimes[prompt] = endTime;
      }
      setElectionEndTimes(endTimes);
    };

    getPromptsAndEndTimes();
  }, []);

  const calculateRemainingTime = (endTime) => {
    const currentTime = new Date().getTime();
    const remainingTime = Math.max(0, endTime - currentTime);
    const remainingHours = Math.floor(remainingTime / (1000 * 60 * 60));
    return remainingHours;
  };

  return (
    <Container>
      <Table style={{ margin: "5vh" }} striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>List of Polls</th>
            <th>Go to Poll</th>
            <th>Election Ends in: </th>
          </tr>
        </thead>
        <tbody>
          {promptList.map((el, index) => {
            const endTime = electionEndTimes[el] || 0; // Fetch end time from state
            const endTimeInHours = calculateRemainingTime(endTime);
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{el}</td>
                <td>
                  {" "}
                  <Button onClick={() => props.changeCandidates(el)}>
                    Go to Poll
                  </Button>
                </td>
                <td>{endTimeInHours} hours</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default Home;
