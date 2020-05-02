import React from 'react'

export const Notification = ({ notification }) => {

    if(notification.content === null) {
        return null;
    }
    return (
        <>
            <div className={notification.type === 'success' ? 'notification' : 'error'}>{ notification.content }</div>
        </>
    )
}
