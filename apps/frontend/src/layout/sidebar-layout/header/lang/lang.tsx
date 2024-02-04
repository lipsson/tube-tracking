import { useCurrentLanguage } from '@/common/hooks/use-current-language';
import { List, ListItem, ListItemButton } from '@mui/material'
import { changeLanguage } from 'i18next';

export const Lang = () => {
    const currentLanguage = useCurrentLanguage();
    const onChangeLanguage = (lang: string) => async () => {
        await changeLanguage(lang);
    };

    return (
        <>
            <List
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                }}
            >
                <ListItem disablePadding>
                    <ListItemButton
                        disableRipple
                        sx={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: currentLanguage === 'pl' ? 'primary.main' : 'initial',
                            color: currentLanguage === 'pl' ? 'common.white' : 'initial',
                        }}
                        onClick={onChangeLanguage('pl')}
                    >
                        PL
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton
                        disableRipple
                        sx={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: currentLanguage === 'en' ? 'primary.main' : 'initial',
                            color: currentLanguage === 'en' ? 'common.white' : 'initial',
                        }}
                        onClick={onChangeLanguage('en')}
                    >
                        ENG
                    </ListItemButton>
                </ListItem>
            </List>
        </>
    )
}
