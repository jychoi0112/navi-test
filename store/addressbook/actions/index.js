// 여러개의 액션을 하나의 객체로 묶어 
// 컴포넌트 파일에서 쉽게 사용할 수 있도록 해주는 역할을 합니다.
import * as addrBookAction from './actions';

const AddrBookActionCreators = Object.assign({},
  addrBookAction
);

export default AddrBookActionCreators;
