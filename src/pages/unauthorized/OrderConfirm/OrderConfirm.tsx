import React from "react";
import { useParams } from "react-router-dom";
import { SectionTemplate } from "src/components/SectionTemplate";

export const OrderConfirmPage = () => {
  const { id } = useParams<{ id: string | "" }>();

  return (
    <main>
      <SectionTemplate title="">
        <p></p>
      </SectionTemplate>
    </main>
  );
};
