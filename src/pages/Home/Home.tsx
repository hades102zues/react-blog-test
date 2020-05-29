import React from "react";
import styles from "./Home.module.css";
import PageDial from "./PageDial/PageDial";

const home: React.FC = () => {
  const page: number = 6;
  const total: number = 1000;
  const display: number = 7;

  return (
    <div className={styles.home}>
      <PageDial
        currentPage={page}
        totalPages={total}
        displayTotal={display} //must be an odd number and should also be ATLEAST 7
        //color="#388E3C"
        onClick={() => null}
      />
    </div>
  );
};

export default home;

/*
  Invalid current page to total pages
  Probably will adjust the display total based on the device width ^.^ , but how would that would be done in javascript....

*/
