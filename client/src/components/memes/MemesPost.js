import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Row, Col, Button, Form } from "react-bootstrap";

const MemesPost = () => {
  const dispatch = useDispatch();

  const [bottomTexts, setBottomTexts] = useState();
  const [colors, setColors] = useState();
  const [fontSize, setFontSize] = useState();
  const [verticalAlign, setVerticalAlign] = useState();

  const [horizontalAlign, setHorizontalAlign] = useState();
  const [memes, setMemes] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    async function getMemes() {
      const response = await fetch("http://localhost:5000/api/memes");
      const json = await response.json();
      setMemes(json.data);
      // dispatch(getMemes());
    }
    getMemes();
  }, [dispatch]);

  const onHandleCreateMeme = async (e) => {
    e.preventDefault();
    if (!file) alert("Please choose a image");
    const formData = new FormData();
    formData.append("image", file);
    formData.append(
      "texts",
      JSON.stringify([
        {
          size: 32,
          color: "WHITE",
          alignmentX: "VERTICAL_ALIGN_LEFT",
          alignmentY: "VERTICAL_ALIGN_BOTTOM",
          content: bottomTexts,
        },
      ])
    );
    const response = await fetch("http://localhost:5000/api/memes", {
      method: "POST",
      body: formData,
    });
    let json = await response.json();
    console.log({ json });
    setMemes([json.data, ...memes]);
  };
  return (
    <div>
      <Row>
        <Col sm={3}>
          {" "}
          <input
            className="mt-3 container-fluid p-1"
            type="text"
            placeholder="Text content"
            onChange={(e) => setBottomTexts(e.target.value)}
          ></input>
          <Row className="m-2">
            <Col>
              <p>Color</p>
              <p>Font Size</p>
              <p>Vertical Align</p>
              <p>Horizontal Align</p>
            </Col>
            <Col>
              <select onChange={(e) => setColors(e.target.value)}>
                <option value="BLACK">BLACK</option>
                <option value="WHITE">WHITE</option>
              </select>
              <p>
                <select onChange={(e) => setFontSize(e.target.value)}>
                  <option>8</option>
                  <option>16</option>
                  <option>32</option>
                  <option>64</option>
                  <option>128</option>
                </select>
              </p>
              <p>
                <select onChange={(e) => setVerticalAlign(e.target.value)}>
                  <option>Left</option>
                  <option>Center</option>
                  <option>Right</option>
                </select>
              </p>
              <p>
                <select onChange={(e) => setHorizontalAlign(e.target.value)}>
                  <option>Bottom</option>
                  <option>Middle</option>
                  <option>Top</option>
                </select>
              </p>
            </Col>
          </Row>
        </Col>
        <Col sm={9} className="container">
          <h1> Create memes</h1>
          <form>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            ></input>
            <Button variant="info" onClick={onHandleCreateMeme}>
              Upload
            </Button>
          </form>
          {memes.map((m) => {
            const url =
              "http://localhost:5000/" + m.outputMemePath.split("public/")[1];

            return <img key={m.id} src={url}></img>;
          })}
        </Col>
      </Row>
    </div>
  );
};

export default MemesPost;
