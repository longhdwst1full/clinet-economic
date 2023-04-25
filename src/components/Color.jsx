import React from "react";

const Color = ({ data, setColor }) => {
  return (
    <>
      <ul className="colors ps-0">
        {data &&
          data.map((colorItem, index) => {
            return (
              <li
                style={{ backgroundColor: colorItem.color }}
                onClick={() => setColor(colorItem._id)}
                className="cursor-pointer"
                key={index}
              ></li>
            );
          })}
      </ul>
    </>
  );
};

export default Color;
