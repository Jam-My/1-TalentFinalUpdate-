export const environment = {
  production: false,
  client_id: '1Talent',
  scope: 'openid profile UserProfile 1TalentApi 1RPPPolicyServerApi',
  response_type: 'id_token token',
  // authority: 'http://192.168.0.254:8043',
  authority: 'http://1talent-auth-sts.1rivet.com',
  // redirect_uri: 'http://192.168.0.254:8053/',
  redirect_uri: 'https://1talent.1rivet.com/',
  acr_values: 'tenant:2A3DF6F5-9D38-44BD-B5D7-98DD6A1CE514',
  // Policy server config
  // policy_url: ' http://192.168.0.254:8046/api/userPolicy',
  policy_url: 'http://1talent-apsapi.1rivet.com/api/userPolicy',
  policy_name: '1TalentPolicy',
  ui_locales: 'en-US',
  baseUrl: 'http://192.168.0.254:8050/api/resignations',
  baseUrl_checklist: 'http://192.168.0.254:8050/api/exitCheckList',
  baseUrl_activities: 'http://192.168.0.254:8050/api/exitActivities',
  baseUrl_resignation: 'http://192.168.0.254:8050/api/resignations',
  baseUrl_projectlist: 'https://1talent-service.1rivet.com/api'
};
