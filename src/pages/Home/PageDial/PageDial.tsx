import React from "react";
import styles from "./PageDial.module.css";

interface Props {
  currentPage: number;
  totalPages: number;
  displayTotal: number;
  onClick: (num: number) => void;
}

const dial: React.FC<Props> = (props) => {
  const { currentPage, totalPages, displayTotal } = props;

  const pageDial: string[] = [];
  const sidePush = (displayTotal - 1) / 2;

  /**
   * current page = 2
   */
  pageDial.push(currentPage.toString());

  /*
    Attemp to push 3 items to the left side of current page
       1  - 2
   */
  for (let i: number = 1; i <= sidePush; i++) {
    const itemAtFirstIndex: number = Number(pageDial[0]);

    if (itemAtFirstIndex - 1 > 0) {
      const item: string = (itemAtFirstIndex - 1).toString();

      pageDial.unshift(item);
    }
  }

  /*
    Attemp to push 3 items to the right side of current page
       1 -  2  - 3 4 5
   */
  for (let i: number = 1; i <= sidePush; i++) {
    const itemAtLastIndex: number = Number(pageDial[pageDial.length - 1]);

    if (itemAtLastIndex + 1 <= totalPages) {
      const item: string = (itemAtLastIndex + 1).toString();

      pageDial.push(item);
    }
  }

  //Attemp to fill unused item spaces
  if (pageDial.length !== displayTotal) {
    //determines how many spaces to the left of the current page was not filled
    const left: number = sidePush - (currentPage - Number(pageDial[0]));

    //determines how many spaces to the right of the current page was not filled
    const right: number =
      sidePush - (Number(pageDial[pageDial.length - 1]) - currentPage);

    if (left > right) {
      //alot more missing to the left

      //we try to make up for missing items, on the right of currentpage, by the left amount

      for (let i: number = 1; i <= left; i++) {
        const itemAtLastIndex: number = Number(pageDial[pageDial.length - 1]);

        if (itemAtLastIndex + 1 <= totalPages) {
          const item: string = (itemAtLastIndex + 1).toString();

          pageDial.push(item);
        }
      }
    } else if (right > left) {
      //alot more missing to the right
      //we try to make up for missing items, on the left of currentpage, by the right amount

      for (let i: number = 1; i <= right; i++) {
        const itemAtFirstIndex: number = Number(pageDial[0]);

        if (itemAtFirstIndex - 1 > 0) {
          const item: string = (itemAtFirstIndex - 1).toString();

          pageDial.unshift(item);
        }
      }
    }
  }

  /*
   * The following is not necessary and can be excluded if wish.
   * Makes the dial even more conventient.
   * */

  if (pageDial.length === displayTotal) {
    if (Number(pageDial[0]) !== 1) {
      pageDial.shift();
      pageDial.shift();
      pageDial.unshift("...");
      pageDial.unshift("1");
    }

    if (Number(pageDial[pageDial.length - 1]) !== totalPages) {
      pageDial.pop();
      pageDial.pop();
      pageDial.push("...");
      pageDial.push(totalPages.toString());
    }
  }

  console.log("Current Page: ", currentPage);
  console.log("Total Item view: ", displayTotal);
  console.log(pageDial);
  console.log("Total Number of Pages", totalPages);

  const dialItems: JSX.Element[] = pageDial.map((item, i) => {
    const active: String =
      Number(pageDial[i]) === currentPage ? " " + styles.dial__item_active : "";
    return (
      <li
        className={styles.dial__item + active}
        style={{
          width: (100 / displayTotal).toString() + "%",
        }}
      >
        <p>{pageDial[i]}</p>
      </li>
    );
  });

  return (
    <ul
      className={styles.dial}
      style={{ width: ((displayTotal * 44.5) / 10).toString() + "rem" }}
    >
      {dialItems}
    </ul>
  );
};

export default dial;
