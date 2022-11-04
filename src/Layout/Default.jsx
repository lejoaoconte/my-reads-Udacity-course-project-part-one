import "./Default.styles.scss";

import { Header } from "components/Header";

export function Default({ children }) {
  return (
    <div className="container">
      <Header />
      {children}
    </div>
  );
}
