import { Link } from "react-router-dom";
import { FaLeftLong } from "react-icons/fa6";
import { FaSpinner } from "react-icons/fa";

export const Prev = () => (
  <Link to={-1} title="Back">
    <button className="my-2 rounded-full hover:text-blue-500">
      <FaLeftLong className="text-lg" />
    </button>
  </Link>
);

export const Spinner = () => (
  <div className="w-full flex justify-center items-center min-h-[calc(100vh-4rem)]">
    <FaSpinner className="animate-spin text-5xl" />
  </div>
);

export const Label = ({ children, id }) => (
  <label htmlFor={id} className={`block leading-relaxed font-medium`}>
    {children}
  </label>
);
Label.propTypes;

export const Select = ({ children, id, onChange }) => (
  <select name={id} id={id} onChange={onChange} className={`border focus:outline-none p-2 rounded w-full`}>
    <option value={0}>--Select {id}--</option>
    {children}
  </select>
);
Select.propTypes;
