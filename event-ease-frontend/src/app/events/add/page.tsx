import AddEventForm from "@/components/addEventForm/AddEventForm";

const AddEventPage = () => {
  return (
    <div className="flex-col flex pt-20 min-h-screen text-2xl bg-cover bg-center bg-[url('/addEventBg.svg')]">
      <h1 className="eventHeading mb-10">Add event 🪂</h1>
      <div className="glassEffect p-10 bg-black/40 rounded-md w-fit self-center">
        <AddEventForm />
      </div>
    </div>
  );
};

export default AddEventPage;
