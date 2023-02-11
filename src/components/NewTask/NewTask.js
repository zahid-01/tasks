import { useState } from "react";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useFetch from "../hooks/useFetch";

const NewTask = (props) => {
  const firebase = useFetch();
  const [dataObj, setDataObj] = useState("");

  const enterTaskHandler = async (taskText) => {
    const data = await firebase({
      url: "https://start-wars-58d68-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json/",

      options: {
        method: "POST",
        body: JSON.stringify({ text: taskText }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    });
    setDataObj(data);
    const generatedId = data.data.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };
  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={dataObj.isLoading} />
      {dataObj.error && <p>{dataObj.error}</p>}
    </Section>
  );
};

export default NewTask;
