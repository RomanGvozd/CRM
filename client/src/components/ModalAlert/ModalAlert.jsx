import React from 'react';

import './ModalAlert.scss';

function ModalAlert({alert}) {

    return (
        <div className='modal-alert'>
            <p className='modal-alert__text'>{alert}</p>
        </div>
     );
}

export default ModalAlert;