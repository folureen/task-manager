import Header from "components/ui/header";
import { ReactNode } from "react";

type Props = {
  main: ReactNode;
};

const MainLayout: React.FC<Props> = ({ main }) => {
  return (
    <>
      <Header />
      {main}
    </>
  );
};

export default MainLayout;
