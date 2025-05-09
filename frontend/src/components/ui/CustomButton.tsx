import CustomLoading from "./CustomLoading";

interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
  dense?: boolean;
  loading?: boolean;
}

const CustomButton = ({
  children,
  onClick,
  className = "",
  disabled = false,
  type = "button",
  variant = "primary",
  dense = false,
  loading = false,
}: CustomButtonProps) => {
  disabled = disabled || loading;
  return (
    <button
      className={`cursor-pointer font-medium text-sm sm:text-base w-full sm:w-auto rounded-full border border-solid transition-colors ${
        dense ? "px-2 sm:px-3 p-1" : "px-4 sm:px-5 py-2"
      } flex items-center justify-center ${
        variant === "primary"
          ? "border-black/[.9] bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc]"
          : "border-white/[.3] bg-[#000000] hover:bg-[#101010]"
      } disabled:cursor-not-allowed disabled:bg-[#383838] disabled:text-[#ccc] disabled:hover:bg-[#383838] disabled:hover:border-transparent ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
      {loading && (
        <div className="ml-2">
          <CustomLoading sizeClassName="w-4 h-4" />
        </div>
      )}
    </button>
  );
};

export default CustomButton;
