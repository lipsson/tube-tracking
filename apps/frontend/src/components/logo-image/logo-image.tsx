import { LogoImageStyle } from "../styles/logo.styles";

export const LogoImage = () => {
  return (
    <LogoImageStyle srcSet={`/assets/blood-sample.png`}
      src={`/assets/blood-sample.png`}
      alt='sample' />
  );
};
