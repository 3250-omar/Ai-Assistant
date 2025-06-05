import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";

interface NavigateBtnProps {
  down: boolean;
  setDown: (value: boolean) => void;
}
const NavigateBtn = ({ down, setDown }: NavigateBtnProps) => {
  return (
    <a
      className="fixed bottom-20 right-[10%] p-4 rounded-full bg-black/50 cursor-pointer "
      href={down ? "#end-of-messages" : "#top-chat"}
      onClick={() => setDown(!down)}
    >
      {down ? (
        <FaAngleDoubleUp size={30} className="text-white" />
      ) : (
        <FaAngleDoubleDown size={30} className="text-white" />
      )}
    </a>
  );
};

export default NavigateBtn;
