import AppLayout from "../../../component/AppLayout";
import {useContext} from "react";
import {AuthContext} from "../../../context/AuthContextProvider";

const CalendarView = () => {

    const {user} = useContext(AuthContext);
    console.log(user);
    console.log('Uzytkownik po autentykacji: ', user.firstName);



    return (
        <AppLayout>
           <>
               <div>
                   <h1>Kalendarz</h1>
               </div>
           </>
        </AppLayout>
    );
};

export default CalendarView;