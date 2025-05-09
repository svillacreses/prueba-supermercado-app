interface CustomCardProps {
  children: React.ReactNode;
  title?: string;
  borderColor?: string; // TW border color class
}

const CustomCard = (props: CustomCardProps) => (
  <div className="transition duration-900 ease-in-out data-closed:opacity-0">
    <div
      className={`rounded-3xl overflow-hidden shadow-lg bg-white dark:bg-[#1a1a1a] ${
        props.borderColor ? "p-4" : "p-1"
      }`}
    >
      <div
        className={props.borderColor ? "border-5 rounded-2xl" : ""}
        style={{ borderColor: props.borderColor }}
      >
        <div className="px-7 py-6 pt-5 flex flex-col items-center">
          {props.title && (
            <div className="font-bold text-lg mb-3">{props.title}</div>
          )}
          {props.children}
        </div>
      </div>
    </div>
  </div>
);

export default CustomCard;
