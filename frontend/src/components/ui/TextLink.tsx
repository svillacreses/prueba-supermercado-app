const TextLink = ({
  children,
  forward,
  backward,
  ...props
}: {
  children: React.ReactNode;
  forward?: boolean;
  backward?: boolean;
}) => (
  <div
    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    {...props}
  >
    {backward === true && "←"} {children} {forward === true && "→"}
  </div>
);

export default TextLink;
