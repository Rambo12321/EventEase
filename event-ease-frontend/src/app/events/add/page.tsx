import AddEventForm from "@/components/addEventForm/AddEventForm";
import { Vortex } from "@/components/magicUI/Vortex";

//flex-col flex pt-20 min-h-screen text-2xl bg-cover bg-center bg-[url('/addEventBg.svg')]

const AddEventPage = () => {
  return (
    <Vortex
      backgroundColor="black"
      rangeY={800}
      particleCount={800}
      baseHue={120}
      className="flex-col flex pt-20 min-h-screen text-2xl"
    >
      <h1 className="eventHeading mb-10">Add event 🪂</h1>
      <div className="glassEffect p-10 bg-black/40 rounded-md w-fit self-center shadow-[1px_1px_8px] backdrop-blur-xl shadow-amber-50! border-0!">
        <AddEventForm />
      </div>
    </Vortex>
  );
};

export default AddEventPage;
