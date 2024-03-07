import React, { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [toDo, setToDo] = useState([]);
  const [doing, setDoing] = useState([]);
  const [done, setDone] = useState([]);

  const toDoRef = useRef();
  const doingRef = useRef();
  const doneRef = useRef();

  function heandleClick(type) {
    if (type == "to do") {
      if (toDoRef.current.value) {
        const toDoData = {
          text: toDoRef.current.value,
          id: Date.now(),
        };
        let data = JSON.parse(localStorage.getItem("todo"))
          ? JSON.parse(localStorage.getItem("todo"))
          : [];
        data.push(toDoData);
        setToDo(data);
        localStorage.setItem("todo", JSON.stringify(data));
      } else {
        toDoRef.current.focus();
      }
      toDoRef.current.value = "";
    }
    if (type == "doing") {
      if (doingRef.current.value) {
        const toDoingData = {
          text: doingRef.current.value,
          id: Date.now(),
        };
        let data = JSON.parse(localStorage.getItem("doing"))
          ? JSON.parse(localStorage.getItem("doing"))
          : [];
        data.push(toDoingData);
        setDoing(data);
        localStorage.setItem("doing", JSON.stringify(data));
      } else {
        doingRef.current.focus();
      }
      doingRef.current.value = "";
    }
    if (type == "done") {
      if (doneRef.current.value) {
        const doneData = {
          text: doneRef.current.value,
          id: Date.now(),
        };
        let data = JSON.parse(localStorage.getItem("done"))
          ? JSON.parse(localStorage.getItem("done"))
          : [];
        data.push(doneData);
        setDone(data);
        localStorage.setItem("done", JSON.stringify(data));
      } else {
        doneRef.current.focus();
      }
      doneRef.current.value = "";
    }
  }
  useEffect(() => {
    if (localStorage.getItem("todo")) {
      setToDo(JSON.parse(localStorage.getItem("todo")));
    }
    if (localStorage.getItem("doing")) {
      setDoing(JSON.parse(localStorage.getItem("doing")));
    }
    if (localStorage.getItem("done")) {
      setDone(JSON.parse(localStorage.getItem("done")));
    }
    if (localStorage.getItem("all")) {
      setAll(JSON.parse(localStorage.getItem("all")));
    }
  }, []);

  function heandleDragStart(e, element) {
    e.dataTransfer.setData("todo", JSON.stringify(element));
  }

  const handleDrop = (event, type) => {
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer.getData("todo"));

    let dataDone = JSON.parse(localStorage.getItem("done"))
      ? JSON.parse(localStorage.getItem("done"))
      : [];
    dataDone = dataDone.filter((el) => {
      return el.id != data.id;
    });
    let dataDoing = JSON.parse(localStorage.getItem("doing"))
      ? JSON.parse(localStorage.getItem("doing"))
      : [];
    dataDoing = dataDoing.filter((el) => {
      return el.id != data.id;
    });
    let dataDo = JSON.parse(localStorage.getItem("todo"))
      ? JSON.parse(localStorage.getItem("todo"))
      : [];
    dataDo = dataDo.filter((el) => {
      return el.id != data.id;
    });

    setToDo(dataDo);
    setDoing(dataDoing);
    setDone(dataDone);

    if (type == "todo") {
      dataDo.push(data);
      localStorage.setItem("todo", JSON.stringify(dataDo));
    }
    if (type == "doing") {
      dataDoing.push(data);
      localStorage.setItem("doing", JSON.stringify(dataDoing));
    }
    if (type == "done") {
      dataDone.push(data);
      localStorage.setItem("done", JSON.stringify(dataDone));
    }
    localStorage.setItem("todo", JSON.stringify(dataDo));
    localStorage.setItem("doing", JSON.stringify(dataDoing));
    localStorage.setItem("done", JSON.stringify(dataDone));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  function heandleDelete(type, id) {
    if (type == "todo") {
      let data = JSON.parse(localStorage.getItem("todo"));
      data = data.filter((el) => {
        return el.id != id;
      });
      localStorage.setItem("todo", JSON.stringify(data));
      setToDo(data);
    }
    if (type == "doing") {
      let data = JSON.parse(localStorage.getItem("doing"));
      data = data.filter((el) => {
        return el.id != id;
      });
      localStorage.setItem("doing", JSON.stringify(data));
      setDoing(data);
    }
    if (type == "done") {
      let data = JSON.parse(localStorage.getItem("done"));
      data = data.filter((el) => {
        return el.id != id;
      });
      localStorage.setItem("done", JSON.stringify(data));
      setDone(data);
    }
  }

  function heandleChange(type, element) {
    if (type == "todo") {
      let data = JSON.parse(localStorage.getItem("todo"));
      data = data.filter((el) => {
        return el.id != element.id;
      });
      toDoRef.current.focus();
      toDoRef.current.value = element.text;
      localStorage.setItem("todo", JSON.stringify(data));
      setToDo(data);
    }
    if (type == "doing") {
      let data = JSON.parse(localStorage.getItem("doing"));
      data = data.filter((el) => {
        return el.id != element.id;
      });
      doingRef.current.focus();
      doingRef.current.value = element.text;
      localStorage.setItem("doing", JSON.stringify(data));
      setDoing(data);
    }
    if (type == "done") {
      let data = JSON.parse(localStorage.getItem("done"));
      data = data.filter((el) => {
        return el.id != element.id;
      });
      doneRef.current.focus();
      doneRef.current.value = element.text;
      localStorage.setItem("done", JSON.stringify(data));
      setDone(data);
    }
  }

  return (
    <div className="wrapper">
      <div className="heading">
        <h2>Menage card</h2>
      </div>
      <div className="items">
        <div
          droppable
          onDrop={(e) => handleDrop(e, "todo")}
          onDragOver={handleDragOver}
          className="toDo"
        >
          <div className="default">
            <h3>Card</h3>
            <div className="inp__btn">
              <input ref={toDoRef} type="text" placeholder="Enter to do..." />
              <button onClick={() => heandleClick("to do")}>Add</button>
            </div>
          </div>
          <div className="list__wrapper">
            {toDo
              ? toDo.map((el, index) => {
                  return (
                    <div
                      key={index}
                      draggable
                      onDragStart={(e) => heandleDragStart(e, el)}
                      className="list"
                    >
                      <p>{el.text}</p>
                      <div className="actions">
                        <svg
                          onClick={() => heandleChange("todo", el)}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
                        </svg>
                        <svg
                          onClick={() => heandleDelete("todo", el.id)}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                        </svg>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
        <div
          droppable
          onDrop={(e) => handleDrop(e, "doing")}
          onDragOver={handleDragOver}
          className="doing"
        >
          <div className="default">
            <h3>Card</h3>
            <div className="inp__btn">
              <input
                ref={doingRef}
                type="text"
                placeholder="Enter doing work..."
              />
              <button onClick={() => heandleClick("doing")}>Add</button>
            </div>
          </div>
          <div className="list__wrapper">
            {doing
              ? doing.map((el, index) => {
                  return (
                    <div
                      key={index}
                      onDragStart={(e) => heandleDragStart(e, el)}
                      draggable
                      className="list"
                    >
                      <p>{el.text}</p>
                      <div className="actions">
                        <svg
                          onClick={() => heandleChange("doing", el)}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
                        </svg>
                        <svg
                          onClick={() => heandleDelete("doing", el.id)}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                        </svg>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
        <div
          droppable
          onDrop={(e) => handleDrop(e, "done")}
          onDragOver={handleDragOver}
          className="done"
        >
          <div className="default">
            <h3>Card</h3>
            <div className="inp__btn">
              <input
                ref={doneRef}
                type="text"
                placeholder="Enter done work..."
              />
              <button onClick={() => heandleClick("done")}>Add</button>
            </div>
          </div>
          <div className="list__wrapper">
            {done
              ? done.map((el, index) => {
                  return (
                    <div
                      key={index}
                      draggable
                      onDragStart={(e) => heandleDragStart(e, el)}
                      className="list"
                    >
                      <p>{el.text}</p>
                      <div className="actions">
                        <svg
                          onClick={() => heandleChange("done", el)}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
                        </svg>
                        <svg
                          onClick={() => heandleDelete("done", el.id)}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                        </svg>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
