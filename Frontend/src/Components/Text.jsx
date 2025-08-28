import { useState, useEffect } from "react";
import axios from "axios";

function Text() {
  const [text, setText] = useState("");
  const [textObject, setTextObject] = useState([]);

  useEffect(() => {
    handleTextObject();
  }, [])

  useEffect(() => {
    console.log("rendering")
  }, [textObject])

  const handleTextObject = async () => {
    try {
      const response = await axios.get("/products/list");
      console.log("Response:", response.data.products);
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
        setTextObject([...textObject, {name: text}]);
        setText("");
      } catch (error) {
        console.error("Error adding item:", error);
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col">
        <input
          className="border w-50 px-5"
          onChange={handleChange}
          type="text"
          value={text}
        />
        <button onClick={handleAdd}>Add</button>
        <div className="h-[200px] w-50 border overflow-auto">
          {textObject.map((item, index) => (
            <div key={index}>{item.name}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Text;
