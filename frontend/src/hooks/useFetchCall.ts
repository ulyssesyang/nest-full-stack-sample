import {useState, useEffect} from 'react'

export enum HTTP_Method {
    GET   = "GET",
    PUT   = "PUT",
    POST  = "POST",
    PATCH = "PATCH",
}

export enum HttpStatusCode {
    OK = 200,
    CREATED = 201,
    SUCCESS_NO_CONTENT = 204
}

export interface IRequestInfo {
    Headers?: {};
    Method: HTTP_Method.GET | HTTP_Method.PUT | HTTP_Method.POST | HTTP_Method.PATCH;
    EndPoint: string;
    RequestBody?: object;
}

export interface IResponseInfo {
    Data: any;
    hasError: boolean;
}

export function fetchPromise(requestInfo: IRequestInfo) {
    return new Promise((resolve: any, reject: any) => {
        const fetchURL = requestInfo.EndPoint;
        const fetchData = {
          body: requestInfo.RequestBody ? JSON.stringify(requestInfo.RequestBody) : "",
          headers: requestInfo.Headers ? requestInfo.Headers : {},
          method: requestInfo.Method
        };
  
        fetch(fetchURL, fetchData).then((response: Response) => {
          switch (response.status) {
            case HttpStatusCode.OK:
            case HttpStatusCode.CREATED:
            case HttpStatusCode.SUCCESS_NO_CONTENT:
              response.clone().json().then((data: any) => {
                resolve(data);
              }).catch(() => {
                // Log the Error
                resolve(null);
              });
              break;
            default:
              response.clone().json().then((data: any) => {
                reject(data);
              }).catch(() => {
                // Log the Error
                reject(null);
              });
          }
        }).catch((error: Error) => {
          // Log the Error
          reject(error);
        });
      });
}

export default function useFetchCall(props: IRequestInfo): [IResponseInfo, boolean, React.Dispatch<React.SetStateAction<IRequestInfo>>] {

    const [isFetching, setIsFetching] = useState(false);
    const [requestInfo, setRequest] = useState(props);
    const [responseInfo, setResponse] = useState({} as IResponseInfo);
  
    useEffect(() => {
      if (Object.keys(requestInfo).length === 0 && requestInfo.constructor === Object)
        return;
  
      const promise = fetchPromise(requestInfo);
  
      setIsFetching(true);
  
      promise.then(
        (httpResponse: any) => {
          setResponse({ Data: httpResponse, hasError: false, });
          setIsFetching(false);
        },
        (error: Error) => {
          setResponse({ Data: error, hasError: true, });
          setIsFetching(false);
        });
    }, [requestInfo]);
  
    return [responseInfo, isFetching, setRequest];
}
