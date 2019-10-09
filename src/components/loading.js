import React from 'react'

import { BounceLoader } from 'react-spinners';

const styles = {
    overlayContent: {
        display: 'flex',
        width: '100%',
        left: 0,
        top: 0,
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
        position: 'fixed',
        zIndex: 999999,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        flexDirection: 'column'
    },
    wrapper: {
        display: 'inherit',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    }
}

const Loading = ({ loading }) => { 
    return loading ? ( 
        <div style={styles.overlayContent}> 
            <div style={styles.wrapper}> 
                <BounceLoader
                    css={'override'}
                    sizeUnit={'px'}
                    size={60}
                    color={'#fff'}
                    loading={loading}
                />
            </div> 
        </div> 
    ) : null 
} 
 
export default Loading