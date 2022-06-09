import React from "react";

const inputForm = ({ handlePostUser }) => {
  return (
    <div className=" p-3 color-4D4C7D">
      <form className="container " onSubmit={handlePostUser}>
        <div className="input-group mb-3 mt-5">
          <input
            type="text"
            className="form-control"
            placeholder="Your name"
            aria-label="Username"
            name="name"
          />
        </div>

        <div className="input-group">
          <span className="input-group-text">
            Total Meal Price &nbsp;<h4>৳</h4>
          </span>
          <textarea
            className="form-control"
            aria-label="With textarea"
            name="price"
          ></textarea>
        </div>
        <div className="mt-4">
          <input type="submit" value="submit" className="btn btn-info" />
        </div>
      </form>
    </div>
  );
};

export default inputForm;
