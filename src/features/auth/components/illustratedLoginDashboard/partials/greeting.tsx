import { memo } from "react";

const Title = memo(
  (): React.JSX.Element => (
    <div className="flex items-center mb-12">
      <div className="w-8 h-8 bg-white rounded-md mr-2"></div>
      <span className="text-xl font-semibold">Formación Primera Infancia</span>
    </div>
  )
);

const Greeting = memo(
  (): React.JSX.Element => (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold mb-4">Bienvenidas y bienvenidos</h1>
      <p className="text-blue-100">
        QUITAR ESTO - Get a real intranet on top of your Office 365 environment, with Upteamist.
      </p>
    </div>
  )
);

const Circles = memo(
  (): React.JSX.Element => (
    <>
      <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-300 rounded-full"></div>
      <div className="absolute top-12 -right-8 w-6 h-6 bg-blue-300 rounded-full"></div>
      <div className="absolute -bottom-8 left-8 w-12 h-3 bg-blue-400 rounded-full"></div>
    </>
  )
);

Title.displayName = "MemorizedTitle";
Greeting.displayName = "MemorizedGreeting";
Circles.displayName = "MemorizedCircles";

export { Title, Greeting, Circles };
