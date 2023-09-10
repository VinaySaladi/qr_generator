import React, { useEffect, useRef, useState } from "react";
// import "./styles.css";
import QRCodeStyling from "qr-code-styling";

const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  image:
    "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
  dotsOptions: {
    color: "#4267b2",
    type: "dots",
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 20,
  },
});

const Home = () => {
  const [input, setInput] = useState("");
  const [fileExt, setFileExt] = useState("png");
  const [selectedColor, setSelectedColor] = useState("#000000");
  const ref = useRef(null);
  console.log(selectedColor);

  useEffect(() => {
    qrCode.append(ref.current);
  }, []);

  useEffect(() => {
    qrCode.update({
      data: input,
    });
  }, [input]);

  const onInputChange = (event) => {
    event.preventDefault();
    setInput(event.target.value);
  };

  const onExtensionChange = (event) => {
    setFileExt(event.target.value);
  };

  const onDownloadClick = () => {
    qrCode.download({
      extension: fileExt,
    });
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  return (
    <div className="App">
      <h1 className="text-center mt-6 text-[#183D3D] text-2xl font-extrabold underline">
        QR Code Generator.
      </h1>
      <div className="flex items-center justify-center mt-4">
        <input
          className="bg-[#F3FDE8] border text-[#053B50] p-2 rounded w-96 text-center"
          value={input}
          onChange={onInputChange}
          placeholder="Enter an input text/link/message Etc..."
        />
        <input type="color" onChange={handleColorChange} />
      </div>
      <div className="flex justify-center items-center h-screen">
        <div
          className="w-96 h-96 flex p-2 border-2 border-teal-900"
          ref={ref}
        />
      </div>
      <div>
        <select onChange={onExtensionChange} value={fileExt}>
          <option value="png">PNG</option>
          <option value="jpeg">JPEG</option>
          <option value="webp">WEBP</option>
        </select>
        <button onClick={onDownloadClick}>Download</button>
      </div>
    </div>
  );
};

export default Home;
