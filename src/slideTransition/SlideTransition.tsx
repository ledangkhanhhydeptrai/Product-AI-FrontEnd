import { Slide, SlideProps } from "@mui/material";
interface SlideTransitionsProps extends Omit<
  SlideProps,
  "direction" | "children"
> {
  children: React.ReactElement;
}
export default function SlideTransitions({
  children,
  ...props
}: SlideTransitionsProps) {
  return (
    <Slide {...props} direction="left">
      {children}
    </Slide>
  );
}
