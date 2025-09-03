import { useState, useEffect } from "react";
import axios from "axios";
import io from 'socket.io-client';

function Text() {
  const [text, setText] = useState("");
  const [textObject, setTextObject] = useState([]);

  useEffect(() => {
    handleTextObject();

    const socketUrl = import.meta.env.MODE === 'production'
    ? window.location.origin // Connect to same domain in production
    : 'http://localhost:5000'; // Connect to backend server in development

    // Create socket connection
    const socket = io(socketUrl);
    
    // Listen for textObject events from server
    socket.on("textObject", (data) => {
      // Update state with the new item
      setTextObject(prevTextObject => [...prevTextObject, data.data]);
      // console.log(data);
    });

    // Clean up socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, [])

  useEffect(() => {
    console.log(textObject);
  }, [textObject])

  // useEffect(() => {
  //   console.log("Rendering....");
  // },)

  useEffect(() => {
  if (textObject.length > 0) {
    if(!(textObject[textObject.length - 1].state)){
      setTextObject(prev =>
      prev.map(item => ({ ...item, state: true }))
    );
    }
  }
}, [textObject]);

  const handleTextObject = async () => {
    try {
      const response = await axios.get("/products/list");
      // console.log("Response:", response.data.products);
      setTextObject(response.data.products)
    } catch (error) {
      console.error("Error getting item:", error);
    }
  }

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleAdd = async () => {
    if (text.trim()) {
      try {
        // Make POST request
        const response = await axios.post("/products/addItem", {
          item: text, // sending as { item: "text" }
        });

        // Update state only if request is successful
        // setTextObject([...textObject, {name: text}]);
        setText("");
      } catch (error) {
        console.error("Error adding item:", error);
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <input
          className="border w-50 px-5"
          onChange={handleChange}
          type="text"
          value={text}
        />
        <button className="cursor-pointer" onClick={handleAdd}>Add</button>
        <div className="h-[200px] w-50 border overflow-auto ">
          {textObject.map((item, index) => (
            <div key={index}>{item.name}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Text;
