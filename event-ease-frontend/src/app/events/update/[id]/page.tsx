import UpdateEventForm from "@/components/UpdateEventForm/UpdateEventForm";

const UpdateEvent = () => {
  return (
    <div className="flex flex-col h-screen mt-[11px] relative backdrop-blur-sm">
      <div className="pt-8 self-center my-auto h-fit rounded-lg border-1 bor w-150 bg-blue-300/10">
        <h1 className="text-center font-newsReader text-4xl text-amber-200">
          Update your event
        </h1>
        <UpdateEventForm />
      </div>
    </div>
  );
};

export default UpdateEvent;
