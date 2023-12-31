export const prefix = '/api/';

export const UserUrl = {
    FETCH_DEFAULT_DATA: `${prefix}users/default/data`,
    PUT_USERS_PASSWORD: `${prefix}users/change-password`,
    PUT_USERS_ME: `${prefix}users/me`,

    GET_USER_ME: `${prefix}users/me`,
    MAILER: `${prefix}mailer`,

    GET_MISSION_DATA: `${prefix}mission`,
    GET_MISSION: `${prefix}mission`,
    POST_MISSION_DATA: `${prefix}mission`,
    PUT_MISSION_DATA: `${prefix}mission`,
    PUT_MISSION_STATE: `${prefix}mission/change-state`,
    PUT_MISSION_BRAND: `${prefix}mission/brand-request`,
    PUT_MISSION_ACCEPT: `${prefix}mission/accept-mission`,
    DELETE_MISSION: `${prefix}mission/delete-mission`,

    POST_AUTH_LOGIN: `${prefix}auth/login`,
    GET_AUTH_ME: `${prefix}auth/me`,
    PUT_AUTH_PASSWORD_RECOVERY: `${prefix}auth/password-recovery`,
    PUT_AUTH_VALIDATE_CR: `${prefix}auth/reset-password/validate-code`,
    PUT_AUTH_RESET_PASSWORD: `${prefix}auth/reset-password`,
    
    POST_MANAGER_DATA: `${prefix}auth/register/first-step`,
    PUT_REGISTER_VALIDATE: `${prefix}auth/register/validation-step`,
    PUT_REGISTER_RESEND_C: `${prefix}auth/register/validation-resend-code`,
    POST_BRAND_DATA: `${prefix}auth/register/last-step`,

    PUT_BRAND_DATA: `${prefix}company`,
    GET_BRAND_MISSIONS: `${prefix}company/missions`,

};