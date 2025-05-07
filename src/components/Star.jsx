import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

const Star = ({ stars }) => {
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;

    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <FaStar size={20} className="text-yellow-400"/>
        ) : stars >= number ? (
          <FaStarHalfAlt size={20} className="text-yellow-400"/>
        ) : (
          <AiOutlineStar size={20} className="text-gray-400"/>
        )}
      </span>
    );
  });

  return(
    <div className="flex justify-start items-center">
     {ratingStar}
    </div>
  )
};

export default Star;
