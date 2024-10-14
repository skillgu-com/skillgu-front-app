import React from "react";
import styles from "../CreateMentoringOffer.module.scss";
import { CreateOfferTemplates } from "../CreateOfferTemplates";
import Button, { ButtonTag, ButtonVariant } from "src/components/Button/Button";
import { PlusIcon } from "@icons/PlusIcon";
import { useNavigate } from "react-router-dom";

export const AddScheduleMsg = ({disabled=false}: {disabled?:boolean}) => {
  const navigate = useNavigate();
  return (
    <CreateOfferTemplates title="Harmonogram spotkań" subtitle="" step={1}>
      <div className={styles.addSchedule}>
        <div className={styles.scheduleMsgImgBox}>
          <img
            width="503.26px"
            height="263.02px"
            src="/images/create-mentoring-schedule-warning.svg"
            alt="woman payment"
          />
          <p>Aby ustalić swoje plany, najpierw ustal choć 1 harmonogram</p>
        </div>

        <div className={styles.btnBox}>
          <Button
            as={ButtonTag.Button}
            onClick={()=>navigate("/schedules/add-schedule")}
            variant={ButtonVariant.Outline}
            type="button"
            classes={styles.scheduleBtn}
            disableButton={disabled}
          >
            <span>Nowy harmonogram</span>
            <PlusIcon size={"24px"} />
          </Button>
        </div>
      </div>
    </CreateOfferTemplates>
  );
};
