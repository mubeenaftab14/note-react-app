import queryString from "query-string";
import { useMemo } from "react";
import { useLocation, useNavigate, useParams, Location, To, NavigateOptions } from "react-router-dom";

function useRouter<T = any, P = any>(): {
  query: T;
  params: P;
  pathname: string;
  location: Location;
  push(path: To, state?: NavigateOptions): void;
  replace(path: To, state?: NavigateOptions): void;
  includeRoute(route: string): boolean;
} {
  const params: any = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const query = useMemo<T>(
    () =>
      ({
        ...queryString.parse(location.search),
        ...params,
      } as T),
    [params, location.search]
  );

  return useMemo(() => {
    return {
      params,
      push: navigate,
      replace: (path, state) => navigate(path, { ...state, replace: true }),
      pathname: location.pathname,
      query,
      location,
      includeRoute: (route) => location.pathname.toUpperCase().includes(route.toUpperCase())
    };
  }, [navigate, location, query, params]);
}

export default useRouter;
