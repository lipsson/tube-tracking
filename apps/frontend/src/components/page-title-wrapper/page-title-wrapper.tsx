import { FC } from 'react';
import { Container, } from '@mui/material';
import { ChildrenNodeType } from '@/common/types/children-element.types';
import { PageTitleWrapperStyle } from '../styles/page.styles';


export const PageTitleWrapper: FC<ChildrenNodeType> = ({ children }) => {
  return (
    <PageTitleWrapperStyle className="MuiPageTitle-wrapper">
      <Container maxWidth="lg">{children}</Container>
    </PageTitleWrapperStyle>
  );
};
