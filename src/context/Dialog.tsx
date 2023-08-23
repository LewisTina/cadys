import { createContext, useState } from "react";
import ConfirmationDialog from "../components/ConfirmationDialog";

export const Confirmation = createContext<any>(undefined);

export const ConfirmationProvider: React.FC<{}> = ({ children }) => {

    const [showDialog, setShowDialog] = useState(false)
    const [message, SetMessage] = useState<undefined | any>(undefined)
    const [action, SetAction] = useState<undefined | any>(undefined)
    const [title, SetTitle] = useState<undefined | any>(undefined)

    return <Confirmation.Provider value={{setShowDialog, SetMessage, SetAction, SetTitle}}>
        {

            showDialog &&
            <ConfirmationDialog 
                title={title}
                message={message} 
                ValidateAction={action} 
                CancelAction={()=>{setShowDialog(false)}}
                />
            }
      {children}
    </Confirmation.Provider>
  }