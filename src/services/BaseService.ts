import Cookies from 'js-cookie'


class BaseService {
  static getHeaders = (isFile?: boolean) => {
    let headers = new Headers();
    if (!isFile) {
      headers.append("Content-Type", "application/json");
    }
    headers.append("Accept", "application/json");
    headers.append("Access-Control-Allow-Origin", " * ");
    headers.append("Credentials", "same-origin");
    headers.append("Accept-Language", `${Cookies.get('language') || "fr"};q=0.9`);
    return headers;
  };

  static getHeadersAuth = (isFile?: boolean) => {

    let headers = BaseService.getHeaders(isFile);
    let access_token = Cookies.get("userToken")?.toString()
    if (access_token === null) {
      window.location.reload();
    }
    headers.append("Authorization", `Bearer ${access_token}`);
    return headers;
  };


  static getToken = () => {
    return Cookies.get("userToken")?.toString();
  }
  
  static postRequest = async (url: RequestInfo, body: any, required_auth: any) => {
    let head = required_auth
      ? BaseService.getHeadersAuth()
      : BaseService.getHeaders();

    let headers: any = {
      method: "POST",
      headers: head,
      mode: "cors",
      cache: "default",
      body: JSON.stringify(body)
    };

    let response = await fetch(url, headers)
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
      });
    return response;
  };

  static putRequest = async (url: RequestInfo, body: any, required_auth: any) => {
    let head = required_auth
      ? BaseService.getHeadersAuth()
      : BaseService.getHeaders();

    let headers: any = {
      method: "PUT",
      headers: head,
      mode: "cors",
      cache: "default",
      body: JSON.stringify(body)
    };
    let response = await fetch(url, headers)
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
      });
    return response;
  };

  static deleteRequest = async (url: RequestInfo, body: any, required_auth: any) => {
    let head = required_auth
      ? BaseService.getHeadersAuth()
      : BaseService.getHeaders();

    let headers: any = {
      method: "DELETE",
      headers: head,
      mode: "cors",
      cache: "default",
      body: JSON.stringify(body)
    };
    let response = await fetch(url, headers)
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
      });
    return response;
  };

  static getRequest = async (url: RequestInfo, required_auth: any) => {
    let head = required_auth
      ? BaseService.getHeadersAuth()
      : BaseService.getHeaders();

    let headers: any = {
      method: "GET",
      headers: head,
      mode: "cors",
      cache: "default"
    };
    let response = await fetch(url, headers)
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
      });
    return response;
  };
}

export default BaseService;
