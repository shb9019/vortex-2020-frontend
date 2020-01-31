import { CL_ADMIN, EV_ADMIN, SYS_GOD, WS_ADMIN, PRH_ADMIN, OA_ADMIN } from '../constants/adminTags';

const getAdminRedirectLink = (role) => {
    let link;

    switch(role) {
        case PRH_ADMIN : link = '/admin/prhospi'; break;
        case CL_ADMIN : link = '/admin/clueless'; break;
        case OA_ADMIN : link = '/admin/overall'; break;
        case SYS_GOD : link = '/admin/sysgod'; break;
        case EV_ADMIN : link = '/admin/events'; break;
        case WS_ADMIN : link = '/admin/workshops'; break;
        default: link = '/';
    }

    return link;
};

export {
    getAdminRedirectLink
};