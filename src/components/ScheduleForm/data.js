const CARRIERS = ['Hapag-Lloyd', 'Maersk', 'YangMing', 'ONE', 'MSC', 'APL'];

const FROM_LOCATIONS = [
  {label: 'Vancouve (BC), CANADA', value: 'CAVAN'},
  {label: 'Toronto (ON), CANADA', value: 'CATOR'},
  {label: 'Montreal (QC), CANADA', value: 'CAMTR'},
  {label: 'Halifax (NS), CANADA', value: 'CAHAL'},

  {label: 'Los Angeles (CA), USA', value: 'USLAX'},
  {label: 'Oakland (CA), USA', value: 'USOAK'},
  {label: 'Long Beach (CA), USA', value: 'USLGB'},
  {label: 'Seattle (WA), USA', value: 'USSEA'},
  {label: 'Tacoma (CA), USA', value: 'USTIW'},
  {label: 'New York (NY), USA', value: 'USNYC'},
  {label: 'Savannah (GA), USA', value: 'USSAV'},
];

const TO_LOCATIONS = [
  {label: 'Keelung, CHINA', value: 'TWKEL'},
  {label: 'Busan, KOREA', value: 'KRPUS'},
  {label: 'Singapore, SINGAPORE', value: 'SGSIN'},
  {label: 'Port Klang, MALAYSIA', value: 'MYPKG'},
  {label: 'Jakarta, INDONESIA', value: 'IDJKT'},
  {label: 'Bangkok, THAILAND', value: 'THBKK'},
  {label: 'Ho Chi Minh City, VIETNAM', value: 'VNSGN'},
  {label: 'Taichung, TAIWAN', value: 'TWTXG'},
];

export {FROM_LOCATIONS, TO_LOCATIONS, CARRIERS};
