import React from "react";
import "./App.css";

const TwitterHandle = ({ twitterHandle }) => (
  <span className="flex font-medium items-center justify-center text-white text-xl">
    <svg
      className="h-5 w-5 fill-current mr-2"
      style={{ color: "#00acee" }}
      x="0px"
      y="0px"
      viewBox="0 0 400 400"
    >
      <path
        d="M350,400H50c-27.6,0-50-22.4-50-50V50C0,22.4,22.4,0,50,0h300c27.6,0,50,22.4,50,50v300
	C400,377.6,377.6,400,350,400z M153.6,301.6c94.3,0,145.9-78.2,145.9-145.9c0-2.2,0-4.4-0.1-6.6c10-7.2,18.7-16.3,25.6-26.6
	c-9.2,4.1-19.1,6.8-29.5,8.1c10.6-6.3,18.7-16.4,22.6-28.4c-9.9,5.9-20.9,10.1-32.6,12.4c-9.4-10-22.7-16.2-37.4-16.2
	c-28.3,0-51.3,23-51.3,51.3c0,4,0.5,7.9,1.3,11.7c-42.6-2.1-80.4-22.6-105.7-53.6c-4.4,7.6-6.9,16.4-6.9,25.8
	c0,17.8,9.1,33.5,22.8,42.7c-8.4-0.3-16.3-2.6-23.2-6.4c0,0.2,0,0.4,0,0.7c0,24.8,17.7,45.6,41.1,50.3c-4.3,1.2-8.8,1.8-13.5,1.8
	c-3.3,0-6.5-0.3-9.6-0.9c6.5,20.4,25.5,35.2,47.9,35.6c-17.6,13.8-39.7,22-63.7,22c-4.1,0-8.2-0.2-12.2-0.7
	C97.7,293.1,124.7,301.6,153.6,301.6"
      />
    </svg>
    @{twitterHandle}
  </span>
);

const TodaysTitle = ({ title }) => (
  <span className="text-xl font-medium text-white text-right">{title}</span>
);
const WebLink = ({ link }) => (
  <span className="text-xl font-medium text-white text-right">
    Website: {link}
  </span>
);

const ChatBox = () => {
  const [msgs, setMsgs] = React.useState([]);
  const [showChat, setShowChat] = React.useState(true);
  React.useEffect(() => {
    const run = async () => {
      console.log("Fetching latest msgs");
      const resp = await fetch("http://localhost:9001/msgs");
      const json = await resp.json();
      setMsgs(json.msgs);
      setShowChat(json.showChat);
    };
    run();
    setInterval(run, 5000);
  }, []);

  return showChat ? (
    <div
      className="antialiased overflow-hidden border rounded border-gray-100"
      style={{ width: "350px", height: "300px" }}
    >
      <ul className="pb-2 h-full overflow-y-auto">
        {msgs.map((m, i) => (
          <li
            key={i}
            className="flex items-center bg-gray-800 px-2 mb-1 rounded-sm py-1 text-sm leading-5 text-white text-left"
          >
            <strong className="w-24 overflow-hidden">{m.username}:</strong>
            <span className="flex-1 ml-1">{m.msg}</span>
          </li>
        ))}
      </ul>
    </div>
  ) : null;
};

function App() {
  const [about, setAbout] = React.useState({
    twitterHandle: "",
    today: "",
    website: "",
  });
  React.useEffect(() => {
    fetch("http://localhost:9001/about")
      .then((d) => d.json())
      .then((json) => {
        setAbout(json);
      });
  }, []);
  return (
    <div className="App relative flex flex-col justify-between h-screen">
      <div className="absolute bottom-0 left-0 mb-10">
        <ChatBox />
      </div>
      <header className="w-screen border-b-2 border-teal-200 flex items-center bg-gray-900 h-8 px-2">
        <div className="flex items-center justify-between w-full">
          <TwitterHandle twitterHandle={about.twitterHandle} />
          <TodaysTitle title={about.today} />
        </div>
      </header>
      <div></div>
      <footer className="px-2 border-t-2 border-teal-200 w-screen bg-gray-900 h-10 text-white flex items-center justify-between">
        <WebLink link={about.website} />
      </footer>
    </div>
  );
}

export default App;
