import { Link, Form } from "react-router-dom";
import { useState, useEffect } from "react";

const Profile = ({ action }) => {
  const [input1, setInput1] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  useEffect(() => {
    if (input1.lenght > 1) return;
    const newImage = [];
    input1.forEach((image) => newImage.push(URL.createObjectURL(image)));
    setImageURLs(newImage);
  }, [input1]);

  const onImageChange = (e) => {
    setInput1([...e.target.files]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    action(input1);
  };

  return (
    <>
      <div className="profile-card">
        <h1 className="title-profile">Profile</h1>

        <div className="info-box">
          <div className="box-1">
            <form onSubmit={handleSubmit}>
              <label>
                Choose Image
                <br />
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={onImageChange}
                  name="image1"
                />
                {imageURLs.map((imageSrc) => (
                  <img className="img" src={imageSrc} />
                ))}
              </label>
            </form>
          </div>

          <div className="box-2">
            <input
              className="about-me"
              type="text"
              placeholder="enter information about you"
            ></input>
            <br />
            <br />
            <button>Add</button>
          </div>
          <div className="box-3">
            <Link to="http://localhost:5173/links/add">click here to shorten a url</Link>

            <br />
            <br />
          </div>
          <div className="box-4"></div>
        </div>

        {/* <fieldset><legend>paste a url</legend></fieldset> */}
      </div>
    </>
  );
};

export default Profile;
