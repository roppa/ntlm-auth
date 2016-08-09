'use strict';

let ldapErrorCodes = {
  'ID1': 'No cookie',
  'ID2': 'Internal error',
  'ID3': 'Error searching',
  'ID4': 'Account not found',
  '525': 'No such user',
  '52e': 'Bad password',
  '520': 'Not permitted to log in at this time',
  '531': 'Not permitted to log in from this workstation',
  '532': 'Password expired',
  '533': 'Account disabled',
  '701': 'Account expired',
  '773': 'Password must change',
  '775': 'Account locked'
};

module.exports = ldapErrorCodes;
