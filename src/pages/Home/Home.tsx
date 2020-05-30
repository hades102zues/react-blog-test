import React, { useState } from "react";
import styles from "./Home.module.css";
import PageDial from "./PageDial/PageDial";

interface State {
  page: number;
  total: number;
  display: number;
}

const Home: React.FC = () => {
  const page: number = 6;
  const total: number = 10000;
  const display: number = 7;

  const [state, setState] = useState({ page: 6, total: 100000000, display: 7 }); //useState triggers a double render. put things u dont want acted upon twice in useEffect

  const pageDialClickHandler = (nextPage: number): void => {
    //function that sets the current page number
    setState({
      page: nextPage,
      total: state.total,
      display: state.display,
    } as State);
  };

  console.log("Home: ", state.page);
  return (
    <div className={styles.home}>
      <PageDial
        currentPage={state.page}
        totalPages={state.total}
        onClick={pageDialClickHandler}
        displayTotal={display}
      />
    </div>
  );
};

export default Home;

/*
  Invalid current page to total pages
  Probably will adjust the display total based on the device width ^.^ , but how would that would be done in javascript....

*/
