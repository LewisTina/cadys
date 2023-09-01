import BaseService from "./BaseService";
import { UserUrl } from "./urls";

class UserService {
  static getDefaultData = () =>
    BaseService.getRequest(UserUrl.FETCH_DEFAULT_DATA, false);  
  
  static getUserData = () =>
    BaseService.getRequest(UserUrl.GET_AUTH_ME, true);

  static getFiles = (filename: any) =>
    BaseService.getRequest(filename, false);

  static getCompanyMissions = (data?: any) =>
    BaseService.getRequest(data ? `${UserUrl.GET_BRAND_MISSIONS}?state=${data.state}` : `${UserUrl.GET_BRAND_MISSIONS}`, true);

  static getMissionByUuid = (uuid: string) =>
    BaseService.getRequest(`${UserUrl.GET_MISSION}?uuid=${uuid}`, true);


  static postLoginData = (data: any) =>
    BaseService.postRequest(UserUrl.POST_AUTH_LOGIN, data, false);

  static postManagerData = (data: any) =>
    BaseService.postRequest(UserUrl.POST_MANAGER_DATA, data, false);

  static postBrandData = (data: any) =>
    BaseService.postRequest(UserUrl.POST_BRAND_DATA, data, false);

  static postMissionData = (data: any) =>
  BaseService.postRequest(UserUrl.POST_MISSION_DATA, data, false);
  
  
  
  static putCodeRegister = (data: any) =>
    BaseService.putRequest(`${UserUrl.PUT_REGISTER_VALIDATE}?code=${data.code}`, data, false);

  static putCodeRegisterResend = (data: any) =>
    BaseService.putRequest(UserUrl.PUT_REGISTER_RESEND_C, data, false);

  static putEmailDataRecovery = (data: any) =>
    BaseService.putRequest(UserUrl.PUT_AUTH_PASSWORD_RECOVERY, data, false);

  static putCodeDataRecovery = (data: any) =>
    BaseService.putRequest(UserUrl.PUT_AUTH_VALIDATE_CR, data, false);
  
  static putResetPassword = (data: any) =>
    BaseService.putRequest(UserUrl.PUT_AUTH_RESET_PASSWORD, data, false);

  static putManagerData = (data: any) =>
    BaseService.putRequest(UserUrl.PUT_USERS_ME, data, true);

  static putPasswordData = (data: any) =>
    BaseService.putRequest(UserUrl.PUT_USERS_PASSWORD, data, true);

  static putBrandData = (data: any) =>
    BaseService.putRequest(UserUrl.PUT_BRAND_DATA, data, true);

  static putAcceptMission = (data: any) =>
    BaseService.putRequest(UserUrl.PUT_MISSION_ACCEPT, data, true);

  static putMissionState = (data: any) =>
    BaseService.putRequest(UserUrl.PUT_MISSION_STATE, data, true);

}

export default UserService;
