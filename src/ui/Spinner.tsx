import "ldrs/lineSpinner";

function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <l-line-spinner
        size="50"
        stroke="3.5"
        speed="1"
        color="#6A0DAD"
      ></l-line-spinner>
    </div>
  );
}

export default Spinner;
