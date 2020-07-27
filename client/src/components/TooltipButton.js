import React from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

const TooltipButton = ({ children, onClick, tip, btnClass, tipClass}) => {
    return (
        <Tooltip title={tip} placement={tipClass}>
            <IconButton onClick={onClick} className={btnClass}>
                {children}
            </IconButton>
        </Tooltip>
    )
}

export default TooltipButton;