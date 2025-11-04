import AllUserEvents from "@/components/allUserEvents/AllUserEvents";

const EventsPage = () => {
  return (
    <div className="h-screen bg-[url('/background.svg')] -mt-17 bg-cover bg-center">
      <div className="pt-20">
        <h1 className="font-bold font-shadows text-8xl text-amber-300 text-center">
          All events of user 👇🏻
        </h1>
        <div className=" flex gap-x-12 gap-y-8 p-12 glassEffect mt-8 flex-wrap">
          <AllUserEvents />
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
