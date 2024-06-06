import React, { useState } from "react";
import styles from "./Sidebar.module.scss";
import clx from "classnames";
import { ServiceSession } from "@customTypes/order";
import Camera from "@icons/Camera";
import People from "@icons/People";
import { ServiceSessionOptionCard } from "@newComponents/Cards/ServiceSessionOptionCard/ServiceSessionOptionCard";
import { LinkIcon } from "@icons/LinkIcon";
import { ServiceInfoBox } from "@newComponents/_grouped";
import { ClientPortal } from "@newComponents/portal";
import Modal from "@newComponents/Modal/Modal";
import { DollarCircleIcon } from "@icons/DollarCircleIcon";
import { ClockSolidCircleIcon } from "@icons/ClockSolidCircleIcon";

type Props = {
  services: ServiceSession[];
  selected?: ServiceSession | null;
  handleSelect?: (opt: ServiceSession) => void;
  handleSubmit?: (opt: ServiceSession) => void;
};

export const MentorServicesSession = ({
  services,
  selected,
  handleSelect,
  handleSubmit,
}: Props) => {
  const [detailsService, setDetailsService] = useState<ServiceSession | null>(
    null
  );


  return services.length ? (
    <>
      <ClientPortal selector="modal-root" show={!!detailsService}>
        {detailsService ? (
          <Modal
            title={detailsService.sessionType}
            closeHandler={() => setDetailsService(null)}
          >
            <div className={styles.modalRows}>
              <div className={styles.rowInfo}>
                {detailsService.sessionPrice ? (
                  <div className={styles.infoCell}>
                    <DollarCircleIcon />
                    {Math.ceil(detailsService.sessionPrice)} zł/h
                  </div>
                ) : null}
                {detailsService.meetTime ? (
                  <div className={styles.infoCell}>
                    <ClockSolidCircleIcon />
                    {detailsService.meetTime} min
                  </div>
                ) : null}
              </div>
              <div
                className={styles.rowDescription}
                dangerouslySetInnerHTML={{
                  __html: detailsService.description,
                }}
              />
            </div>
          </Modal>
        ) : null}
      </ClientPortal>
      <div className={styles.cards}>
        {services.map((s) => (
          <ServiceSessionOptionCard
            key={s.id}
            {...s}
            handleSelect={handleSelect ? () => handleSelect(s) : undefined}
            selected={s === selected}
            handleDetails={() => setDetailsService(s)}
          />
        ))}
      </div>
      {handleSubmit ? (
        <button
          onClick={selected ? () => handleSubmit(selected) : undefined}
          className={styles.submitBtn}
        >
          Zarezerwuj termin
        </button>
      ) : null}

      <ServiceInfoBox
        title="Informacje dotyczące sesji"
        meetingForm="video"
        maxAttendees={5}
        information="Link do spotkania dostaniesz po zatwierdzeniu terminu"
      />
    </>
  ) : (
    <p>Brak usług do wyświetlenia</p>
  );
};
