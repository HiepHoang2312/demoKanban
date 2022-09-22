import React, { useState } from "react";
import "../Kanban/Kanban.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
const Kanban = () => {
  const initialData = {
    tasks: {
      1: {
        id: 1,
        content: {
          image: "",
          title: "Gear up for Mt.Fuji",
          content: "",
          ul: [],
          date: "2022-01-31",
          progress: "20%",
          background: "bg-white",
          backgroundImage: "bg-white",
        },
        type: "cardWithImage",
      },
      2: {
        id: 2,
        content: {
          title: "Shopping list:",
          ul: ["milk", "Eggs", "Bread", "Soda", "Chips"],
          background: "pink",
          content: "",
        },
        type: "note",
      },
      3: {
        id: 3,
        content: {
          title: " Draft onboarding documentation for design team",
          content: "  Refer documentation templates from company wiki",
          date: "2022-01-31",
          ul: [],
          background: "bg-white",
        },
        type: "card",
      },
      4: {
        id: 4,
        content: {
          title: "Call aunt ASAP!",
          ul: [
            "Rorys library books are overdue",
            "Millie's dentist appointment is cancelled",
          ],
          content: "",
          background: "yellow",
        },
        type: "note",
      },
      5: {
        id: 5,
        content: {
          title: "Finalize presentation deck",
          type: "noteWhite",
          ul: [
            "Deck theme as per brand guidelines",
            "Limit to 12 slides",
            "Use images from image bank only.",
            "Divide amongst presenters. (Not more than two.)",
          ],
          content: "",
          date: "2021-02-27",
          background: "bg-white",
          progress: "50%",
        },
        type: "card",
      },
      6: {
        id: 6,
        content: {
          title: "Upcoming performance reviews:",

          ul: [
            "Jacob",
            "Aubrey",
            "Devon (Postponed!)",
            "Katie",
            "Bassam",
            "Gerald",
          ],
          background: "violet",
        },
        type: "note",
      },
      7: {
        id: 7,
        content: {
          title: "Progress meeting with jason.",
          content: "Take notes. Ask question affter",
          date: "2021-05-25",
          background: "bg-white",
          ul: [],
          progress: "100%",
        },
        type: "card",
      },
      8: {
        id: 8,
        content: {
          title: "",
          content:
            "Log-in extra hours on company portal. Refer your personal Notion database for hours worked",
          background: "green",
          ul: [],
        },
        type: "note",
      },
      9: {
        id: 9,
        content: {
          title: "Update travel mood-boad with pics",
          content: "Link here",
          date: "2021-05-25",
          image: "",
          background: "bg-white",
          progress: "100%",
        },
        type: "cardWithImage",
      },
      10: {
        id: 10,
        content: {
          title: "Delegate tasks for next week.",
          date: "2021-05-26",
          content: "",
          ul: [],
          background: "bg-white",
          progress: "100%",
        },
        type: "card",
      },
      11: {
        id: 11,
        content: {
          title: "Update Figma dev-team file by Monday!",
          content: "Aubrey to Edit pages 2 to 14, katie to assist if needed.",
          date: "2021-02-22",
          ul: [],
          backgroundImage: "gradiant",
          background: "bg-white",
          progress: "100%",
        },
        type: "cardWithImage",
      },
      12: {
        id: 12,
        content: {
          title: "Schedule 1-on-1 with Team.",
          date: "2021-05-21",
          content: "",
          ul: [],
          background: "bg-white",
          progress: "100%",
        },
        type: "card",
      },
      13: {
        id: 13,
        content: {
          title: "Dont  Forget  to  mediate!",
          ul: [],
          background: "bg-blue-200",
        },
        type: "note",
      },
      14: {
        id: 14,
        content: {
          title: "",
          content: "Inbox ZERO! (Every Fri-Day)",
          background: "yellow",
          ul: [],
        },
        type: "note",
      },
    },
    columns: {
      "column-1": {
        id: "column-1",
        title: "TO DO",
        taskIds: [1, 2, 3, 4],
      },
      "column-2": {
        id: "column-2",
        title: "IN-PROGRESS",
        taskIds: [5, 6],
      },
      "column-3": {
        id: "column-3",
        title: "DONE",
        taskIds: [7, 8, 9, 10, 11],
      },

      "column-4": {
        id: "column-4",
        title: "Archive",
        taskIds: [12, 13, 14],
      },
    },
    // Facilitate reordering of the columns
    columnOrder: ["column-1", "column-2", "column-3", "column-4"],
  };
  const [idSelectColumn, SetIdSelectColomn] = useState("");
  const [typeForm, SetTypeForm] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [info, SetInfo] = useState();
  const [state, setState] = useState(initialData);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let leng = [];
    for (let i in state.tasks) {
      leng.push(i);
    }
    const id = leng.length + 1;
    const content = {
      ...data,
      ul: [],
      background: "bg-white",
      progress: "100%",
    };
    const data1 = { content, id, type: "card" };
    state.tasks[id] = { ...data1 };
    state.columns[idSelectColumn].taskIds.push(id);
    setShowModal(false);
    SetIdSelectColomn(null);
    reset(data);
  };
  const onRemove = (data) => {
    const idSelectkanban = info.id;
    console.log(idSelectkanban, "idSelectkanban");
    delete state.tasks.idSelectkanban;
    const kanbanRemove = state.columns[idSelectColumn.id].taskIds.filter(
      (item) => item !== idSelectkanban,
    );
    state.columns[idSelectColumn.id].taskIds = kanbanRemove;
    setShowInfo(false);
  };

  const handleCloseInfo = () => {
    setShowInfo(false);
    SetInfo(null);
    SetIdSelectColomn(null);
  };
  const reorderColumnList = (sourceCol, startIndex, endIndex) => {
    const newTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = newTaskIds.splice(startIndex, 1);
    newTaskIds.splice(endIndex, 0, removed);

    const newColumn = {
      ...sourceCol,
      taskIds: newTaskIds,
    };

    return newColumn;
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const sourceCol = state.columns[source.droppableId];
    const destinationCol = state.columns[destination.droppableId];

    if (sourceCol.id === destinationCol.id) {
      const newColumn = reorderColumnList(
        sourceCol,
        source.index,
        destination.index,
      );

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
      setState(newState);
      return;
    }

    const startTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = startTaskIds.splice(source.index, 1);
    const newStartCol = {
      ...sourceCol,
      taskIds: startTaskIds,
    };

    const endTaskIds = Array.from(destinationCol.taskIds);
    endTaskIds.splice(destination.index, 0, removed);
    const newEndCol = {
      ...destinationCol,
      taskIds: endTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      },
    };

    setState(newState);
  };

  return (
    <div className="bodyKanban">
      <div className={showModal ? "" : "hidden"}>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">Thêm Card</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"></span>
                </button>
              </div>
              <div className="py-6 px-6 lg:px-8">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Your Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      {...register("title")}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="content"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Content
                    </label>
                    <input
                      type="text"
                      name="content"
                      id="content"
                      {...register("content")}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    />
                  </div>
                  <div>
                    <input type="date" {...register("date")} />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white gradiant focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    Thêm
                  </button>
                </form>
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={showInfo ? "" : "hidden"}>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">Info</h3>
              </div>
              <div className="py-6 px-6 lg:px-8">
                <form className="space-y-6" onSubmit={handleSubmit(onRemove)}>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="title"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Your Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder={info?.content.title}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        disabled
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="content"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Content
                      </label>
                      <input
                        type="text"
                        name="content"
                        id="content"
                        placeholder={info?.content.content}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        disabled
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className=" text-white gradiant focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    Xóa
                  </button>
                </form>
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => handleCloseInfo()}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-16 flex  px-16 gap-5">
        <DragDropContext onDragEnd={onDragEnd}>
          {state.columnOrder.map((columnId) => {
            const column = state.columns[columnId];
            const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

            return (
              <div
                className={`${column.id} items-center w-1/4 kanban-row rounded-lg px-6 pb-8 h-auto`}
                key={column.id}
                column={column}
                tasks={tasks}
              >
                <div className="flex justify-between items-center mt-6 mb-11  title-Kanban">
                  <h1 className="">{column.title}</h1>
                  <button
                    className="border px-5 bg-red-400 rounded-lg hover:bg-red-500"
                    onClick={() => {
                      setShowModal(true);
                      SetIdSelectColomn(column.id);
                      SetTypeForm("create");
                    }}
                  >
                    +
                  </button>
                </div>
                <Droppable droppableId={column.id} key={column.id}>
                  {(droppableProvided) => (
                    <div
                      ref={droppableProvided.innerRef}
                      {...droppableProvided.droppableProps}
                    >
                      {tasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={`${task.id}`}
                          index={index}
                        >
                          {(draggableProvided, draggableSnapshot) => {
                            if (task.type === "card") {
                              return (
                                <div
                                  ref={draggableProvided.innerRef}
                                  {...draggableProvided.draggableProps}
                                  {...draggableProvided.dragHandleProps}
                                  className={`${task.content.background} mb-5 pb-5 p-2 relative  rounded-lg`}
                                >
                                  <h2 className="title font-bold">
                                    {task.content.title}
                                  </h2>
                                  <ul className="list-disc mx-5 text-sm">
                                    {task.content?.ul.map((b, index) => (
                                      <li key={index}>{b}</li>
                                    ))}
                                  </ul>
                                  <div className="content text-sm">
                                    {task.content.content}
                                  </div>
                                  <input
                                    type="date"
                                    value={task.content.date}
                                    disabled
                                    className="content mt-2"
                                  />
                                  <div className="absolute w-10 h-10 left-60 bottom-3 border rounded-full bg-red-500"></div>
                                  <div className="absolute right-3 top-1">
                                    <div
                                      className="text-blue-300"
                                      onClick={() => {
                                        setShowInfo(true);
                                        SetInfo(task);
                                        SetIdSelectColomn(column);
                                        SetTypeForm("delete");
                                      }}
                                    >
                                      <i className="fa fa-edit"></i>
                                    </div>
                                  </div>
                                  <div className="relative">
                                    <div
                                      className={`absolute gradiant rounded-lg -bottom-3 left-0 h-1 `}
                                      style={{
                                        width: `${task.content.progress}`,
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              );
                            } else if (task.type === "note") {
                              return (
                                <div
                                  ref={draggableProvided.innerRef}
                                  {...draggableProvided.draggableProps}
                                  {...draggableProvided.dragHandleProps}
                                  className={`${task.content.background} mb-5 pb-5 p-2 relative  rounded-lg`}
                                >
                                  <h2 className="title font-bold">
                                    {task.content.title}
                                  </h2>
                                  <div className="content text-sm">
                                    {task.content.content}
                                  </div>
                                  <ul className="list-disc mx-5 text-sm">
                                    {task.content?.ul.map((b, index) => (
                                      <li key={index}>{b}</li>
                                    ))}
                                  </ul>
                                  <div className="absolute right-3 top-1">
                                    <div
                                      className="text-blue-300"
                                      onClick={() => {
                                        setShowInfo(true);
                                        SetInfo(task);
                                        SetIdSelectColomn(column);
                                        SetTypeForm("delete");
                                      }}
                                    >
                                      <i className="fa fa-edit"></i>
                                    </div>
                                  </div>
                                </div>
                              );
                            } else if (task.type === "cardWithImage") {
                              return (
                                <div
                                  ref={draggableProvided.innerRef}
                                  {...draggableProvided.draggableProps}
                                  {...draggableProvided.dragHandleProps}
                                  className={`${task.content.background} mb-5 pb-5 p-2 relative  rounded-lg`}
                                >
                                  <img
                                    src={task.content.image}
                                    alt={task.content.image}
                                    className={`w-full h-28 ${task.content.backgroundImage}`}
                                  />
                                  <h2 className="title font-bold">
                                    {task.content.title}
                                  </h2>
                                  <div className="content text-sm">
                                    {task.content.content}
                                  </div>
                                  <input
                                    type="date"
                                    value={task.content.date}
                                    disabled
                                    className="content mt-2 "
                                  />
                                  <div className="absolute w-10 h-10 left-60 bottom-3 border rounded-full bg-red-500"></div>
                                  <div className="absolute right-3 top-1">
                                    <div
                                      className="text-blue-300"
                                      onClick={() => {
                                        setShowInfo(true);
                                        SetInfo(task);
                                        SetIdSelectColomn(column);
                                        SetTypeForm("delete");
                                      }}
                                    >
                                      <i className="fa fa-edit"></i>
                                    </div>
                                  </div>
                                  <div className="relative">
                                    <div
                                      className={`absolute gradiant rounded-lg -bottom-3 left-0 h-1 `}
                                      style={{
                                        width: `${task.content.progress}`,
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              );
                            }
                          }}
                        </Draggable>
                      ))}
                      {droppableProvided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
};

export default Kanban;
