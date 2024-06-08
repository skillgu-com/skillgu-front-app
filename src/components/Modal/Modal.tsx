// Libraries
import React from "react";
import clx from "classnames";
// Components
import { Title } from "../typography";
// Assets
import CloseSvg from "src/assets/icons/CloseSvg";
// Styles
import styles from "./Modal.module.scss";
// Types
import { Common } from "src/types/main";
import { TitleTag, TitleVariant } from "../typography/Title/Title";

interface ModalProps extends Common {
  className?: string;
  classNameContent?: string
  title: string;
  closeHandler: () => void;
}

const Modal = (props: ModalProps) => {
  const { title, children, closeHandler } = props;

  return (
    <div className={clx(styles.wrapper, props.className)}>
      <div className={clx(styles.content, props.classNameContent)}>
        <div className={styles.header}>
          <Title
            tag={TitleTag.h3}
            variant={TitleVariant.standard}
            classes={styles.title}
          >
            {title}
          </Title>
          <button className={styles.close} onClick={closeHandler}>
            <CloseSvg width={15} height={13} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
