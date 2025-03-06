import { useRef } from "react";

const AadharInput = ({ formik }) => {
  const inputRefs = [useRef(), useRef(), useRef()];

  const handleInput = (e, index) => {
    if (e.target.value.length === 4 && index < 2) {
      inputRefs[index + 1].current.focus();
    }
  };

  return (
    <div>
      <div>
        <label className="font-medium">Aadhar Number</label>
      </div>
      <div className="flex space-x-2">
        {["aadharPart1", "aadharPart2", "aadharPart3"].map((field, index) => (
          <input
            key={field}
            type="text"
            {...formik.getFieldProps(field)}
            placeholder="XXXX"
            maxLength="4"
            ref={inputRefs[index]}
            onInput={(e) => handleInput(e, index)}
            className="input border-[1px] border-gray-300 p-2 text-center rounded-md w-1/3"
          />
        ))}
      </div>
    </div>
  );
};

export default AadharInput;
