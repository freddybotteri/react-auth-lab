import React from 'react';
import PropTypes from 'prop-types';

const Header = ({handlerCerrarsession}) => (
    <div className="header-content">
        <div className="" >
        	<a className="header-title-text header-right">Freddy Botteri</a>
        	<button onClick={handlerCerrarsession} className="header-title-text header-left">Cerrar session </button>
        </div>
    </div>
);

export default React.memo(Header);
