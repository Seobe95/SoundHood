/* 카카오 주소검색 Type */
type KakaoSearchAddressResponse = {
  documents: Documents[];
};

type Documents = {
  address: Address;
};

type Address = {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  region_3depth_h_name: string;
  region_4depth_name: string;
  x: string;
  y: string;
};

type KakaoAddressFromCoordinateResponse = {
  documents: Document[];
};

type Document = {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  region_3depth_h_name: string;
  region_4depth_name: string;
  /* H: 행정동, B: 법정동 */
  region_type: 'H' | 'B';
  x: string;
  y: string;
};

export type {
  KakaoSearchAddressResponse,
  KakaoAddressFromCoordinateResponse,
  Documents,
  Address,
};
