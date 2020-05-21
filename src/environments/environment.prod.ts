export const environment = {
  production: true,
  client_id: '1Talent',
  scope: 'openid profile UserProfile 1TalentApi 1RPPPolicyServerApi',
  response_type: 'id_token token',
  authority: 'http://192.168.0.254:8043',
  redirect_uri: 'http://192.168.0.254:8051',
  acr_values: 'tenant:2A3DF6F5-9D38-44BD-B5D7-98DD6A1CE514',
  // Policy server config
  policy_url: ' http://192.168.0.254:8046/api/userPolicy',
  policy_name: '1TalentPolicy',
  ui_locales: 'en-US',
  baseUrl: 'http://192.168.0.254:8050/api/resignations'
}
