import React, { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../../store';
import routePaths from '../../paths';

const RouteRuleNonAuthorized: FC<PropsWithChildren> = function Component({
  children,
}) {
  const auth = useAppSelector((state) => state.auth);

  if (auth.isLogged) {
    return <Navigate to={routePaths.QUOTES} replace />;
  }
  return <>{children}</>;
};
export default RouteRuleNonAuthorized;
