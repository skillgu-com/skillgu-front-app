import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserProfileHeader } from "@newComponents/_grouped";
import { LangSwitcherConnected } from "@newComponents/_connected/lang-switcher/LangSwitcher";

export interface StudentData {
  cover_url: string;
  avatar_url: string;
  id: string;
  firstName: string;
  lastName: string;
  location: string;
  profession: string;
  jobPosition: {
    id: number;
    name: string;
  }[];
}

export const StudentProfilePage = () => {
  const { id: studentId } = useParams();
  const [student, setStudent] = useState<null|StudentData>(null);
  const [pending, setPending] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  // @TODO: get user id from sesion/jwt
  const studentIsLoggedUser = true;

  useEffect(() => { 
    setError('')
    setPending(true)
    try {
      //fetch student data
      setStudent({
        cover_url: "/images/header-banner-bg.jpg",
        avatar_url: "/images/img_avatar.png",
        id: '1',
        firstName: "Marcin",
        lastName: "Kowalski",
        location: "Kraków",
        profession: "Spawacz",
        jobPosition: [{
          id: 1,
          name: 'Spawacz',
        }],
      })
    } catch (e) {
      setError('Wystąpił błąd podczas pobierania danych')
    }
    setPending(false)
  }, [studentId]);

  return (
    <>
    {error ? (
      <p>ERROR: {error}</p>
    ) : null}
    {pending ? (
      <p>Pending...</p>
    ) : null}
    {student ? (<UserProfileHeader
      avatarUrl="/images/img_avatar.png"
      company="Google"
      coverUrl="/images/header-banner-bg.jpg"
      fullname={student?.firstName + " " + student?.lastName}
      langSwitcher={<LangSwitcherConnected />}
      location={student?.location}
      profession={student?.jobPosition?.map((j) => j.name).join(", ")}
    />) : null}
    </>
  );
};
