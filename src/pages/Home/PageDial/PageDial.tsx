import React from "react";
import styles from "./PageDial.module.css";

interface Props {
  currentPage: number; //Current page no.
  totalPages: number; //Total number of available pages

  onClick: (num: number) => void; //a function that will take the number that was pressed and update state above.

  displayTotal?: number; //Use either 9 or 7 only! Defaults to 9.
  color?: string; //use this  to change the color of the component. Defaults to purple.
}

const Dial: React.FC<Props> = (props) => {
  // const { currentPage, totalPages, color, onClick } = props;
  //let { displayTotal } = props;

  const displayTotal =
    props.displayTotal !== undefined ? props.displayTotal : 9;
  const itemColor = props.color !== undefined ? props.color : "#7b1fa2";

  const pageDial: string[] = [];
  const sidePush = (displayTotal - 1) / 2;

  /**
   * current page = 2
   */
  pageDial.push(props.currentPage.toString());

  /*
    Attemp to push sidepush amount of items to the left side of current page
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
    Attemp to push sidepush amount of items to the right side of current page
       1 -  2  - 3 4 5
   */
  for (let i: number = 1; i <= sidePush; i++) {
    const itemAtLastIndex: number = Number(pageDial[pageDial.length - 1]);

    if (itemAtLastIndex + 1 <= props.totalPages) {
      const item: string = (itemAtLastIndex + 1).toString();

      pageDial.push(item);
    }
  }

  //Attemp to fill unused item spaces
  if (pageDial.length !== props.displayTotal) {
    //determines how many spaces to the left of the current page was not filled
    const left: number = sidePush - (props.currentPage - Number(pageDial[0]));

    //determines how many spaces to the right of the current page was not filled
    const right: number =
      sidePush - (Number(pageDial[pageDial.length - 1]) - props.currentPage);

    if (left > right) {
      //alot more missing to the left

      //we try to make up for missing items, on the right of currentpage, by the left amount

      for (let i: number = 1; i <= left; i++) {
        const itemAtLastIndex: number = Number(pageDial[pageDial.length - 1]);

        if (itemAtLastIndex + 1 <= props.totalPages) {
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
   * Makes the dial even more conventient by adding in ... and first and final page
   * No support for ... is added though.
   */

  if (pageDial.length === displayTotal) {
    if (Number(pageDial[0]) !== 1) {
      pageDial.shift();
      pageDial.shift();
      pageDial.unshift("...");
      pageDial.unshift("1");
    }

    if (Number(pageDial[pageDial.length - 1]) !== props.totalPages) {
      pageDial.pop();
      pageDial.pop();
      pageDial.push("...");
      pageDial.push(props.totalPages.toString());
    }
  }

  pageDial.unshift("<<");
  pageDial.push(">>");

  // console.log("Current Page: ", props.currentPage);
  // console.log("Total Item view: ", props.displayTotal);
  // console.log(pageDial);
  // console.log("Total Number of Pages", props.totalPages);

  const onDialClickHandler = (
    key: string,
    current_page: number,
    total_pages: number
  ) => {
    if (key.includes("...")) {
      return;
    } else if (key.includes(">>")) {
      if (current_page + 1 <= total_pages && current_page !== total_pages)
        props.onClick(current_page + 1);
      return;
    } else if (key.includes("<<")) {
      if (current_page - 1 > 0) props.onClick(current_page - 1);
      return;
    } else {
      props.onClick(Number(key));
    }
  };

  const dialItems: JSX.Element[] = pageDial.map((item, i) => {
    // const active: String =
    //   Number(pageDial[i]) === currentPage ? " " + styles.dial__item_active : "";
    let active: boolean;

    if (
      pageDial[i].includes("...") ||
      pageDial[i].includes(">>") ||
      pageDial[i].includes("<<")
    )
      active = false;
    else {
      active = Number(pageDial[i]) === props.currentPage ? true : false;
    }

    return (
      <li
        key={pageDial[i] + Math.random().toString()}
        className={styles.dial__item} //{styles.dial__item + active}
        style={{
          color: active ? "#ffffff" : itemColor,
          //width: (100 / displayTotal).toString() + "%", //fraction of the whole
          // borderRight: lastItemBorderFix,
          // color: active.trim() !== "" ? "ffffff" : itemColor,
          // color: active ? "#ffffff" : itemColor,
          // background: active ? itemColor : "",
        }}
        onClick={(): void => {
          onDialClickHandler(pageDial[i], props.currentPage, props.totalPages);
        }}
      >
        <p
          onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
            (e.target as HTMLElement).style.background = itemColor;
            (e.target as HTMLElement).style.color = "#ffffff";
          }}
          onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
            if (!active) {
              (e.target as HTMLElement).style.background = "";
              (e.target as HTMLElement).style.color = itemColor;
            } else {
              (e.target as HTMLElement).style.color = "#ffffff";
              (e.target as HTMLElement).style.background = itemColor;
            }
          }}
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            onDialClickHandler(
              pageDial[i],
              props.currentPage,
              props.totalPages
            );
            if (!active) (e.target as HTMLElement).style.color = "#ffffff";
            //(e.target as HTMLElement).style.background = "";
          }}
          className={styles.dial__item_active_corrector}
          style={{
            background: active ? itemColor : "",
          }}
        >
          {pageDial[i]}
        </p>
      </li>
    );
  });

  return (
    <ul
      className={styles.dial}
      // style={{ width: ((displayTotal * 47.5) / 10).toString() + "rem" }}
    >
      {dialItems}
    </ul>
  );
};

export default Dial;
