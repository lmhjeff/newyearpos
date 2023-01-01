"use client";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useCallback, useState } from "react";

const marvelList = [
  {
    id: "ironMan",
    name: "Iron Man",
    color: "#f43a72",
  },
  {
    id: "captain",
    name: "Captain",
    color: "#2340ff",
  },
  {
    id: "hulk",
    name: "Hulk",
    color: "#5cfc94",
  },
  {
    id: "thanos",
    name: "Thanos",
    color: "#fff763",
  },
];

const Draganddrop = () => {
  const [character, setCharacter] = useState(marvelList);

  // // using useCallback is optional
  // const onBeforeCapture = useCallback(() => {
  //   /*...*/
  // }, []);
  // const onBeforeDragStart = useCallback(() => {
  //   /*...*/
  // }, []);
  // const onDragStart = useCallback(() => {
  //   /*...*/
  // }, []);
  // const onDragUpdate = useCallback(() => {
  //   /*...*/
  // }, []);
  const onDragEnd = (result: any) => {
    // the only one that is required
    console.log(result);
    if (!result.destination) return;
    const items = Array.from(character);
    const [reorderedItem] = items.splice(result.source.index, 1);

    items.splice(result.destination.index, 0, reorderedItem);
    console.log("items", items);
    setCharacter(items);
  };

  const remove = (id: string) => {
    setCharacter(character.filter((cha) => cha.id !== id));
  };

  return (
    <div className="text-white flex flex-col justify-center items-center mx-auto">
      <p>I am orders page</p>
      <div className="w-1/2">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="character">
            {(provided) => (
              <ul
                className="flex flex-col space-y-4"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {character.map(({ id, name, color }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className="flex flex-row items-center w-full p-2 border-white border-2 rounded-lg list-none"
                        >
                          <div
                            className={`w-8 h-8 rounded-full bg-[${color}]`}
                          ></div>
                          <p>{name}</p>
                          <button
                            onClick={() => remove(id)}
                            className="w-4 h-4 bg-red-400 rounded-full"
                          >
                            x
                          </button>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Draganddrop;
