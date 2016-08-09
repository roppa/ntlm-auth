'use strict';

process.env.PORT = 8070;
process.env.SECRET = '|9u;H3BX.ntr|T;2WvYf;I%9DW_toW_&6Y i *)S}W}7ZG1UqV-,^tC&36|@gv9<)]JmH/@SW.JyE-HB-yU(#9pYtT32_Ni,>rFf9;9jvF$@{Ce%n^TLuN-ZANusD4Y|w);@kP93igW=QnTeSKt-V-J9rJa=$-<Hu-.!Db^`Nbpqc2C*_G^vr N?4W|NCvX]_dS';
process.env.DOMAIN_NAME = 'TESTDOMAIN';
process.env.DOMAIN_CONTROLLER = 'ldap://0.0.0.0:1389';

let app = require('.');

app.listen(process.env.PORT);
