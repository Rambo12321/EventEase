import { useRef, useState } from "react";

enum choiceSet {
  Private = "Private",
  Global = "Global",
}

const Dropdown = (props: {
  width: string;
  topOffset: string;
  onSelect: (value: choiceSet.Private | choiceSet.Global) => void;
}) => {
  const [toggle, setToggle] = useState(false);
  const [choice, setChoice] = useState<choiceSet>(choiceSet.Global);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickButton = () => {
    setToggle(!toggle);
    console.log("Button toggled. Curr State -> ", toggle);
  };
  const selectOption = (currChoice: choiceSet) => {
    console.log("Choice made -> ", currChoice);
    setChoice(currChoice);
    setToggle(false);
    props.onSelect(currChoice);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClickButton}
        className="addEventFormInput w-full! cursor-customPointer flex"
      >
        <div className="flex w-full">
          {choice ? (
            choice == "Global" ? (
              "🌍 Global"
            ) : (
              "🔒 Private"
            )
          ) : (
            <>Select an Option</>
          )}
        </div>
        <span>👇🏻</span>
      </button>
      <div
        ref={dropdownRef}
        style={{ width: `${props.width}px`, top: `${props.topOffset}px` }}
        className={`flex flex-col z-50 absolute w-[${props.width}px] top-[${
          props.topOffset
        }px] rounded-md py-1.5 transition-all ease-in-out duration-1000  ${
          toggle
            ? "translate-y-0"
            : "-translate-y-10 pointer-events-none opacity-0 -z-10"
        }`}
      >
        <button
          type="button"
          onClick={() => {
            selectOption(choiceSet.Private);
          }}
          className="rounded-t-sm backdrop-blur-xl bg-black/85 border-b-1 border-b-sky-400/60 border-dotted hover:bg-amber-600/90 hover:text-white"
        >
          🔒 Private
        </button>
        <button
          value={choiceSet.Global}
          type="button"
          onClick={() => {
            {
              selectOption(choiceSet.Global);
            }
          }}
          className="rounded-b-md backdrop-blur-xl bg-black/80 hover:bg-amber-600/90 hover:text-white"
        >
          🌍 Global
        </button>
      </div>
    </>
  );
};

export default Dropdown;
