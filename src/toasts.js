import Toastify from 'toastify-js'

const toast = (text, type = 'success') => {
    let color;
    if (type === 'success') color = 'rgb(124, 216, 113)'
    else if (type === 'error') color = 'rgb(233, 72, 59)'
    else color = 'darkgray'
    return (
        Toastify({
            text: text,
            duration: 1500,
            style: {background: color},
            close: true,
            
        }).showToast()
    )
}

export default toast