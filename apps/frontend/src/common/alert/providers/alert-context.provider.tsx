import { createContext, useCallback, FC, ReactNode, useMemo, useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import { AlertOptions, IAlert } from '../types/alert.types';

export type AlertContextType = {
  showAlert: (options: AlertOptions) => void;
};

export const AlertContext = createContext<AlertContextType | undefined>(undefined);

type PropsType = {
  children: ReactNode;
};

export const AlertContextProvider: FC<PropsType> = ({ children }) => {
  const [alerts, setAlerts] = useState<IAlert[]>([]);

  const reducedAlerts = alerts?.reduce((result: IAlert[], currentValue: IAlert) => {
    const found = result.find((a) => a.title === currentValue.title);

    if (found && found.counter) {
      found.counter += 1;
    } else {
      result.push({ ...currentValue, counter: 1 });
    }
    return result;
  }, []);

  const handleRemoveFirstAlert = () => {
    setAlerts((prevAlerts) => {
      const nextAlerts = [...prevAlerts];
      if (nextAlerts.find((a) => a.title === prevAlerts[0]?.title)) {
        return nextAlerts.filter((a) => a.title !== prevAlerts[0]?.title);
      }
      nextAlerts.shift();
      return nextAlerts;
    });
  };

  const handleRemoveAlert = (alert: IAlert) => {
    const alertsAfterRemove = reducedAlerts.filter((a) => a.id !== alert.id);
    setAlerts(alertsAfterRemove);
  };

  const handleAddAlert = useCallback(
    (options: AlertOptions) => {
      setAlerts((prevAlerts) => [...prevAlerts, { id: new Date().getTime(), ...options }]);
    },
    [setAlerts],
  );

  const value: AlertContextType = useMemo(
    () => ({
      showAlert: handleAddAlert,
    }),
    [handleAddAlert],
  );

  useEffect(() => {
    let timeoutSuccess: NodeJS.Timeout;

    if (alerts.length > 0) {
      timeoutSuccess = setTimeout(() => {
        handleRemoveFirstAlert();
      }, 4000);
    }

    return () => {
      clearTimeout(timeoutSuccess);
    };
  }, [alerts]);

  return (
    <AlertContext.Provider value={value}>
      {children}
      <Stack spacing={2} sx={{ position: 'fixed', width: '400px', bottom: 24, right: 24, zIndex: 9999 }}>
        {reducedAlerts.map((alert) => (
          <Alert onClose={() => handleRemoveAlert(alert)} key={alert.id} severity={alert.type} sx={{ width: '100%' }}>
            <AlertTitle>{alert.title}</AlertTitle>
            {alert.description}
            <Box sx={{ position: 'absolute', right: '16px', bottom: 0, fontWeight: 700, fontSize: '16px' }}>
              {alert?.counter && alert.counter > 1 && `${alert.counter}`}
            </Box>
          </Alert>
        ))}
      </Stack>
    </AlertContext.Provider>
  );
};
