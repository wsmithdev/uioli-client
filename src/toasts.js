import Toastify from 'toastify-js'

const toast = (text, type = 'success') => {
    let color;
    if (type === 'success') color = 'green'
    else if (type === 'error') color = 'red'
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