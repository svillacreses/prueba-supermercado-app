import Image from "next/image";

interface CustomImageProps {
  src?: string;
  alt?: string;
  maxHeight: string;
  objecFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
  priority?: boolean;
  disabled?: boolean;
}

const CustomImage = ({
  src,
  alt,
  maxHeight,
  priority = false,
  objecFit = "cover",
  disabled = false,
}: CustomImageProps) => {
  if (src && alt)
    return (
      <Image
        fill
        priority={priority}
        sizes={`(max-height: ${maxHeight})`}
        style={{ objectFit: objecFit, opacity: disabled ? 0.5 : 1 }}
        alt={alt}
        src={src}
      />
    );
  return (
    <div
      className={`bg-white dark:bg-gray-800 w-full h-full ${
        disabled ? "opacity-50" : ""
      } font-[family-name:var(--font-geist-mono)] flex items-center justify-center`}
    >
      N / A
    </div>
  );
};

export default CustomImage;
